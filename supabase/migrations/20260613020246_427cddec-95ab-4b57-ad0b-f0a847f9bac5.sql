REVOKE ALL ON FUNCTION public.tg_purchase_item_stock() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.tg_sale_item_stock() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.enforce_customer_credit_limit() FROM PUBLIC, anon, authenticated;