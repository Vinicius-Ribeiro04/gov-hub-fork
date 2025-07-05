Macros no DBT (Data Build Tool) são blocos de código reutilizáveis escritos em SQL e Jinja que podem ser chamados em diferentes modelos do projeto. Eles funcionam como funções que encapsulam lógicas complexas ou repetitivas, tornando o código mais limpo e manutenível.

https://docs.getdbt.com/docs/build/jinja-macros

## Principais características das Macros

- **Reutilização de código:** Permite escrever uma lógica uma vez e reutilizá-la em vários modelos
- **Parametrização:** Aceita argumentos, tornando-as flexíveis e adaptáveis a diferentes contextos
- **Modularidade:** Facilita a manutenção do código ao centralizar lógicas comuns em um único lugar

## Tipos comuns de Macros

Existem diferentes tipos de macros que podem ser utilizadas no DBT:

- **Macros nativas:** Fornecidas pelo próprio DBT, como current_timestamp() e generate_schema_name()
- **Macros personalizadas:** Criadas pelo usuário para atender necessidades específicas do projeto
- **Macros de pacotes:** Disponibilizadas através de pacotes dbt, como dbt_utils

## Exemplo de Macro

```sql
{% macro first_letter_uppercase_explicit(column) %}
    UPPER(LEFT({{ column }}, 1)) || LOWER(SUBSTRING({{ column }}, 2))
{% endmacro %}
```

Esta macro pode ser usada como no seguinte exemplo

```sql
SELECT 
    {{ first_letter_uppercase_explicit('first_name') }} as formatted_first_name,
    {{ first_letter_uppercase_explicit('last_name') }} as formatted_last_name
FROM users
```

Veja que a coluna é passada como string, pois o compilador do DBT irá fazer a substituição textual do modelo e no target aparecerá como

```sql
SELECT 
    UPPER(LEFT(first_name, 1)) || LOWER(SUBSTRING(first_name, 2)) as formatted_first_name,
    UPPER(LEFT(last_name, 1)) || LOWER(SUBSTRING(last_name, 2)) as formatted_last_name
FROM users
```

## Macros presentes no projeto

As macros estão armazenadas no diretório `macros/` dentro do projeto `dbt/ipea`. 

```
macros/
├── udfs/
│   ├── f_format_nc.sql
│   └── f_parse_dates.sql
├── create_udfs.sql
├── get_custom_schema.sql
└── parse_financial_value.sql
```

## User-Defined-Functions (UDF)

À primeira vista UDFs e macros parecem ser substituíveis, porém a primeira possui um potencial muito maior quanto à complexidade. Caso a transformação tenha muitas etapas é recomendado usar UDF, mas sua utilização no DBT necessita algumas etapas extras. As UDFs ficam na pasta `/udfs` , tendo o formato `f_<nome da função>` . Aqui está um exemplo usado no projeto

```sql
{% macro create_f_format_nc() %}
    create or replace function {{ target.schema }}.format_nc(in_text text)
    returns text
    as $$ 
    
    with 

    pre_process as (
        select left(in_text, 7) as prefix,
            right(in_text, 4)::numeric as posfix
    )
    
    select concat(prefix, to_char(posfix, 'FM00000')) as result
    from pre_process 
    
    $$
    language sql
    ;
{% endmacro %}
```

Somente isso não é o suficiente para que os modelos possam utilizá-la, para isso criamos a macro `create_udfs.sql` , que inicializa as funções e as deixam prontas para uso

```sql
{% macro create_udfs() %}

create schema if not exists {{ target.schema }};

    {{ create_f_parse_dates() }}
    ;
    {{ create_f_format_nc() }}
    ;

{% endmacro %}
```

 No arquivo `dbt_project.yml` foi adicionado a seguinte configuração:

```yaml
# outras configs

on-run-start:
  - '{{create_udfs()}}'
```

Isso irá criar as funções sempre quando um modelo for executado.