# PostgreSQL

PostgreSQL é um sistema de gerenciamento de banco de dados objeto-relacional. Ele oferece os benefícios de um **banco de dados relacional**, ****enquanto fornece suporte para **objetos definidos pelo usuário** e **herança de tabelas**. Essa combinação de recursos faz do PostgreSQL uma escolha versátil para aplicações que precisam lidar com diversos tipos de dados e relacionamentos complexos.

## Banco de dados relacional

Os bancos de dados relacionais oferecem várias vantagens importantes:

- **Integridade dos dados:** Garantem consistência através de restrições, chaves estrangeiras e regras de validação.
- **Estrutura organizada:** Dados são armazenados em tabelas com relações claramente definidas, facilitando a compreensão e manutenção.
- **Consultas complexas:** Suportam SQL para realizar consultas sofisticadas, junções entre tabelas e agregações de dados.
- **Transações ACID:** Garantem Atomicidade, Consistência, Isolamento e Durabilidade nas operações.
- **Normalização:** Reduz redundância de dados e melhora a eficiência do armazenamento.
- **Controle de acesso:** Oferecem sistemas robustos de permissões e segurança para proteger os dados.
- **Escalabilidade:** Podem crescer para lidar com grandes volumes de dados mantendo o desempenho.

Essas características tornam os bancos de dados relacionais ideais para aplicações que necessitam de confiabilidade, consistência e capacidade de realizar operações complexas com os dados.

## Objetos definidos pelo usuário

Os objetos definidos pelo usuário no PostgreSQL permitem estender a funcionalidade do banco de dados além dos tipos de dados padrão. Alguns exemplos incluem:

- **Tipos de dados personalizados:** Permitem criar novos tipos de dados específicos para a aplicação, como coordenadas geográficas ou estruturas complexas.
- **Funções customizadas:** Possibilitam encapsular lógica de negócio complexa diretamente no banco de dados, podendo ser escritas em várias linguagens como SQL, PL/pgSQL, Python ou C.
- **Operadores personalizados:** Permitem definir novas operações para tipos de dados existentes ou personalizados.
- **Domínios:** São tipos de dados personalizados baseados em tipos existentes, mas com restrições adicionais.

Esses objetos definidos pelo usuário tornam o PostgreSQL extremamente flexível, permitindo que desenvolvedores adaptem o banco de dados às necessidades específicas de suas aplicações.

## Herança de tabela

A herança de tabela no PostgreSQL é um recurso que permite uma tabela herdar as colunas de outra tabela. Este conceito é similar à herança em programação orientada a objetos. Principais aspectos da herança de tabela:

- **Reutilização de estrutura:** Uma tabela filha herda automaticamente todas as colunas da tabela pai, evitando duplicação de definições.
- **Extensibilidade:** A tabela filha pode adicionar suas próprias colunas além das herdadas, permitindo especialização.
- **Consultas flexíveis:** Consultas na tabela pai podem incluir automaticamente dados das tabelas filhas, facilitando buscas abrangentes.
- **Restrições:** Constraints da tabela pai são herdadas pelas tabelas filhas, mantendo a integridade dos dados.

A herança de tabela é particularmente útil em cenários como:

- **Particionamento de dados:** Dividir grandes conjuntos de dados em tabelas menores mais gerenciáveis.
- **Modelagem de hierarquias:** Representar relacionamentos hierárquicos naturais entre entidades.
- **Especialização de dados:** Criar versões especializadas de uma estrutura de dados base.

# Dicas de manipulação

## Joins

Ao realizar um join devemos sempre explicitar uma regra de associação. São duas as maneiras que isso pode ser feito:

### ON

Usando o operado `ON` , que realiza linha a linha uma operação lógica, que compara as as colunas da esquerda com a da direita, se retornar positivo a linha contendo dados de ambos os lados é criada. Se uma linha da esqueda tiver vários correspondentes à direita, então múltiplas linhas são criadas

```sql
SELECT a.column_a, b.column_b, a.data_a, b.data_b
FROM a_table a
LEFT JOIN b_table b
ON( a.column_a = b.column_b)
```

### USING

O operador `USING`  simplifica o caso anterior quando a operação lógica é uma comparação de igualdade. Neste caso é necessário que as colunas tenham o mesmo nome.

```sql
SELECT column_id, a.data_a, b.data_b
FROM a_table a
LEFT JOIN b_table b
USING(column_id)
```

Aqui, quando usamos `SELECT *` , as colunas usadas no join não serão duplicadas. O mesmo não acontece ao usa `ON` .

<aside>
⚠️ AVISO IMPORTANTE: Ao realizar joins, sempre verifique cuidadosamente o tipo de join (INNER, LEFT, RIGHT, FULL) e as condições de junção. Joins incorretos podem resultar em:
- Perda não intencional de dados
- Duplicação de registros
- Resultados inconsistentes
- Problemas de performance em grandes conjuntos de dados

</aside>
