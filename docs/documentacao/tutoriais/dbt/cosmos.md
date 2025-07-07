# Usando Astronomer Cosmos para Orquestração de Modelos no dbt

## O que é o Astronomer Cosmos?

Astronomer Cosmos é uma biblioteca que integra o [dbt](https://www.getdbt.com/) com o [Apache Airflow](https://airflow.apache.org/), permitindo orquestrar pipelines de dados definidos em dbt diretamente como DAGs no Airflow.

## Pré-requisitos

- Projeto dbt configurado
- Ambiente com Airflow instalado
- Instalação do pacote `astronomer-cosmos`

```bash
pip install astronomer-cosmos
```

## Configurando o Cosmos

1. **Adicione seu projeto dbt ao repositório do Airflow**  
    Certifique-se de que o diretório do projeto dbt esteja acessível pelo Airflow.

2. **Crie uma DAG usando Cosmos**

Exemplo de DAG:

```python
from cosmos.profiles import PostgresUserPasswordProfileMapping
from cosmos.providers.dbt.core.operators import DbtRunOperator
from cosmos.providers.dbt.core.dag import DbtDag

DBT_PROJECT_PATH = "/path/para/seu/projeto/dbt"

with DbtDag(
     dag_id="dbt_cosmos_example",
     dbt_project_path=DBT_PROJECT_PATH,
     profile_mapping=PostgresUserPasswordProfileMapping(
          conn_id="airflow_db_conn_id",
          profile_args={"schema": "public"}
     ),
     schedule_interval="@daily",
     start_date=datetime(2023, 1, 1),
     catchup=False,
) as dag:
     pass
```

3. **Configure a conexão no Airflow**  
    No Airflow, crie uma conexão (`conn_id`) compatível com o banco de dados usado pelo dbt.

## Executando os modelos

- Ao iniciar a DAG, o Cosmos irá automaticamente criar tarefas para cada modelo do seu projeto dbt, permitindo monitoramento e reexecução granular via Airflow.

## Evitando conflito de logs

<style>
  .md-typeset span[data-md-color-accent] {
    background-color: transparent;
    color: var(--md-accent-fg-color);
  }
</style>

<span data-md-color-accent="red">**Cuidado**:</span> Não remover as linhas abaixo do arquivo pois foram necessárias para evitar erros com logs.

```python
# Jobs sendo executados em paralelo podem conflitar ao enviar os logs
# para a mesma pasta, isso irá corrigir esse conflito

from cosmos.constants import DBT_LOG_PATH_ENVVAR

dbt_log_path = "/tmp/dbt_logs"
os.makedirs(dbt_log_path, exist_ok=True)
os.environ[DBT_LOG_PATH_ENVVAR] = dbt_log_path
```

---

## Referências

- [Documentação oficial do Cosmos](https://astronomer.github.io/astronomer-cosmos/)
- [Integração dbt + Airflow](https://docs.astronomer.io/learn/dbt-airflow)
