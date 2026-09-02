-- ============================================================
-- AL BENAA AL RAHAB + AL MAJD LINES
-- FINAL SUPABASE DATABASE SCHEMA (MERGED / UPGRADED)
-- Matched to the uploaded React/Vite project
-- ============================================================


-- ============================================================
-- 1. EXTENSION
-- ============================================================

create extension if not exists "uuid-ossp";


-- ============================================================
-- 2. REMOVE OLD APPLICATION TABLES
--
-- IMPORTANT:
-- This does NOT delete Supabase Auth users.
-- This DOES delete any data currently in these tables.
-- ============================================================

drop table if exists public.contact_messages cascade;
drop table if exists public.documents cascade;
drop table if exists public.products cascade;
drop table if exists public.projects cascade;
drop table if exists public.services cascade;
drop table if exists public.site_settings cascade;
drop table if exists public.companies cascade;
drop table if exists public.admins cascade;


-- ============================================================
-- 3. ADMINS
-- ============================================================

create table public.admins (
    id uuid primary key
        references auth.users(id)
        on delete cascade,

    full_name text,

    role text not null default 'admin'
        check (role in ('admin', 'editor')),

    is_active boolean not null default true,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()
);


-- ============================================================
-- 3b. ADD YOURSELF AS ADMIN
-- ============================================================

insert into public.admins (id, full_name, role)
values ('a516a327-6b04-4553-9bc5-362dbafd7056', 'Kausir', 'admin')
on conflict (id) do nothing;


-- ============================================================
-- 4. ADMIN CHECK FUNCTION
--
-- SECURITY DEFINER prevents RLS recursion.
-- ============================================================

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
    select exists (
        select 1
        from public.admins
        where id = auth.uid()
          and is_active = true
          and role in ('admin', 'editor')
    );
$$;


-- ============================================================
-- 5. COMPANIES
--
-- IMPORTANT:
-- id is TEXT because the React project uses:
-- "benaa" and "majd"
-- ============================================================

create table public.companies (
    id text primary key,

    slug text unique not null,

    name text not null,

    name_ar text,

    tagline text,

    tagline_ar text,

    description text,

    description_ar text,

    color text,

    logo text,

    path text not null,

    sort_order integer not null default 0,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()
);


-- ============================================================
-- 6. SERVICES
--
-- IMPORTANT:
-- id is TEXT because the current Admin code creates IDs like:
-- companyId-Date.now()
-- ============================================================

create table public.services (
    id text primary key,

    company_id text not null
        references public.companies(id)
        on update cascade
        on delete cascade,

    slug text,

    title text not null,

    title_ar text,

    description text,

    description_ar text,

    path text,

    icon text,

    is_active boolean not null default true,

    sort_order integer not null default 0,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()
);


-- ============================================================
-- 7. PROJECTS
-- ============================================================

create table public.projects (
    id uuid primary key default uuid_generate_v4(),

    title text not null,

    title_ar text,

    company text not null
        references public.companies(id)
        on update cascade
        on delete cascade,

    category text,

    badge text,

    badge_ar text,

    image text,

    description text,

    description_ar text,

    location text,

    location_ar text,

    year text,

    is_featured boolean not null default true,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()
);


-- ============================================================
-- 8. PRODUCTS
-- ============================================================

create table public.products (
    id uuid primary key default uuid_generate_v4(),

    name text not null,

    name_ar text,

    category text,

    image text,

    description text,

    description_ar text,

    is_active boolean not null default true,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()
);


-- ============================================================
-- 9. DOCUMENTS
-- ============================================================

create table public.documents (
    id uuid primary key default uuid_generate_v4(),

    title text not null,

    title_ar text,

    description text,

    description_ar text,

    file_url text not null default '#',

    tag text,

    sort_order integer not null default 0,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()
);


-- ============================================================
-- 10. SITE SETTINGS
--
-- JSONB is intentional.
-- The React project stores:
-- general
-- contact
-- stats
-- social
-- ============================================================

create table public.site_settings (
    key text primary key,

    value jsonb not null default '{}'::jsonb,

    updated_at timestamptz not null default now()
);


