ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS rack_location text;

ALTER TABLE public.customers
  ADD COLUMN IF NOT EXISTS credit_limit numeric NOT NULL DEFAULT 0 CHECK (credit_limit >= 0),
  ADD COLUMN IF NOT EXISTS payment_terms_days integer NOT NULL DEFAULT 30 CHECK (payment_terms_days BETWEEN 0 AND 365);

ALTER TABLE public.sales
  ADD COLUMN IF NOT EXISTS delivery_fee numeric NOT NULL DEFAULT 0 CHECK (delivery_fee >= 0),
  ADD COLUMN IF NOT EXISTS due_date date;

ALTER TABLE public.products
  DROP CONSTRAINT IF EXISTS products_stock_nonnegative;
ALTER TABLE public.products
  ADD CONSTRAINT products_stock_nonnegative CHECK (stock >= 0);

CREATE OR REPLACE FUNCTION public.tg_purchase_item_stock() RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.tg_sale_item_stock() RETURNS TRIGGER AS $$
DECLARE
  current_stock numeric;
BEGIN
  IF TG_OP = 'INSERT' THEN
    SELECT stock INTO current_stock FROM public.products WHERE id = NEW.product_id FOR UPDATE;
    IF current_stock < NEW.qty THEN
      RAISE EXCEPTION 'Stok tidak mencukupi. Tersedia %, diminta %', current_stock, NEW.qty;
    END IF;
    UPDATE public.products SET stock = stock - NEW.qty WHERE id = NEW.product_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.products SET stock = stock + OLD.qty WHERE id = OLD.product_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.enforce_customer_credit_limit() RETURNS TRIGGER AS $$
DECLARE
  customer_limit numeric;
  current_outstanding numeric;
BEGIN
  IF NEW.customer_id IS NULL OR NEW.payment_method <> 'credit' THEN
    RETURN NEW;
  END IF;

  SELECT credit_limit INTO customer_limit
  FROM public.customers
  WHERE id = NEW.customer_id AND user_id = NEW.user_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Pelanggan tidak valid';
  END IF;

  SELECT COALESCE(SUM(GREATEST(total - paid, 0)), 0)
  INTO current_outstanding
  FROM public.sales
  WHERE customer_id = NEW.customer_id
    AND id IS DISTINCT FROM NEW.id;

  IF current_outstanding + GREATEST(NEW.total - NEW.paid, 0) > customer_limit THEN
    RAISE EXCEPTION 'Transaksi melewati sisa batas kredit pelanggan';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS sales_credit_limit_guard ON public.sales;
CREATE TRIGGER sales_credit_limit_guard
BEFORE INSERT OR UPDATE OF customer_id, total, paid, payment_method ON public.sales
FOR EACH ROW EXECUTE FUNCTION public.enforce_customer_credit_limit();