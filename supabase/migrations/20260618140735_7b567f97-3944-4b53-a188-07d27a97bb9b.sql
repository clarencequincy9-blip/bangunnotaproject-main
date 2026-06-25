
REVOKE EXECUTE ON FUNCTION public.set_opening_stock(uuid, numeric, numeric) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.tg_stock_adjustment() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.set_opening_stock(uuid, numeric, numeric) TO authenticated;
