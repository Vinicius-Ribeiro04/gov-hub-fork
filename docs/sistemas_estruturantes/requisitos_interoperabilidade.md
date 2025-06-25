# Introdução
**TODO**
- A importância da interoperabilidade entre sistemas estruturantes.
- Objetivo do documento.


# Requisitos Gerais de Interoperabilidade
## Padrões Técnicos e Protocolos
- Adoção de APIs RESTful com autenticação via OAuth2.
- Utilização de padrões de dados do governo (ex: Padrão Brasil de Interoperabilidade - PBI).
- Dados trocados em formato JSON, com codificação UTF-8.
  
## Identificação e Referência Cruzada
- Uso de identificadores únicos e persistentes entre sistemas.
- Referência temporal comum (timestamps em UTC).
  
## Segurança e Controle de Acesso
- Criptografia de dados em trânsito (HTTPS).
- Controle de acesso baseado em perfis institucionais.
- Registro de logs de integração.
  
## Governança de Dados
- Definição clara de responsabilidade sobre cada atributo compartilhado.
- Catálogo de dados comum entre os sistemas.
  
## Sincronização e Frequência
- Atualizações periódicas ou em tempo real, conforme criticidade dos dados.
- Mecanismos de versionamento das APIs e notificações de mudança.
  
# Requisitos Específicos de Interoperabilidade
## SIAFI x ComprasGov
### Problemas Identificados:
- Ausência de um identificador único entre contratos do ComprasGov e registros de pagamento no SIAFI
- Uso de Notas de Empenho (NEs) como elo de integração é inconsistente (NEs ausentes ou compartilhadas entre contratos).
- Informações relevantes estão em campo livre de observação no SIAFI, dificultando automação.
- Falta de definição clara sobre o encerramento de contratos no ComprasGov, sem relação com quitação financeira no SIAFI.
- Faturas sem vínculo com NE, ou NE compartilhada entre várias faturas.

### Requisitos de Interoperabilidade:
1. Identificador de Integração Obrigatório:
   1. Introdução de um identificador de contrato único obrigatório em ambas as plataformas (ex: ID de contrato ComprasGov referenciado diretamente nos registros do SIAFI).
2. Padronização do Campo de Observação:
   1. Definição de um padrão mínimo para o preenchimento do campo de observação no SIAFI, incluindo chaves como: ID do contrato, ID da fatura, ou hash do processo.
3. Mapeamento e Regra de Consistência para NEs:
   1. Toda fatura no ComprasGov deverá conter pelo menos uma NE registrada no SIAFI.
   2. Implementação de regra que impeça múltiplas faturas de diferentes contratos compartilharem uma mesma NE, ou então, que isso seja explicitamente registrado.
4. Integração Bidirecional:
   1. O registro de fatura no ComprasGov deve ser capaz de consultar e exibir os dados correspondentes no SIAFI (empenho e pagamento), e vice-versa.
5. Atualização em Tempo Real ou Diário:
   1. A sincronização entre os dois sistemas deve ocorrer pelo menos diariamente via API, com logs de erro caso não haja correspondência entre contratos e empenhos.
6. Definição Unificada de Encerramento de Contrato:
   1. Requisito funcional de integração com o SIAFI para identificar a quitação de contratos como condição para a marcação de encerramento no ComprasGov.
7. Melhoria na Qualidade dos Dados:
   1. Obrigatoriedade de preenchimento dos campos de processo, CNPJ, UASG e número de empenho no ComprasGov para viabilizar trilhas de auditoria automatizadas.
  
## SIAFI x TransfereGov
### Problemas Identificados:
- Apenas NCs e PFs enviadas/recebidas estão registradas no TransfereGov; devoluções não estão.
- Número de transferência (chave única do TED) não está presente nas NEs, apenas nas NCs.
- Classificações orçamentárias não são únicas e são reutilizadas em vários TEDs.
- Campo de observação no SIAFI é novamente o único elo possível, mas é livre e não padronizado.

### Requisitos de Interoperabilidade:
1. Registro de Devoluções no TransfereGov:
   1. Obrigatoriedade de registro no TransfereGov de NCs e PFs devolvidas, com os mesmos metadados das demais movimentações.
2. Inclusão do Número da Transferência nas NEs:
   1. Inclusão obrigatória do número do TED (número de transferência) nos metadados das NEs vinculadas à descentralização.
3. Padronização do Campo de Observação no SIAFI:
   1. Adoção de um padrão mínimo estruturado no campo de observação, que inclua obrigatoriamente:
      1. número do TED,
      2. número da NC,
      3. plano de trabalho/PTRES.
