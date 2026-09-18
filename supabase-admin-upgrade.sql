-- ============================================================
-- VERNYQ — Admin product management upgrade
-- Run in Supabase Dashboard → SQL Editor → New query → paste → Run
-- (Idempotent — safe to run on the existing project.)
--
-- Unlocks Shopify-grade product editing from /admin:
--   badge, specs, features, what's included, SEO title/description,
--   reviews toggle + moderated reviews, and creating brand-new products.
-- Storefront falls back to the verified static catalog where columns are empty.
-- ============================================================

-- ---------- New products columns ----------
alter table products
  add column if not exists badge text,
  add column if not exists specifications jsonb not null default '{}'::jsonb,
  add column if not exists features jsonb not null default '[]'::jsonb,
  add column if not exists whats_included jsonb not null default '[]'::jsonb,
  add column if not exists tagline text,
  add column if not exists seo_title text,
  add column if not exists seo_description text,
  add column if not exists reviews_enabled boolean not null default true;

-- ---------- Product reviews ----------
create table if not exists product_reviews (
  id uuid primary key default gen_random_uuid(),
  product_id text not null references products(id) on delete cascade,
  author_name text not null,
  rating integer not null check (rating between 1 and 5),
  title text,
  body text not null,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_product_reviews_product
  on product_reviews (product_id) where approved = true;

alter table product_reviews enable row level security;

create policy "Public read approved reviews"
  on product_reviews for select
  using (approved = true);

create policy "Anyone can submit a review"
  on product_reviews for insert
  to anon, authenticated with check (true);

create policy "Admin read all reviews"
  on product_reviews for select
  to authenticated using (true);

create policy "Admin update reviews"
  on product_reviews for update
  to authenticated using (true) with check (true);

create policy "Admin delete reviews"
  on product_reviews for delete
  to authenticated using (true);

-- ---------- Refresh launch products with full content ----------
insert into products (
  id, name, slug, price, badge, description, short_description, tagline,
  specifications, features, whats_included, stock, low_stock_threshold, active, reviews_enabled
) values
(
  'vernyq-v3', 'VERNYQ V3', 'vernyq-v3-all-in-one-cold-plunge', 3999.00,
  'New',
  'The VERNYQ V3 is a complete cold water immersion system in a single freestanding unit. An integrated 1 HP chiller cools down to 1°C and heats up to 40°C, so one product covers cold plunges, warm soaks, and contrast routines. Wi-Fi and app control let you set your target temperature from your phone, and it all runs on a standard 110V outlet — fill it, plug it in, set your temperature.',
  'Cooling + heating, 1–40°C. Integrated 1 HP chiller, Wi-Fi app control, standard 110V outlet.',
  'All-in-one cold plunge. Cooling and heating from 1°C to 40°C — one unit, one standard outlet.',
  '{"Model": "V3", "Type": "All-in-one cold plunge (cooling + heating)", "Temperature Range": "1–40°C (34–104°F)", "Chiller": "Integrated, 1 HP", "Connectivity": "Wi-Fi with app control", "Power": "110V / 60Hz (standard outlet)", "Installation": "Freestanding"}'::jsonb,
  '[
    {"title": "Cooling & Heating", "description": "One unit covers the full 1–40°C range — cold plunges, warm soaks, or contrast routines, all from the same tub."},
    {"title": "Integrated 1 HP Chiller", "description": "Cools and heats without ice. Set a target temperature and the chiller holds it, session after session."},
    {"title": "Wi-Fi + App Control", "description": "Adjust and monitor your water temperature from your phone — your plunge is ready before you are."},
    {"title": "Plug-In Simple", "description": "Runs on a standard 110V / 60Hz outlet. Freestanding design — no special wiring required."},
    {"title": "U.S. Warehouse Stock", "description": "Ships from a U.S. warehouse. Dispatch in roughly 3 business days after payment verification, delivery in roughly 7."}
  ]'::jsonb,
  '["VERNYQ V3 all-in-one unit (tub with integrated 1 HP chiller)"]'::jsonb,
  6, 3, true, true
),
(
  'vernyq-a3', 'VERNYQ A3', 'vernyq-a3-all-in-one-cold-plunge', 3999.00,
  'New',
  'The VERNYQ A3 delivers the identical performance as the V3 — the same integrated 1 HP chiller, the same 1–40°C cooling and heating range, the same Wi-Fi app control — in a different exterior design. If you want the full VERNYQ all-in-one experience and prefer the A3 look, you give up nothing else. Runs on a standard 110V outlet; fill it, plug it in, set your temperature.',
  'Cooling + heating, 1–40°C. Integrated 1 HP chiller, Wi-Fi app control, standard 110V outlet.',
  'All-in-one cold plunge with the same 1–40°C performance — in a different design.',
  '{"Model": "A3", "Type": "All-in-one cold plunge (cooling + heating)", "Temperature Range": "1–40°C (34–104°F)", "Chiller": "Integrated, 1 HP", "Connectivity": "Wi-Fi with app control", "Power": "110V / 60Hz (standard outlet)", "Installation": "Freestanding"}'::jsonb,
  '[
    {"title": "Cooling & Heating", "description": "One unit covers the full 1–40°C range — cold plunges, warm soaks, or contrast routines, all from the same tub."},
    {"title": "Industrial 1 HP Chiller", "description": "Cools and heats without ice. Set a target temperature and the chiller holds it, session after session."},
    {"title": "Wi-Fi + App Control", "description": "Adjust and monitor your water temperature from your phone — your plunge is ready before you are."},
    {"title": "Plug-In Simple", "description": "Runs on a standard 110V / 60Hz outlet. Freestanding design — no special wiring required."},
    {"title": "U.S. Warehouse Stock", "description": "Ships from a U.S. warehouse. Dispatch in roughly 3 business days after payment verification, delivery in roughly 7."}
  ]'::jsonb,
  '["VERNYQ A3 all-in-one unit (tub with integrated 1 HP chiller)"]'::jsonb,
  21, 3, true, true
)
on conflict (id) do update set
  name = excluded.name,
  slug = excluded.slug,
  price = excluded.price,
  badge = excluded.badge,
  description = excluded.description,
  short_description = excluded.short_description,
  tagline = excluded.tagline,
  specifications = excluded.specifications,
  features = excluded.features,
  whats_included = excluded.whats_included,
  reviews_enabled = excluded.reviews_enabled;

-- Done! ✅
