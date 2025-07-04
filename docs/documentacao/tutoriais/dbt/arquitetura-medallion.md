# Arquitetura e Modelagem de Dados

A modelagem de dados e a organização dos esquemas devem seguir a arquitetura em camadas definida para o repositório, baseada nos estágios de maturidade e tratamento dos dados. Esta abordagem facilita a rastreabilidade, o controle de qualidade e a evolução gradual dos dados ao longo do tempo. As camadas estão estruturadas da seguinte forma:

- **Raw**: camada bruta, que armazena os dados exatamente como foram recebidos da fonte, sem qualquer transformação. Serve como fonte de verdade e histórico imutável.
- **Bronze**: camada de dados limpos e estruturados de forma padronizada, com correções mínimas (como tipos de dados e normalização básica), mantendo a granularidade original.
- **Silver**: camada onde os dados passam por enriquecimentos, junções e integrações entre diferentes fontes, além de validações mais complexas.
- **Gold**: camada final, otimizada para consumo e análise. Contém métricas, agregações e tabelas derivadas voltadas a casos de uso específicos, como dashboards, relatórios e serviços.

Ao propor modificações ou novos pipelines, certifique-se de posicionar corretamente os dados dentro dessa estrutura e seguir os padrões de nomenclatura, versionamento e particionamento definidos. Alterações em qualquer uma dessas camadas devem ser devidamente documentadas e revisadas pelo time responsável, garantindo consistência e rastreabilidade.

Essa organização em camadas é fundamental para garantir qualidade, confiabilidade e governança sobre os dados tratados no repositório.