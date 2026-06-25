
REVOKE EXECUTE ON FUNCTION public.tg_set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.tg_sale_item_stock() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.tg_purchase_item_stock() FROM PUBLIC, anon, authenticated;
