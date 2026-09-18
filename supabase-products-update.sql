-- ============================================================
-- VERNYQ — Product catalog update: V3 + A3
-- Run this in your EXISTING Supabase project:
--   Supabase Dashboard → SQL Editor → New query → paste → Run
--
-- Replaces the old V1 / V1 Pro catalog rows with the verified
-- V3 / A3 products. Old rows are deactivated (not deleted) so
-- any historical orders referencing them stay intact.
--
-- stock = internal units on hand (site shows a status label,
-- never the raw count).
-- ============================================================

-- Retire the old placeholder catalog entries
update products set active = false where id in ('vernyq-v1', 'vernyq-v1-pro');

-- Upsert the launch products
insert into products (id, name, slug, price, description, short_description, images, stock, low_stock_threshold, active)
values
  ('vernyq-v3', 'VERNYQ V3', 'vernyq-v3-all-in-one-cold-plunge', 3999.00,
   'The VERNYQ V3 is a complete cold water immersion system in a single freestanding unit. Integrated 1 HP chiller cools and heats across 1–40°C, with Wi-Fi app control on a standard 110V outlet.',
   'Cooling + heating, 1–40°C. Integrated 1 HP chiller, Wi-Fi app control, standard 110V outlet.',
   '[]'::jsonb, 6, 3, true),
  ('vernyq-a3', 'VERNYQ A3', 'vernyq-a3-all-in-one-cold-plunge', 3999.00,
   'The VERNYQ A3 delivers identical performance to the V3 — same 1 HP chiller, same 1–40°C range, same Wi-Fi app control — in a different exterior design.',
   'Cooling + heating, 1–40°C. Integrated 1 HP chiller, Wi-Fi app control, standard 110V outlet.',
   '[]'::jsonb, 21, 3, true)
on conflict (id) do update set
  name = excluded.name,
  slug = excluded.slug,
  price = excluded.price,
  description = excluded.description,
  short_description = excluded.short_description,
  stock = excluded.stock,
  low_stock_threshold = excluded.low_stock_threshold,
  active = excluded.active;
