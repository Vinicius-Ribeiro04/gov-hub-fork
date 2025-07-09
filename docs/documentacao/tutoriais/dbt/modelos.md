# O que são modelos DBT?

Arquivos SQL para manipulação e criação de tabelas referenciáveis e reutilizáveis.

## Configurando dbt_project.yml
O arquivo `dbt_project.yml` é o principal arquivo de configuração de um projeto DBT. Nele, você define informações essenciais como o nome do projeto, diretórios de modelos, configurações de materialização padrão, variáveis, configurações de perfil de conexão e outras opções que controlam o comportamento do DBT.

Exemplo de `dbt_project.yml` usado no projeto com o IPEA:

```yaml
name: 'ipea'

version: 1.0.0
config-version: 2

profile: ipea

# Definindo o caminho para algumas das funcionalidades
model-paths: ["models"]
analysis-paths: ["analyses"]
test-paths: ["tests"]
seed-paths: ["seeds"]
macro-paths: ["macros"]
snapshot-paths: ["snapshots"]

clean-targets:
  - "target"
  - "dbt_packages"
  - "logs"

# Aqui define-se onde e como os modelos serão organizados, 
# assim como configurações padrão de meterialização
models:
  ipea: 
    +database: analytics
    contratos_dbt:
      +materialized: table
      +schema: contratos
      bronze:
        +materialized: incremental
      views:
        +materialized: view
    pessoas_dbt:
      +materialized: table
      +schema: pessoas
      views:
        +materialized: view
    ted_dbt:
      +materialized: table
      +schema: ted
      views:
        +materialized: view

# Essa configuração define a macro que será executada 
# antes de cada modelos para criar as UDFs
on-run-start:
  - '{{create_udfs()}}'
```

Esse arquivo garante que o DBT saiba onde encontrar os modelos, como executá-los e quais padrões aplicar durante o build do projeto.

## Referenciando um modelo

A dependência entre modelos é feita usando a sintaxe

```sql
select
    ...
from {{ ref('<nome_do_modelo>') }}
```

após o `dbt build`, essa query é compilada em

```sql
select
    ...
from schema.nome_do_modelo
```

caso o modelo seja realocado para outro esquema, no momento da compilação a referência se adapta à mudança automaticamente

## Sources

Quando uma tabela possui origem que não seja através de um modelo dbt, usa-se `source` para referenciá-las

```sql
select 
    ...
from {{ source('transfere_gov', 'contratos') }}
```

## Tipos de modelos

No DBT,  os modelos possuem diferentes tipos de materialização, que servem propósitos específicos:

- **Table:** Cria uma tabela física persistente que é reconstruída a cada execução
- **View:** Cria uma view SQL que é reconstruída a cada consulta
- **Incremental:** Atualiza apenas os registros novos ou modificados, ideal para grandes conjuntos de dados
- **Ephemeral:** Não cria objeto no banco, funciona como CTE (Common Table Expression) em outros modelos

Cada tipo de materialização tem seu caso de uso específico, dependendo das necessidades de performance, volume de dados e frequência de atualização.

## Boas práticas

- Utilizar nomenclatura clara e consistente
- Documentar todos os modelos e suas transformações
- Implementar testes para validar a qualidade dos dados
- Manter o código modular e reutilizável
- Versionar os modelos usando controle de código

Com DBT, as equipes de dados podem construir transformações confiáveis e escaláveis, facilitando a manutenção e evolução do pipeline de dados analíticos.