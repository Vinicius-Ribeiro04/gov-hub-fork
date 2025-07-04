DBT Docs é uma funcionalidade do DBT que gera automaticamente documentação para seus projetos de transformação de dados.

https://docs.getdbt.com/docs/build/documentation

## Exemplo de Documentação YAML

Dentro da pasta `dags/dbt/ipea/models` está o arquivo `schema.yml` . O nome do arquivo pode ser alterado que ainda será corretamente processado. Abaixo está um trecho do código demonstrando como as informações devem constar.

```yaml
version: 2

models:
  - name: contratos
    description: >
      Tabela com informações sobre contratos, incluindo detalhes como o valor do contrato, a data de início e término, e o status do contrato.
      Esta tabela é fundamental para entender a execução e o cumprimento dos contratos firmados.
      A tabela é atualizada diariamente e contém dados de contratos firmados pelo IPEA.
    columns:
      - name: id
        description: >
          Identificador único do contrato, utilizado para referenciar o contrato em outras tabelas e análises.
macros:
	- name: create_udfs
    description: >
      Função que cria as UDFs necessárias para o funcionamento do projeto.
      Essa função deve ser chamada no início de cada run para garantir que todas as UDFs estejam disponíveis.
```

## Como Utilizar

1. Execute o comando para gerar a documentação:
    
    ```bash
    dbt docs generate
    ```
    
    Verifique se `catalog.json`  e `manifest.json`  foram criados na pastas target
    
2. Garanta que você criou os modelos com `dbt run` ou `dbt build` para visualizar a documentação de todas as colunas, não apenas aquelas descritas no seu projeto.
3. Inicie o servidor local de documentação:
    
    ```bash
    dbt docs serve
    ```
    
4. Acesse a documentação no navegador (geralmente em http://localhost:8080)

## Principais Recursos

- Visualização do DAG (Directed Acyclic Graph) dos modelos
- Documentação automática de modelos, colunas e testes
- Navegação interativa entre dependências
- Visualização do código SQL dos modelos

## Boas Práticas

- Documente seus modelos usando blocos de documentação em YAML
- Adicione descrições detalhadas para colunas importantes
- Mantenha a documentação atualizada conforme o projeto evolui
- Use tags para organizar melhor seus modelos