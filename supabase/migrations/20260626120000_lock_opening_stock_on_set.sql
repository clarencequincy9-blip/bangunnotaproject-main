-- Fix: lock opening stock IMMEDIATELY when it is set ("set once" behavior).
-- Previously set_opening_stock only wrote stock/cost/opening_stock and relied on
-- the first transaction trigger to flip opening_locked. That made the "sekali pakai"
-- (one-time) UI promise inaccurate: the box icon stayed editable after the first save.
-- Now setting the opening stock also locks the product right away.
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
  SET stock = _qty, cost_price = _cost, opening_stock = _qty, opening_locked = true
  WHERE id = _product_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.set_opening_stock(uuid, numeric, numeric) TO authenticated;
