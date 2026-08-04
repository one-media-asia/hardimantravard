-- Migration: create bookings table
-- Apply this in your Supabase SQL editor or via psql

CREATE TABLE IF NOT EXISTS public.bookings (
  id text PRIMARY KEY,
  name text,
  email text,
  phone text,
  location text,
  service text,
  preferredDate date,
  message text,
  deposit integer,
  createdAt timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bookings_createdAt ON public.bookings (createdAt DESC);