-- ============================================================
-- 11. CONTACT MESSAGES
-- ============================================================

create table public.contact_messages (
    id bigint generated by default as identity primary key,

    name text not null,

    email text not null,

    phone text,

    message text not null,

    is_read boolean not null default false,

    created_at timestamptz not null default now()
);


-- ============================================================
-- 12. INDEXES
-- ============================================================

create index idx_companies_sort_order
on public.companies(sort_order);

create index idx_services_company_id
on public.services(company_id);

create index idx_services_sort_order
on public.services(sort_order);

create index idx_projects_company
on public.projects(company);

create index idx_projects_featured
on public.projects(is_featured);

create index idx_products_category
on public.products(category);

create index idx_products_active
on public.products(is_active);

create index idx_documents_sort_order
on public.documents(sort_order);

create index idx_contact_messages_read
on public.contact_messages(is_read);

create index idx_contact_messages_created
on public.contact_messages(created_at desc);


-- ============================================================
-- 13. ENABLE ROW LEVEL SECURITY
-- ============================================================

alter table public.admins enable row level security;
alter table public.companies enable row level security;
alter table public.services enable row level security;
alter table public.projects enable row level security;
alter table public.products enable row level security;
alter table public.documents enable row level security;
alter table public.site_settings enable row level security;
alter table public.contact_messages enable row level security;


-- ============================================================
-- 14. ADMINS RLS
-- ============================================================

create policy "admins_select_own"
on public.admins
for select
to authenticated
using (
    id = auth.uid()
);


create policy "admins_manage"
on public.admins
for all
to authenticated
using (
    public.is_admin()
)
with check (
    public.is_admin()
);


-- ============================================================
-- 15. COMPANIES RLS
-- ============================================================

create policy "companies_public_read"
on public.companies
for select
to anon, authenticated
using (
    true
);


create policy "companies_admin_manage"
on public.companies
for all
to authenticated
using (
    public.is_admin()
)
with check (
    public.is_admin()
);


-- ============================================================
-- 16. SERVICES RLS
-- ============================================================

create policy "services_public_read"
on public.services
for select
to anon, authenticated
using (
    is_active = true
);


create policy "services_admin_manage"
on public.services
for all
to authenticated
using (
    public.is_admin()
)
with check (
    public.is_admin()
);


-- ============================================================
-- 17. PROJECTS RLS
-- ============================================================

create policy "projects_public_read"
on public.projects
for select
to anon, authenticated
using (
    true
);


create policy "projects_admin_manage"
on public.projects
for all
to authenticated
using (
    public.is_admin()
)
with check (
    public.is_admin()
);


-- ============================================================
-- 18. PRODUCTS RLS
-- ============================================================

create policy "products_public_read"
on public.products
for select
to anon, authenticated
using (
    is_active = true
);


create policy "products_admin_manage"
on public.products
for all
to authenticated
using (
    public.is_admin()
)
with check (
    public.is_admin()
);


-- ============================================================
-- 19. DOCUMENTS RLS
-- ============================================================

create policy "documents_public_read"
on public.documents
for select
to anon, authenticated
using (
    true
);


create policy "documents_admin_manage"
on public.documents
for all
to authenticated
using (
    public.is_admin()
)
with check (
    public.is_admin()
);


-- ============================================================
-- 20. SITE SETTINGS RLS
-- ============================================================

create policy "settings_public_read"
on public.site_settings
for select
to anon, authenticated
using (
    true
);


create policy "settings_admin_manage"
on public.site_settings
for all
to authenticated
using (
    public.is_admin()
)
with check (
    public.is_admin()
);


-- ============================================================
-- 21. CONTACT MESSAGE RLS
-- ============================================================

-- Website visitors can send messages.
create policy "messages_public_insert"
on public.contact_messages
for insert
to anon, authenticated
with check (
    true
);


-- Only admins can read messages.
create policy "messages_admin_select"
on public.contact_messages
for select
to authenticated
using (
    public.is_admin()
);


