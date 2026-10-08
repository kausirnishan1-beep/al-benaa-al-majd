-- Non-destructive production security migration.
-- Run this file once in the Supabase SQL Editor. It does not drop tables or data.

begin;

revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

create or replace function public.is_super_admin()
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
          and role = 'admin'
    );
$$;

revoke all on function public.is_super_admin() from public, anon;
grant execute on function public.is_super_admin() to authenticated;

drop policy if exists "admins_manage" on public.admins;
create policy "admins_manage"
on public.admins
for all
to authenticated
using (public.is_super_admin())
with check (public.is_super_admin());

-- NOT VALID avoids rejecting the migration because of legacy rows, while the
-- constraints still protect every new or updated row immediately.
do $$
begin
    if not exists (select 1 from pg_constraint where conname = 'contact_messages_name_length') then
        alter table public.contact_messages add constraint contact_messages_name_length
            check (char_length(btrim(name)) between 2 and 100) not valid;
    end if;
    if not exists (select 1 from pg_constraint where conname = 'contact_messages_email_length') then
        alter table public.contact_messages add constraint contact_messages_email_length
            check (char_length(btrim(email)) between 5 and 150) not valid;
    end if;
    if not exists (select 1 from pg_constraint where conname = 'contact_messages_email_format') then
        alter table public.contact_messages add constraint contact_messages_email_format
            check (btrim(email) ~* '^[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}$') not valid;
    end if;
    if not exists (select 1 from pg_constraint where conname = 'contact_messages_phone_length') then
        alter table public.contact_messages add constraint contact_messages_phone_length
            check (phone is null or char_length(btrim(phone)) <= 30) not valid;
    end if;
    if not exists (select 1 from pg_constraint where conname = 'contact_messages_message_length') then
        alter table public.contact_messages add constraint contact_messages_message_length
            check (char_length(btrim(message)) between 10 and 2000) not valid;
    end if;
end
$$;

drop policy if exists "messages_public_insert" on public.contact_messages;
create policy "messages_public_insert"
on public.contact_messages
for insert
to anon, authenticated
with check (
    is_read = false
    and char_length(btrim(name)) between 2 and 100
    and char_length(btrim(email)) between 5 and 150
    and btrim(email) ~* '^[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}$'
    and (phone is null or char_length(btrim(phone)) <= 30)
    and char_length(btrim(message)) between 10 and 2000
);

create or replace function public.check_contact_rate_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    new.name := btrim(new.name);
    new.email := lower(btrim(new.email));
    new.phone := nullif(btrim(new.phone), '');
    new.message := btrim(new.message);

    perform pg_advisory_xact_lock(hashtextextended(new.email, 0));

    if exists (
        select 1 from public.contact_messages
        where lower(btrim(email)) = new.email
          and created_at > now() - interval '60 seconds'
    ) then
        raise exception 'Rate limit exceeded. Please wait 60 seconds before submitting another message.';
    end if;
    return new;
end;
$$;

revoke all on function public.check_contact_rate_limit() from public, anon, authenticated;

drop policy if exists "settings_public_read" on public.site_settings;
create policy "settings_public_read"
on public.site_settings
for select
to anon, authenticated
using (key in ('general', 'contact', 'stats', 'social'));

drop policy if exists "Admins can upload images" on storage.objects;
create policy "Admins can upload images"
on storage.objects
for insert
to authenticated
with check (
    bucket_id = 'images'
    and public.is_admin()
    and (storage.foldername(name))[1] = 'uploads'
    and lower(storage.extension(name)) in ('jpg', 'jpeg', 'png', 'webp', 'gif')
);

drop policy if exists "Admins can update images" on storage.objects;
create policy "Admins can update images"
on storage.objects
for update
to authenticated
using (bucket_id = 'images' and public.is_admin())
with check (
    bucket_id = 'images'
    and public.is_admin()
    and (storage.foldername(name))[1] = 'uploads'
    and lower(storage.extension(name)) in ('jpg', 'jpeg', 'png', 'webp', 'gif')
);

drop policy if exists "Admins can delete images" on storage.objects;
create policy "Admins can delete images"
on storage.objects
for delete
to authenticated
using (
    bucket_id = 'images'
    and public.is_admin()
    and (storage.foldername(name))[1] = 'uploads'
);

drop policy if exists "Admins can upload documents" on storage.objects;
create policy "Admins can upload documents"
on storage.objects
for insert
to authenticated
with check (
    bucket_id = 'documents'
    and public.is_admin()
    and (storage.foldername(name))[1] = 'documents'
    and lower(storage.extension(name)) in ('pdf', 'doc', 'docx')
);

drop policy if exists "Admins can update documents" on storage.objects;
create policy "Admins can update documents"
on storage.objects
for update
to authenticated
using (bucket_id = 'documents' and public.is_admin())
with check (
    bucket_id = 'documents'
    and public.is_admin()
    and (storage.foldername(name))[1] = 'documents'
    and lower(storage.extension(name)) in ('pdf', 'doc', 'docx')
);

drop policy if exists "Admins can delete documents" on storage.objects;
create policy "Admins can delete documents"
on storage.objects
for delete
to authenticated
using (
    bucket_id = 'documents'
    and public.is_admin()
    and (storage.foldername(name))[1] = 'documents'
);

commit;
