-- Profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles
  for select to authenticated using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles
  for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles
  for insert to authenticated with check (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Products catalogue
create table if not exists public.products (
  id text primary key,
  title text not null,
  category text not null,
  entitlement_type text not null,
  amount_minor integer not null,
  currency text not null default 'USD',
  billing_type text not null,
  duration_days integer,
  active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;
create policy "products_public_read" on public.products
  for select to anon, authenticated using (active = true);

-- Purchases
create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  product_id text references public.products (id),
  purchase_type text not null check (purchase_type in ('quiz_report', 'donation', 'upgrade')),
  amount_minor integer not null,
  currency text not null default 'USD',
  status text not null default 'pending' check (status in ('pending', 'completed', 'cancelled', 'failed')),
  stripe_session_id text unique,
  stripe_payment_intent_id text,
  quiz_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create index if not exists purchases_user_id_idx on public.purchases (user_id);
create index if not exists purchases_stripe_session_id_idx on public.purchases (stripe_session_id);

alter table public.purchases enable row level security;
create policy "purchases_select_own" on public.purchases
  for select to authenticated using (auth.uid() = user_id);

-- Entitlements
create table if not exists public.entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  product_id text not null references public.products (id),
  entitlement_type text not null,
  pack_id text,
  expires_at timestamptz,
  source_purchase_id uuid references public.purchases (id) on delete set null,
  created_at timestamptz not null default now(),
  unique (user_id, product_id, pack_id)
);

create index if not exists entitlements_user_id_idx on public.entitlements (user_id);

alter table public.entitlements enable row level security;
create policy "entitlements_select_own" on public.entitlements
  for select to authenticated using (auth.uid() = user_id);

-- Report access tokens
create table if not exists public.report_access_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  quiz_id text not null,
  token_hash text not null unique,
  purchase_id uuid references public.purchases (id) on delete set null,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists report_access_tokens_user_quiz_idx on public.report_access_tokens (user_id, quiz_id);

alter table public.report_access_tokens enable row level security;
create policy "report_tokens_select_own" on public.report_access_tokens
  for select to authenticated using (auth.uid() = user_id);

-- Donations
create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  purchase_id uuid references public.purchases (id) on delete set null,
  amount_minor integer not null,
  currency text not null default 'USD',
  reference text,
  created_at timestamptz not null default now()
);

alter table public.donations enable row level security;
create policy "donations_select_own" on public.donations
  for select to authenticated using (auth.uid() = user_id);

-- Contact messages
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  name text,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;
create policy "contact_insert_authenticated" on public.contact_messages
  for insert to authenticated with check (auth.uid() = user_id or user_id is null);
create policy "contact_insert_anon" on public.contact_messages
  for insert to anon with check (true);
create policy "contact_select_own" on public.contact_messages
  for select to authenticated using (auth.uid() = user_id);

-- Privacy requests
create table if not exists public.privacy_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  email text not null,
  request_type text not null,
  details text,
  status text not null default 'received',
  created_at timestamptz not null default now()
);

alter table public.privacy_requests enable row level security;
create policy "privacy_insert_auth" on public.privacy_requests
  for insert to authenticated with check (true);
create policy "privacy_select_own" on public.privacy_requests
  for select to authenticated using (auth.uid() = user_id);

-- Sound mixes
create table if not exists public.sound_mixes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  layers jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.sound_mixes enable row level security;
create policy "sound_mixes_all_own" on public.sound_mixes
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Content packs
create table if not exists public.content_packs (
  id text primary key,
  kind text not null check (kind in ('drawing', 'sounds')),
  title text not null,
  description text,
  product_id text references public.products (id),
  amount_minor integer not null default 199,
  storage_prefix text,
  item_ids text[] not null default '{}',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.content_packs enable row level security;
create policy "content_packs_public_read" on public.content_packs
  for select to anon, authenticated using (active = true);

-- Seed products
insert into public.products (id, title, category, entitlement_type, amount_minor, billing_type, duration_days) values
  ('full-quiz-report', 'Full Quiz Report', 'quiz-report', 'single-report', 100, 'one-time', null),
  ('extended-report', 'Extended Reflection Report', 'quiz-report', 'single-report', 299, 'one-time', null),
  ('premium-pdf-report', 'Premium PDF Report', 'quiz-report', 'download', 499, 'one-time', null),
  ('remove-ads-month', 'Remove Ads for One Month', 'ad-free', 'ad-removal', 199, 'time-limited', 30),
  ('remove-ads-forever', 'Remove Ads Forever', 'ad-free', 'ad-removal', 799, 'one-time', null),
  ('coloring-packs', 'Premium Coloring Packs', 'drawing', 'content-pack', 199, 'one-time-per-pack', null),
  ('sound-mixer', 'Sound Mixer', 'sounds', 'feature-access', 299, 'one-time', null),
  ('premium-sounds', 'Premium Soundscapes', 'sounds', 'content-pack', 299, 'one-time-per-pack', null),
  ('relaxation-bundle', 'Relaxation Bundle', 'bundle', 'bundle', 899, 'one-time', null),
  ('donation', 'Donation', 'donation', 'donation', 0, 'one-time', null)
on conflict (id) do nothing;

insert into public.content_packs (id, kind, title, description, product_id, amount_minor, storage_prefix, item_ids) values
  ('botanical-calm', 'drawing', 'Botanical Calm', 'Soft botanical line art for slow coloring.', 'coloring-packs', 199, 'drawing/botanical-calm', array['leaf-mandala','fern-spiral','wildflower-arc']),
  ('moonlit-patterns', 'drawing', 'Moonlit Patterns', 'Night patterns and gentle geometry.', 'coloring-packs', 199, 'drawing/moonlit-patterns', array['crescent-weave','star-lattice','night-ripple']),
  ('geometric-reset', 'drawing', 'Geometric Reset', 'Clean shapes for focused coloring.', 'coloring-packs', 199, 'drawing/geometric-reset', array['hex-calm','triangle-flow','circle-grid']),
  ('quiet-landscapes', 'drawing', 'Quiet Landscapes', 'Horizon lines and soft scenery.', 'coloring-packs', 199, 'drawing/quiet-landscapes', array['lake-line','hill-fade','path-home']),
  ('night-rain', 'sounds', 'Night Rain', 'Longer rain ambience collection.', 'premium-sounds', 299, 'sounds/night-rain', array['night-rain-soft','night-rain-window','night-rain-distant']),
  ('coastal-evening', 'sounds', 'Coastal Evening', 'Shore and dusk soundscapes.', 'premium-sounds', 299, 'sounds/coastal-evening', array['coastal-tide','coastal-gull-soft','coastal-wind']),
  ('winter-fireplace', 'sounds', 'Winter Fireplace', 'Warm indoor fire textures.', 'premium-sounds', 299, 'sounds/winter-fireplace', array['embers-low','wood-pop','ash-hiss']),
  ('forest-after-storm', 'sounds', 'Forest After Storm', 'Drip and canopy recovery sounds.', 'premium-sounds', 299, 'sounds/forest-after-storm', array['drip-canopy','wet-leaves','soft-bird']),
  ('quiet-library', 'sounds', 'Quiet Library', 'Soft room tone and page turns.', 'premium-sounds', 299, 'sounds/quiet-library', array['page-turn','room-hum','distant-clock'])
on conflict (id) do nothing;
