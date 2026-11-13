-- Run once in Supabase: SQL Editor -> New query -> paste -> Run
create extension if not exists pgcrypto;

create table if not exists bookings (
  id          uuid primary key default gen_random_uuid(),
  ref         text unique not null,
  space_id    text not null,
  name        text not null,
  email       text not null,
  date        date not null,
  slot        text not null,
  status      text not null default 'pending' check (status in ('pending','confirmed','cancelled')),
  drinks      text,
  setup       text,
  extras      jsonb default '[]',
  notes       text,
  wifi_net    text,
  wifi_code   text,
  created_at  timestamptz default now()
);
-- The database itself refuses two active bookings of the same space, date and slot
create unique index if not exists bookings_one_slot on bookings (space_id, date, slot) where status <> 'cancelled';
create index if not exists bookings_date on bookings (date);

create table if not exists settings (key text primary key, value jsonb not null);
insert into settings (key, value) values ('app', '{"power":"auto","pct":20}'), ('blocked', '[]') on conflict do nothing;

-- Row Level Security on, with no public policies: only the server (service key) can read or write.
alter table bookings enable row level security;
alter table settings enable row level security;
