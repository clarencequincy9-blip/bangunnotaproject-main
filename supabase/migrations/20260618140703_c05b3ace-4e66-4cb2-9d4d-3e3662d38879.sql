
-- Add opening stock columns to products
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS opening_stock numeric NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS opening_locked boolean NOT NULL DEFAULT false;

-- Function: set opening stock only if not yet locked
CREATE OR REPLACE FUNCTION public.set_opening_stock(_product_id uuid, _qty numeric, _cost numeric)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _locked boolean;
  _owner uuid;
BEGIN
  SELECT opening_locked, user_id INTO _locked, _owner
  FROM public.products WHERE id = _product_id FOR UPDATE;

  IF _owner IS DISTINCT FROM auth.uid() THEN
    RAISE EXCEPTION 'Tidak berhak mengubah produk ini';
  END IF;
  IF _locked THEN
    RAISE EXCEPTION 'Stok awal sudah terkunci karena sudah ada transaksi pada produk ini';
  END IF;
  IF _qty < 0 OR _cost < 0 THEN
    RAISE EXCEPTION 'Stok awal dan harga pokok tidak boleh negatif';
  END IF;

  UPDATE public.products
  SET stock = _qty, cost_price = _cost, opening_stock = _qty
  WHERE id = _product_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.set_opening_stock(uuid, numeric, numeric) TO authenticated;

-- Patch existing triggers to lock the opening stock on first transaction
CREATE OR REPLACE FUNCTION public.tg_purchase_item_stock()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  current_stock numeric;
  current_cost numeric;
  remaining_stock numeric;
BEGIN
  IF TG_OP = 'INSERT' THEN
    SELECT stock, cost_price INTO current_stock, current_cost
    FROM public.products WHERE id = NEW.product_id FOR UPDATE;
    UPDATE public.products
    SET stock = current_stock + NEW.qty,
        opening_locked = true,
        cost_price = CASE
          WHEN current_stock + NEW.qty > 0
          THEN ((current_stock * current_cost) + (NEW.qty * NEW.cost)) / (current_stock + NEW.qty)
          ELSE NEW.cost
        END
    WHERE id = NEW.product_id;
  ELSIF TG_OP = 'DELETE' THEN
    SELECT stock, cost_price INTO current_stock, current_cost
    FROM public.products WHERE id = OLD.product_id FOR UPDATE;
    remaining_stock := current_stock - OLD.qty;
    IF remaining_stock < 0 THEN
      RAISE EXCEPTION 'Pembelian tidak dapat dihapus karena stok yang tersisa sudah terpakai';
    END IF;
    UPDATE public.products
    SET stock = remaining_stock,
        cost_price = CASE
          WHEN remaining_stock > 0
          THEN GREATEST(0, ((current_stock * current_cost) - (OLD.qty * OLD.cost)) / remaining_stock)
          ELSE 0
        END
    WHERE id = OLD.product_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$function$;

CREATE OR REPLACE FUNCTION public.tg_sale_item_stock()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  current_stock numeric;
BEGIN
  IF TG_OP = 'INSERT' THEN
    SELECT stock INTO current_stock FROM public.products WHERE id = NEW.product_id FOR UPDATE;
    IF current_stock < NEW.qty THEN
      RAISE EXCEPTION 'Stok tidak mencukupi. Tersedia %, diminta %', current_stock, NEW.qty;
    END IF;
    UPDATE public.products SET stock = stock - NEW.qty, opening_locked = true WHERE id = NEW.product_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.products SET stock = stock + OLD.qty WHERE id = OLD.product_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$function$;

-- Mark existing products that already have transactions as locked
UPDATE public.products p
SET opening_locked = true
WHERE EXISTS (SELECT 1 FROM public.sale_items si WHERE si.product_id = p.id)
   OR EXISTS (SELECT 1 FROM public.purchase_items pi WHERE pi.product_id = p.id);

-- Stock adjustments table
CREATE TABLE IF NOT EXISTS public.stock_adjustments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  qty_delta numeric NOT NULL,
  reason text NOT NULL,
  adjusted_at date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.stock_adjustments TO authenticated;
GRANT ALL ON public.stock_adjustments TO service_role;

ALTER TABLE public.stock_adjustments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage their stock adjustments"
ON public.stock_adjustments FOR ALL
USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Trigger: apply qty_delta to products.stock
CREATE OR REPLACE FUNCTION public.tg_stock_adjustment()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_stock numeric;
BEGIN
  IF TG_OP = 'INSERT' THEN
    SELECT stock INTO current_stock FROM public.products WHERE id = NEW.product_id FOR UPDATE;
    IF current_stock + NEW.qty_delta < 0 THEN
      RAISE EXCEPTION 'Penyesuaian membuat stok negatif (saat ini %, perubahan %)', current_stock, NEW.qty_delta;
    END IF;
    UPDATE public.products SET stock = stock + NEW.qty_delta, opening_locked = true WHERE id = NEW.product_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.products SET stock = stock - OLD.qty_delta WHERE id = OLD.product_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$;

DROP TRIGGER IF EXISTS trg_stock_adjustment ON public.stock_adjustments;
CREATE TRIGGER trg_stock_adjustment
AFTER INSERT OR DELETE ON public.stock_adjustments
FOR EACH ROW EXECUTE FUNCTION public.tg_stock_adjustment();
