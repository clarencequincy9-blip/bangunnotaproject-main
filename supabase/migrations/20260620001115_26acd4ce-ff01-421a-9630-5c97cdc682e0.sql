
CREATE OR REPLACE FUNCTION public.reset_user_data(
  _sales boolean DEFAULT true,
  _purchases boolean DEFAULT true,
  _expenses boolean DEFAULT true,
  _adjustments boolean DEFAULT true,
  _products boolean DEFAULT false,
  _contacts boolean DEFAULT false
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  uid uuid := auth.uid();
BEGIN
  IF uid IS NULL THEN
    RAISE EXCEPTION 'Tidak terautentikasi';
  END IF;

  -- Disable stock triggers so cascading deletes never error from negative stock checks.
  ALTER TABLE public.sale_items DISABLE TRIGGER USER;
  ALTER TABLE public.purchase_items DISABLE TRIGGER USER;
  ALTER TABLE public.stock_adjustments DISABLE TRIGGER USER;

  IF _sales THEN
    DELETE FROM public.sale_items WHERE sale_id IN (SELECT id FROM public.sales WHERE user_id = uid);
    DELETE FROM public.sales WHERE user_id = uid;
  END IF;

  IF _purchases THEN
    DELETE FROM public.purchase_items WHERE purchase_id IN (SELECT id FROM public.purchases WHERE user_id = uid);
    DELETE FROM public.purchases WHERE user_id = uid;
  END IF;

  IF _expenses THEN
    DELETE FROM public.expenses WHERE user_id = uid;
  END IF;

  IF _adjustments THEN
    DELETE FROM public.stock_adjustments WHERE user_id = uid;
  END IF;

  IF _products THEN
    DELETE FROM public.products WHERE user_id = uid;
  ELSIF _sales AND _purchases AND _adjustments THEN
    -- Full transactional wipe without dropping master catalog: reset to "blank install" state.
    UPDATE public.products
       SET stock = 0,
           cost_price = 0,
           opening_stock = 0,
           opening_locked = false
     WHERE user_id = uid;
  END IF;

  IF _contacts THEN
    DELETE FROM public.customers WHERE user_id = uid;
    DELETE FROM public.suppliers WHERE user_id = uid;
  END IF;

  ALTER TABLE public.sale_items ENABLE TRIGGER USER;
  ALTER TABLE public.purchase_items ENABLE TRIGGER USER;
  ALTER TABLE public.stock_adjustments ENABLE TRIGGER USER;
EXCEPTION WHEN OTHERS THEN
  -- Make sure triggers are re-enabled even on failure
  BEGIN ALTER TABLE public.sale_items ENABLE TRIGGER USER; EXCEPTION WHEN OTHERS THEN NULL; END;
  BEGIN ALTER TABLE public.purchase_items ENABLE TRIGGER USER; EXCEPTION WHEN OTHERS THEN NULL; END;
  BEGIN ALTER TABLE public.stock_adjustments ENABLE TRIGGER USER; EXCEPTION WHEN OTHERS THEN NULL; END;
  RAISE;
END;
$$;

GRANT EXECUTE ON FUNCTION public.reset_user_data(boolean, boolean, boolean, boolean, boolean, boolean) TO authenticated;
