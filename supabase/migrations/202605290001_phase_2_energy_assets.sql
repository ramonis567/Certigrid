create table if not exists public.energy_assets (
  asset_id text primary key,
  admin_wallet text not null,
  asset_owner_wallet text not null,
  asset_name text not null,
  asset_name_hash text not null,
  energy_source text not null check (
    energy_source in ('Solar', 'Wind', 'Hydro', 'Biomass', 'Other')
  ),
  location text not null,
  location_hash text not null,
  installed_capacity_mw numeric(14, 3) not null check (installed_capacity_mw > 0),
  status text not null check (status in ('Draft', 'Active', 'Inactive')),
  metadata_hash text not null,
  proof_mode text not null default 'Mock' check (proof_mode in ('Mock', 'SolanaDevnet')),
  proof_status text not null default 'Mocked' check (
    proof_status in ('Mocked', 'Pending', 'Confirmed', 'Failed')
  ),
  proof_transaction_reference text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists energy_assets_status_idx
  on public.energy_assets (status);

create index if not exists energy_assets_energy_source_idx
  on public.energy_assets (energy_source);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_energy_assets_updated_at on public.energy_assets;

create trigger set_energy_assets_updated_at
before update on public.energy_assets
for each row
execute function public.set_updated_at();

alter table public.energy_assets disable row level security;

grant select, insert, update on public.energy_assets to anon;
grant select, insert, update on public.energy_assets to authenticated;
grant select, insert, update on public.energy_assets to service_role;
