## Conectando o Superset ao banco de dados PostgreSQL

1. Acesse o Superset no navegador.
2. No canto superior direito, clique no botão **`+`** e selecione **`Data` → `Connect Database`**.
3. Escolha o tipo de banco de dados (**PostgreSQL**).
4. Preencha os dados de conexão. Você pode usar a URI SQLAlchemy:

```bash
postgresql://usuario:senha@host:porta/nome_do_banco
```

> 💡 Dica: Se estiver usando Docker, o host pode ser `host.docker.internal`.

5. Clique em **`Test Connection`** para verificar a conexão.
6. Se tudo estiver correto, clique em **`Connect`** para salvar.

## Gerenciando acesso a dashboards

- **Proprietários**: têm permissão para editar.
- **Usuários não-proprietários**: acesso pode ser gerenciado de duas formas:
- **Permissões por dataset**: se o usuário tiver acesso ao dataset, também pode ver os dashboards que o usam.
- **Dashboard Roles (RBAC)**: se ativado, você pode definir quem vê o dashboard, independentemente do dataset.