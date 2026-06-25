ALTER TABLE public.purchases
  ADD COLUMN IF NOT EXISTS paid numeric NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS payment_method text NOT NULL DEFAULT 'cash',
  ADD COLUMN IF NOT EXISTS due_date date;