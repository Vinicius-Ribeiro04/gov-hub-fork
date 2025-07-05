# O que são modelos DBT?

Arquivos SQL para manipulação e criação de tabelas referenciáveis e reutilizáveis.

## Referenciando um modelo



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