-- Tabela que guarda configurações editáveis do catálogo (por enquanto, o número de WhatsApp).
-- Como aplicar: app.supabase.com > seu projeto > SQL Editor > New query
-- > cole este conteúdo inteiro > Run.

create table if not exists settings (
  id text primary key default 'main',
  whatsapp_number text not null,
  updated_at timestamptz default now()
);

alter table settings enable row level security;

-- Qualquer visitante do catálogo pode LER a configuração (precisa pra montar o link do WhatsApp).
create policy "Public can read settings"
on settings for select
to anon, authenticated
using (true);

-- Só quem estiver logado (você, no painel admin) pode CRIAR ou ATUALIZAR a configuração.
create policy "Authenticated users can insert settings"
on settings for insert
to authenticated
with check (true);

create policy "Authenticated users can update settings"
on settings for update
to authenticated
using (true)
with check (true);

-- Cria a linha inicial com o número que já estava em uso, se ainda não existir.
insert into settings (id, whatsapp_number)
values ('main', '5585921792596')
on conflict (id) do nothing;