-- Only admins can update messages.
create policy "messages_admin_update"
on public.contact_messages
for update
to authenticated
using (
    public.is_admin()
)
with check (
    public.is_admin()
);


-- Only admins can delete messages.
create policy "messages_admin_delete"
on public.contact_messages
for delete
to authenticated
using (
    public.is_admin()
);


-- ============================================================
-- 22. UPDATED_AT FUNCTION
-- ============================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;


-- ============================================================
-- 23. UPDATED_AT TRIGGERS
-- ============================================================

create trigger trg_admins_updated_at
before update on public.admins
for each row
execute function public.set_updated_at();


create trigger trg_companies_updated_at
before update on public.companies
for each row
execute function public.set_updated_at();


create trigger trg_services_updated_at
before update on public.services
for each row
execute function public.set_updated_at();


create trigger trg_projects_updated_at
before update on public.projects
for each row
execute function public.set_updated_at();


create trigger trg_products_updated_at
before update on public.products
for each row
execute function public.set_updated_at();


create trigger trg_documents_updated_at
before update on public.documents
for each row
execute function public.set_updated_at();


create trigger trg_site_settings_updated_at
before update on public.site_settings
for each row
execute function public.set_updated_at();


-- ============================================================
-- 24. INSERT THE TWO COMPANIES
--
-- Real descriptions/contact details are intentionally blank.
-- Client will add them later from Admin.
-- ============================================================

insert into public.companies (
    id,
    slug,
    name,
    name_ar,
    tagline,
    tagline_ar,
    description,
    description_ar,
    color,
    logo,
    path,
    sort_order
)
values

(
    'benaa',
    'benaa',
    'AL BENAA AL RAHAB CONTRACTING EST.',
    '',
    'Construction • Renovation • Maintenance • Project Management',
    '',
    '',
    '',
    'benaa',
    '/logo/al-benaa-logo.svg',
    '/benaa',
    1
),

(
    'majd',
    'majd',
    'AL MAJD LINES FOR TRADE & IMPORT',
    '',
    'Import & Export • General Trading • Product Sourcing • Logistics Solutions',
    '',
    '',
    '',
    'majd',
    '/logo/al-majd-logo.svg',
    '/majd',
    2
);


-- ============================================================
-- 25. DEFAULT SERVICES
-- ============================================================

insert into public.services (
    id,
    company_id,
    slug,
    title,
    title_ar,
    description,
    description_ar,
    path,
    icon,
    is_active,
    sort_order
)
values

(
    'benaa-construction',
    'benaa',
    'construction',
    'Construction',
    '',
    '',
    '',
    '/benaa/construction',
    'Building2',
    true,
    1
),

(
    'benaa-renovation',
    'benaa',
    'renovation',
    'Renovation',
    '',
    '',
    '',
    '/benaa/renovation',
    'Hammer',
    true,
    2
),

(
    'benaa-maintenance',
    'benaa',
    'maintenance',
    'Maintenance',
    '',
    '',
    '',
    '/benaa/maintenance',
    'Wrench',
    true,
    3
),

(
    'benaa-project-management',
    'benaa',
    'project-management',
    'Project Management',
    '',
    '',
    '',
    '/benaa/project-management',
    'ClipboardCheck',
    true,
    4
),

(
    'majd-import-export',
    'majd',
    'import-export',
    'Import & Export',
    '',
    '',
    '',
    '/majd/import-export',
    'Globe2',
    true,
    1
),

(
    'majd-general-trading',
    'majd',
    'general-trading',
    'General Trading',
    '',
    '',
    '',
    '/majd/general-trading',
    'ShoppingBag',
    true,
    2
),

(
    'majd-product-sourcing',
    'majd',
    'product-sourcing',
    'Product Sourcing',
    '',
    '',
    '',
    '/majd/product-sourcing',
    'PackageSearch',
    true,
    3
),

(
    'majd-logistics',
    'majd',
    'logistics',
    'Logistics Solutions',
    '',
    '',
    '',
    '/majd/logistics',
    'Truck',
    true,
    4
);