4. Validação de Unicidade nas Classificações:
   1. Implementação de validação cruzada para garantir que a combinação de PTRES + plano interno + fonte de recursos não seja usada de forma ambígua em TEDs distintos.
5. API para Consulta Cruzada:
   1. Disponibilização de API no TransfereGov que permita recuperar os dados completos de uma transferência, usando os metadados disponíveis no SIAFI.
6. Integração Periódica de Verificação:
   1. Criação de rotina de verificação diária que identifique TEDs com registros incompletos entre os dois sistemas (baseada em número de transferência).
    
## SIORG x SIAPE
### Problemas Identificados
- O **SIAPE não valida** a lotação dos servidores com base na estrutura oficial registrada no SIORG.
- **Códigos de unidades organizacionais e cargos são diferentes** entre os dois sistemas.
- A funcionalidade de vinculação entre unidades SIAPE ↔ SIORG existe, mas **não é exposta via API**.
- O cruzamento atual entre unidades do SIORG e do SIAPE é feito de forma **não estruturada**, a partir do campo **"sigla"** da unidade organizacional, o que é insuficiente para garantir unicidade e consistência.
- No SIORG, existem **cargos e suas instâncias**, sendo que cada instância **poderia conter o CPF e nome do servidor alocado**, mas esses campos **atualmente estão vazios**, inviabilizando o uso para interoperabilidade com o SIAPE.
- Falta um **dicionário comum e padronizado de unidades e cargos**.

### Requisitos de Interoperabilidade
1. Dicionário Comum de Unidades e Cargos
- Desenvolvimento e adoção de um dicionário de códigos único e padronizado para unidades organizacionais (ex: código SIORG como chave primária).
- Estabelecimento de uma correspondência entre os códigos de cargos do SIAPE e as funções previstas no SIORG (onde aplicável), com repositório acessível via API.
- Inclusão de metadados estruturados nas instâncias de cargo no SIORG, com preenchimento obrigatório de **CPF e nome do servidor** alocado, quando aplicável.

2. Exposição da Vinculação via API
- As APIs do SIAPE devem incluir, nas informações de unidade organizacional, o **código correspondente no SIORG** sempre que houver vinculação.
- Exigência de que toda unidade ativa no SIAPE esteja vinculada a uma unidade no SIORG, com essa informação tornada pública e acessível.

3. Validação Estrutural Obrigatória
- O sistema SIAPE deve realizar validação automática das unidades de lotação e exercício com base na estrutura vigente no SIORG.
- Unidades inativas ou inexistentes no SIORG não devem ser permitidas como lotação/exercício ativa de servidores.

4. Alertas e Auditoria
- Criação de alertas automáticos no SIAPE para servidores vinculados a unidades extintas ou desativadas no SIORG.
- Geração de relatórios periódicos com inconsistências entre as estruturas organizacionais dos dois sistemas.

5. Mapeamento dos Papéis Funcionais
- Incluir no dicionário comum a equivalência entre as naturezas dos cargos/funções (ex: direção, chefia, assessoramento), para permitir análises e classificações cruzadas.

6. Versão e Histórico da Estrutura
- Suporte a reprocessamento de dados históricos no SIAPE com base na estrutura vigente em determinado período.

<!-- **CONFIRMAR COM IPEA**
1. Regras para Reestruturação
- Definir um protocolo para casos de reestruturação no SIORG, incluindo:
  - Período de transição para realocação de servidores.
  - Atualização automática ou assistida das UGs de lotação/exercício.
  - Registro de histórico de movimentação por alteração da estrutura. -->
  
## TransfereGov x SIORG
- Validação da estrutura organizacional dos proponentes e concedentes.
- Verificação de atribuições institucionais para celebrar transferências.
- Enriquecimento de dados das propostas com hierarquia organizacional do órgão.
  
## ComprasGov x SIORG
- Validação das UASGs e unidades cadastradas nas compras com base na estrutura do SIORG.
- Garantia de vínculo entre unidade requisitante e estrutura formal do órgão.
- Preenchimento automático de dados institucionais em licitações.

## SIAFI x SIAPE
**TODO**
- Alinhamento entre dados de pessoal e despesas de pessoal executadas.
- Identificação de vínculos e funções pagos via folha e registrados como despesa orçamentária.
- Crosscheck de códigos de unidade gestora (UG) e centro de custo.
  
# Considerações Finais
Próximos passos: testes de integração, validação com órgãos parceiros, cronograma de implementação.

Recomendações para manutenção evolutiva da interoperabilidade.

Proposta de fórum técnico permanente para interoperabilidade entre sistemas estruturantes.

