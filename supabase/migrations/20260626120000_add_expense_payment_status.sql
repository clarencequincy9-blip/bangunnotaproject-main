-- Add payment status (tunai / transfer / hutang) to operating expenses
ALTER TABLE public.expenses
  ADD COLUMN IF NOT EXISTS payment_status TEXT NOT NULL DEFAULT 'cash';
