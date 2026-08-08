-- Script de configuração do banco de dados do catálogo.
-- Como aplicar: app.supabase.com > seu projeto > SQL Editor > New query
-- > cole este conteúdo inteiro > Run.

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price text,
  image text,
  section text not null,
  created_at timestamptz default now()
);

alter table products enable row level security;

-- Qualquer visitante do catálogo pode LER os produtos.
create policy "Public can read products"
on products for select
to anon, authenticated
using (true);

-- Só quem estiver logado (você, no painel admin) pode CRIAR, EDITAR ou EXCLUIR.
create policy "Authenticated users can insert products"
on products for insert
to authenticated
with check (true);

create policy "Authenticated users can update products"
on products for update
to authenticated
using (true);

create policy "Authenticated users can delete products"
on products for delete
to authenticated
using (true);
