Snapshots são uma funcionalidade do DBT que permite rastrear e registrar mudanças em dados ao longo do tempo, criando um histórico de alterações em tabelas específicas.

https://docs.getdbt.com/docs/build/snapshots

## Principais características

- Captura o estado dos dados em diferentes momentos
- Mantém um registro histórico de alterações
- Permite análise de mudanças ao longo do tempo
- Útil para auditoria e compliance

## Casos de uso comuns

- Rastreamento de alterações em dados dimensionais
- Auditoria de mudanças em dados sensíveis
- Análise histórica de alterações em tabelas
- Conformidade com requisitos regulatórios

## Como implementar

Os snapshots funcionam através de duas estratégias principais:

1. Timestamp Strategy
    - Utiliza colunas de timestamp para rastrear quando os registros foram atualizados pela última vez.
    - É necessário de exista uma coluna que forneça o momento da alteração (data ou timestamp) para que o dbt compare com o registro anterior e detecte que houve alteração
2. Check Strategy
    - Compara valores específicos das colunas para identificar mudanças nos registros. Se for detectada uma mudança em quaisquer dessas colunas, essa alteração será registrada como uma nova linha da tabela de snapshots

### Adicionando snapshots ao projeto

Dentro da pasta `snapshots` , deve-se adicionar um arquivo `*.yml` descrevendo como o snapshot deverá ser feito. Por exemplo temos `tables_snapshot.yml` , que configura todos os snapshots para o pipe de contratos. 

```yaml
snapshots:
  - name: contratos_snapshot
    relation: ref('contratos')
    config:
      schema: snapshots
      database: analytics
      unique_key: id
      strategy: check
      check_cols: [situacao, num_parcelas, valor_parcela, valor_global, valor_acumulado]
```

Isso define uma tabela `snapshots.contratos_snapshot`  que pode ser consultada para averiguar as alterações ao longo do tempo.

## Boas práticas

Para um uso efetivo dos snapshots, recomenda-se:

- Definir claramente quais tabelas precisam de snapshots
- Escolher a estratégia adequada para cada caso
- Manter uma política de retenção de dados
- Documentar a configuração dos snapshots

Os snapshots são uma ferramenta poderosa para manter a integridade e rastreabilidade dos dados em projetos DBT, especialmente em ambientes onde a análise histórica é crucial.