

### Testes Singulares

O DBT possui testes built-in que podem ser executados de forma singular, verificando aspectos específicos dos dados:

- **unique:** Verifica se uma coluna ou combinação de colunas contém valores únicos
- **not_null:** Garante que uma coluna não contenha valores nulos
- **accepted_values:** Valida se os valores de uma coluna estão dentro de um conjunto específico de valores permitidos
- **relationships:** Verifica integridade referencial entre tabelas

### Testes Genéricos

Além disso, é possível criar testes genéricos que podem ser reutilizados em diferentes modelos:

- Testes de schema para validar tipos de dados
- Verificações de integridade de dados
- Validações de regras de negócio

Estes testes podem ser executados como parte do pipeline de dados, garantindo qualidade contínua.

A descrição dos testes genéricos podem ser encontrados na pasta `~/dbt/ipea/macros/data_quality` 

## Configurando testes para os modelos

Dentro da pasta `~/dbt/ipea/models` o arquivo `schema.yml` , que além de conter as descrições dos modelos também estão configurados os testes de integridade. Aqui está um trecho do arquivo como exemplo

```yaml
# Este arquivo deve ser usado para descrições dos modelos
# e para configurar testes

version: 2

models:

  # Contratos DBT

  ## Bronze
  - name: contratos # Nome do modelo
    description: >
      Tabela com informações sobre contratos, incluindo detalhes como o valor do contrato, a data de início e término, e o status do contrato.
      Esta tabela é fundamental para entender a execução e o cumprimento dos contratos firmados.
      A tabela é atualizada diariamente e contém dados de contratos firmados pelo IPEA.
    columns: # Descrição de cada coluna
      - name: id
        description: >
          Identificador único do contrato, utilizado para referenciar o contrato em outras tabelas e análises.
    data_tests: # Configuração dos testes
      - row_count_match:
          source_table: compras_gov.contratos
          target_table: contratos.contratos
 [...]
```

Após a compilação da DAG pelo Cosmos, pode-se conferir a seguinte estrutura no Airflow