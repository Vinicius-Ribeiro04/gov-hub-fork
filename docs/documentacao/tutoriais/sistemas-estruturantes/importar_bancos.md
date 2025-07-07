# Gov Hub BR — Integração com sistemas estruturantes

O **Gov Hub BR** é uma plataforma livre e colaborativa voltada à integração de dados e informações governamentais. A proposta central do projeto é enfrentar um dos maiores desafios da gestão pública: a fragmentação e a inconsistência dos dados entre os diversos sistemas governamentais.

O objetivo desta página é apresentar as principais fontes que estamos utilizando ao consultar dados públicos e apresentar um direcionamento de onde essas documentações especifícas podem ser usadas, de forma geral, sempre que quisermos importar um banco de dados de algum sistema utilizaremos suas APIS abertas para fazer a solicitação desses dados

---

## Como importar um banco de dados de sistema estruturante

Este guia apresenta o processo para importar dados de sistemas governamentais estruturantes, como o SIAFI, Compras Gov e TransfereGov, utilizando suas APIs públicas e respeitando boas práticas de segurança e integração.

Foi feita uma refatoração dos clientes de API do antigo repositório para o novo e implementados a base dos clients REST e SOAP. A partir disso os demais clientes de ingestão foram desenvolvidos pela equipe do Lappis a partir do cliente base e dos exemplos. A biblioteca httpx (https://www.python-httpx.org/) foi escolhida por ser uma versão de cliente REST mais moderna e de fácil intercâmbio para uma possível versão assíncrona caso o projeto necessite no futuro. Buscou-se fazer uso extensivo de logging, exemplo que foi seguido na implementação das DAGs do Airflow de Ingestão pela equipe do Lappis. 

---

## Integração com o SIAFI (Sistema Integrado de Administração Financeira)

### APIs públicas disponíveis

- [Consultar tabelas administrativas — Catálogo de APIs governamentais](https://www.gov.br/conecta/catalogo/apis/consultar-tabelas-administrativas-do-siafi)
- [Manter contas a pagar e receber — Catálogo de APIs governamentais](https://www.gov.br/conecta/catalogo/apis/novo-siafi-manter-contas-a-pagar-e-receber)
- [Manter programação — Catálogo de APIs governamentais](https://www.gov.br/conecta/catalogo/apis/manter-programacao)
- [Módulo orçamentário — Catálogo de APIs governamentais](https://www.gov.br/conecta/catalogo/apis/siafi-2013-modulo-orcamentario)

## Integração siafi

Antes de consumir as APIs do SIAFI, é necessário realizar a configuração de um ambiente seguro.

Mais informações detalhadas estão disponíveis no portal oficial:  
[Informações sobre a integração com o SIAFI — Tesouro Nacional](https://www.gov.br/tesouronacional/pt-br/central-de-conteudo/apis/siafi/informacoes-sobre-a-integracao-com-o-siafi)

---

## Integração com Compras Gov

O Gov Hub BR atualmente consome dados da seguinte API pública:  
[API de Compras Governamentais — compras.dados.gov.br](https://api.compras.dados.gov.br/)

---

## Integração com o TransfereGov

Para integração com programas e transferências voluntárias, acesse a documentação oficial:  
[APIs do TransfereGov — gov.br](https://www.gov.br/transferegov/pt-br/sobre/apis-integracao)

---

## Catálogo de APIs governamentais

A busca por novas fontes de dados pode ser feita no catálogo oficial do governo federal:  
[Catálogo de APIs governamentais — ConectaGov](https://www.gov.br/conecta/catalogo/)

---

## Conclusão

A proposta do Gov Hub BR é democratizar o acesso a dados públicos de forma segura, reutilizável e tecnicamente sólida. A partir da integração com APIs governamentais documentadas e abertas, é possível construir bases de dados qualificadas que fortalecem a gestão pública e aumentam a transparência.

