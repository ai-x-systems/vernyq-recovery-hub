-- ============================================================
-- VERNYQ — Full database schema
-- Paste this entire file into: Supabase Dashboard → SQL Editor → New query → Run
-- ============================================================

-- ---------- PRODUCTS ----------
create table if not exists products (
  id text primary key,
  name text not null,
  slug text not null unique,
  price numeric(10,2) not null,
  compare_at_price numeric(10,2),
  description text,
  short_description text,
  images jsonb default '[]'::jsonb,
  stock integer not null default 0,
  low_stock_threshold integer not null default 3,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- ORDERS ----------
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  address text not null,
  city text not null,
  state text not null,
  zip text not null,
  country text not null default 'US',
  payment_method text not null default 'bank_transfer',
  payment_status text not null default 'pending',
  status text not null default 'pending',
  items jsonb not null default '[]'::jsonb,
  subtotal numeric(10,2) not null,
  total numeric(10,2) not null,
  tracking_number text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- CONTACT MESSAGES ----------
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------- NEWSLETTER ----------
create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- ---------- SUPPLIER PAYMENTS ----------
create table if not exists supplier_payments (
  id uuid primary key default gen_random_uuid(),
  supplier text not null,
  description text,
  amount numeric(10,2) not null,
  due_date date,
  paid boolean not null default false,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

-- ---------- SEED PRODUCTS (V3 + A3 — supplier-confirmed data) ----------
-- stock = internal units on hand (the site shows a status, never this count)
insert into products (id, name, slug, price, description, short_description, images, stock)
values
  ('vernyq-v3', 'VERNYQ V3', 'vernyq-v3-all-in-one-cold-plunge', 3999.00,
   'The VERNYQ V3 is a complete cold water immersion system in a single freestanding unit. Integrated 1 HP chiller cools and heats across 1–40°C, with Wi-Fi app control on a standard 110V outlet.',
   'Cooling + heating, 1–40°C. Integrated 1 HP chiller, Wi-Fi app control, standard 110V outlet.',
   '[]'::jsonb, 6),
  ('vernyq-a3', 'VERNYQ A3', 'vernyq-a3-all-in-one-cold-plunge', 3999.00,
   'The VERNYQ A3 delivers identical performance to the V3 — same 1 HP chiller, same 1–40°C range, same Wi-Fi app control — in a different exterior design.',
   'Cooling + heating, 1–40°C. Integrated 1 HP chiller, Wi-Fi app control, standard 110V outlet.',
   '[]'::jsonb, 21)
on conflict (id) do nothing;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table products enable row level security;
alter table orders enable row level security;
alter table contact_messages enable row level security;
alter table newsletter_subscribers enable row level security;
alter table supplier_payments enable row level security;

-- PRODUCTS: anyone can read; only admins can write
create policy "Public read products"
  on products for select using (true);

create policy "Admin insert products"
  on products for insert
  to authenticated with check (true);

create policy "Admin update products"
  on products for update
  to authenticated using (true) with check (true);

create policy "Admin delete products"
  on products for delete
  to authenticated using (true);

-- ORDERS: visitors can INSERT only; admins full access
create policy "Anyone can create orders"
  on orders for insert
  to anon, authenticated with check (true);

create policy "Admin read orders"
  on orders for select
  to authenticated using (true);

create policy "Admin update orders"
  on orders for update
  to authenticated using (true) with check (true);

create policy "Admin delete orders"
  on orders for delete
  to authenticated using (true);

-- CONTACT MESSAGES: visitors insert; admins read/update
create policy "Anyone can send contact messages"
  on contact_messages for insert
  to anon, authenticated with check (true);

create policy "Admin read contact messages"
  on contact_messages for select
  to authenticated using (true);

create policy "Admin update contact messages"
  on contact_messages for update
  to authenticated using (true) with check (true);

create policy "Admin delete contact messages"
  on contact_messages for delete
  to authenticated using (true);

-- NEWSLETTER: visitors insert; admins read/delete
create policy "Anyone can subscribe"
  on newsletter_subscribers for insert
  to anon, authenticated with check (true);

create policy "Admin read subscribers"
  on newsletter_subscribers for select
  to authenticated using (true);

create policy "Admin delete subscribers"
  on newsletter_subscribers for delete
  to authenticated using (true);

-- SUPPLIER PAYMENTS: admins only
create policy "Admin read supplier payments"
  on supplier_payments for select
  to authenticated using (true);

create policy "Admin insert supplier payments"
  on supplier_payments for insert
  to authenticated with check (true);

create policy "Admin update supplier payments"
  on supplier_payments for update
  to authenticated using (true) with check (true);

create policy "Admin delete supplier payments"
  on supplier_payments for delete
  to authenticated using (true);

-- Keep updated_at fresh on orders
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists orders_set_updated_at on orders;
create trigger orders_set_updated_at
  before update on orders
  for each row execute function set_updated_at();

-- Done! ✅
