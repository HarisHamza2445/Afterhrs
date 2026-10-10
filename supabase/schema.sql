-- AFTERHRS database. Run this once in Supabase → SQL Editor.
-- Safe to run again: it never overwrites existing products or orders.

create table if not exists public.products (
  id text primary key,
  name text not null,
  full_name text not null,
  status text not null default 'available' check (status in ('available', 'concept', 'hidden')),
  price integer not null check (price >= 0),
  colours jsonb not null default '[]',
  sizes text[] not null default '{S,M,L,XL,XXL}',
  collections text[] not null default '{}',
  tone text not null default 'dark',
  images jsonb not null default '{}',
  gallery jsonb not null default '[]',
  short text not null default '',
  description text not null default '',
  design text,
  fit text,
  fabric text,
  gsm text,
  print_method text,
  tags text[] not null default '{}',
  -- units in stock per size, e.g. {"S": 4, "M": 10}
  stock jsonb not null default '{}',
  sort integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id text primary key,
  created_at timestamptz not null default now(),
  status text not null default 'pending'
    check (status in ('pending', 'processing', 'shipped', 'out', 'delivered', 'cancelled')),
  paid boolean not null default false,
  customer jsonb not null,
  address jsonb not null,
  items jsonb not null,
  totals jsonb not null,
  estimate text,
  tracking jsonb,
  notes text not null default '',
  stock_deducted boolean not null default false
);

create index if not exists orders_created_at_idx on public.orders (created_at desc);

-- Row Level Security on, with no policies: the tables can only be reached
-- with the secret key, which only the website's server holds.
alter table public.products enable row level security;
alter table public.orders enable row level security;

-- Public bucket for product photos uploaded from the admin panel.
insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do nothing;

-- The current catalog. Stock is a starting placeholder of 10 per size for
-- products on sale: set the real numbers in the admin panel.
insert into public.products
  (id, name, full_name, status, price, colours, sizes, collections, tone, images, gallery, short, description, design, fit, fabric, gsm, print_method, tags, stock, sort)
values
  ('floral-cat-tee', 'Floral Cat Tee', 'Afterhrs Floral Cat Tee', 'available', 1299, '[{"name":"Black","hex":"#1a1a1a"}]'::jsonb, array['S', 'M', 'L', 'XL', 'XXL']::text[], array['graphic-tees', 'drop-01']::text[], 'dark', '{"main":"/img/cat-tee.webp","alt":"/img/cat-tee-alt.webp"}'::jsonb, '[{"src":"/img/cat-tee.webp","label":"Back"},{"src":"/img/cat-tee-cut.webp","label":"Back · studio","stage":true},{"src":"/img/art-cat.webp","label":"Print artwork"},{"src":"/img/art-cat-face.webp","label":"Print detail"}]'::jsonb, 'A black cat watches from a dense field of red and ivory blooms.', 'The first AFTERHRS print. A black cat sits still inside a crowded field of red and ivory flowers, drawn in a woodcut-inspired style and printed as a full back panel on a washed black oversized tee.', 'Large back print. Original artwork designed in-house by AFTERHRS.', 'Oversized silhouette with dropped shoulders.', null, null, null, array['cat', 'floral', 'black', 'graphic', 'flowers']::text[], '{"S":10,"M":10,"L":10,"XL":10,"XXL":10}'::jsonb, 0),
  ('floral-eyes-tee', 'Floral Eyes Tee', 'Afterhrs Floral Eyes Tee', 'available', 1299, '[{"name":"Ivory","hex":"#efebe2"}]'::jsonb, array['S', 'M', 'L', 'XL', 'XXL']::text[], array['graphic-tees', 'drop-01']::text[], 'light', '{"main":"/img/eyes-tee.webp","alt":"/img/eyes-tee-alt.webp"}'::jsonb, '[{"src":"/img/eyes-tee.webp","label":"Back"},{"src":"/img/eyes-tee-cut.webp","label":"Back · studio","stage":true},{"src":"/img/art-eyes.webp","label":"Print artwork","wide":true},{"src":"/img/eyes-tee-alt.webp","label":"Back · alternate"}]'::jsonb, 'Only the eyes. A narrow floral band across an ivory tee.', 'The same black cat, cropped down to a glance. A narrow strip of red and ivory flowers runs across the shoulders and leaves just the eyes looking back. A quieter way to wear the first drop.', 'Horizontal back print across the upper back.', 'Oversized silhouette with dropped shoulders.', null, null, null, array['cat', 'eyes', 'floral', 'ivory', 'white', 'graphic']::text[], '{"S":10,"M":10,"L":10,"XL":10,"XXL":10}'::jsonb, 1),
  ('tiger-graphic-tee', 'Tiger Graphic Tee', 'Afterhrs Tiger Graphic Tee', 'available', 1299, '[{"name":"Ivory","hex":"#efebe2"}]'::jsonb, array['S', 'M', 'L', 'XL', 'XXL']::text[], array['graphic-tees', 'drop-01']::text[], 'light', '{"main":"/img/tiger-tee.webp","alt":"/img/art-tiger.webp"}'::jsonb, '[{"src":"/img/tiger-tee.webp","label":"Back"},{"src":"/img/tiger-tee-cut.webp","label":"Back · studio","stage":true},{"src":"/img/art-tiger.webp","label":"Print artwork"}]'::jsonb, 'An engraved tiger portrait, signed with the AFTERHRS mark.', 'A tiger in profile, drawn line by line in the manner of an old engraving, with the lowercase afterhrs signature and four-point star set beneath it. Monochrome on ivory.', 'Back print with signature wordmark and star.', 'Oversized silhouette with dropped shoulders.', null, null, null, array['tiger', 'ivory', 'white', 'engraving', 'graphic']::text[], '{"S":10,"M":10,"L":10,"XL":10,"XXL":10}'::jsonb, 2),
  ('signature-tee', 'Signature Tee', 'Afterhrs Signature Tee', 'concept', 1299, '[{"name":"Black","hex":"#1a1a1a"}]'::jsonb, array['S', 'M', 'L', 'XL', 'XXL']::text[], array['essential-tees']::text[], 'dark', '{"main":"/img/sig-tee.webp","alt":"/img/signature-ink-light.webp"}'::jsonb, '[{"src":"/img/sig-tee.webp","label":"Concept render"},{"src":"/img/sig-tee-cut.webp","label":"Concept · studio","stage":true}]'::jsonb, 'The brush-script signature. Concept piece, not yet in production.', 'The AFTERHRS signature in a fast brush script, finished with the four-point star. This piece is a concept. Final product photography, price and release timing will be confirmed before it goes on sale.', 'Back print, signature wordmark.', 'To be confirmed.', null, null, null, array['signature', 'logo', 'black', 'wordmark', 'script']::text[], '{"S":0,"M":0,"L":0,"XL":0,"XXL":0}'::jsonb, 3)
on conflict (id) do nothing;
