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

-- ---------- SEED PRODUCTS (from current static data) ----------
insert into products (id, name, slug, price, description, short_description, images, stock)
values
  ('vernyq-v1', 'VERNYQ V1', 'vernyq-v1', 2999.00,
   'The VERNYQ V1 all-in-one cold plunge system. Integrated cooling, filtration, and insulation — ready when you are.',
   'All-in-one cold plunge. 37°F cooling. Plug and plunge.',
   '[]'::jsonb, 10),
  ('vernyq-v1-pro', 'VERNYQ V1 Pro', 'vernyq-v1-pro', 4499.00,
   'The VERNYQ V1 Pro — maximum cooling power, faster chill-down, and white-glove delivery. Built for the dedicated.',
   'Maximum power cold plunge. 33°F cooling. White-glove delivery.',
   '[]'::jsonb, 10)
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