-- ============================================================
-- 26. DEFAULT SITE SETTINGS
-- ============================================================
--
-- IMPORTANT:
-- These are safe neutral values.
-- Do NOT put fake company phone/statistics/social links here.
-- ============================================================

insert into public.site_settings (key, value)
values

(
    'general',
    '{
        "siteNameEn": "AL BENAA AL RAHAB CONTRACTING EST. & AL MAJD LINES FOR TRADE & IMPORT",
        "siteNameAr": "",
        "taglineEn": "Building. Trading. Connecting.",
        "taglineAr": ""
    }'::jsonb
),

(
    'contact',
    '{
        "phone": "",
        "phoneAlt": "",
        "email": "",
        "addressEn": "",
        "addressAr": "",
        "workingHoursEn": "",
        "workingHoursAr": "",
        "mapEmbedUrl": ""
    }'::jsonb
),

(
    'stats',
    '{
        "yearsExperience": "",
        "completedProjects": "",
        "tradePartners": "",
        "exportHubs": ""
    }'::jsonb
),

(
    'social',
    '{
        "facebook": "",
        "linkedin": "",
        "instagram": "",
        "twitter": ""
    }'::jsonb
);


-- ============================================================
-- 27. STORAGE BUCKETS
-- ============================================================

insert into storage.buckets (
    id,
    name,
    public
)
values
(
    'images',
    'images',
    true
),
(
    'documents',
    'documents',
    true
)
on conflict (id)
do update set
    public = excluded.public;


-- ============================================================
-- 28. REMOVE OLD STORAGE POLICIES IF THEY EXIST
-- ============================================================

drop policy if exists "Public can view images"
on storage.objects;

drop policy if exists "Admins can upload images"
on storage.objects;

drop policy if exists "Admins can update images"
on storage.objects;

drop policy if exists "Admins can delete images"
on storage.objects;

drop policy if exists "Public can view documents"
on storage.objects;

drop policy if exists "Admins can upload documents"
on storage.objects;

drop policy if exists "Admins can update documents"
on storage.objects;

drop policy if exists "Admins can delete documents"
on storage.objects;


-- ============================================================
-- 29. STORAGE RLS - IMAGES
-- ============================================================

create policy "Public can view images"
on storage.objects
for select
to public
using (
    bucket_id = 'images'
);


create policy "Admins can upload images"
on storage.objects
for insert
to authenticated
with check (
    bucket_id = 'images'
    and public.is_admin()
);


create policy "Admins can update images"
on storage.objects
for update
to authenticated
using (
    bucket_id = 'images'
    and public.is_admin()
)
with check (
    bucket_id = 'images'
    and public.is_admin()
);


create policy "Admins can delete images"
on storage.objects
for delete
to authenticated
using (
    bucket_id = 'images'
    and public.is_admin()
);


-- ============================================================
-- 30. STORAGE RLS - DOCUMENTS
-- ============================================================

create policy "Public can view documents"
on storage.objects
for select
to public
using (
    bucket_id = 'documents'
);


create policy "Admins can upload documents"
on storage.objects
for insert
to authenticated
with check (
    bucket_id = 'documents'
    and public.is_admin()
);


create policy "Admins can update documents"
on storage.objects
for update
to authenticated
using (
    bucket_id = 'documents'
    and public.is_admin()
)
with check (
    bucket_id = 'documents'
    and public.is_admin()
);


create policy "Admins can delete documents"
on storage.objects
for delete
to authenticated
using (
    bucket_id = 'documents'
    and public.is_admin()
);


-- ============================================================
-- 31. FINAL VERIFICATION
-- ============================================================

select
    'companies' as table_name,
    count(*) as rows
from public.companies

union all

select
    'services',
    count(*)
from public.services

union all

select
    'projects',
    count(*)
from public.projects

union all

select
    'products',
    count(*)
from public.products

union all

select
    'documents',
    count(*)
from public.documents

union all

select
    'site_settings',
    count(*)
from public.site_settings

union all

select
    'contact_messages',
    count(*)
from public.contact_messages

union all

select
    'admins',
    count(*)
from public.admins;
