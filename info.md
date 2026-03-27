Certo, vamos criar o meu portifolio
usando reactjs, sass, styled components e tailwind,

meu CV em portugues e ingles esta localizado na raiz tbm

use boas praticas

aqui esta um resumo da minha carreira:
```
Certo, na area de TI comecei em curso tecnico, desenvolvimento de sistemas, la aprendi o basico como fundamentos, algoritmos, BD, java, php, javascript, html css... Bem fundamentos mesmo. Isso em 2019

finalizei em 2021 e em 2022 comecei a minha graduacao em tecnologo em analise e desenvolvimento de sistemas, que terminei no final de 2023. 

la aprendi muito dos fundamentos porem com adendo em CICD, AWS e azure cloud, sistemas distribuidos, Linux, Estrutura de dados etc.

apos 6 meses depois de entra na faculdade, comecei a estagiar na accenture (que eh a maior consultoria do mundo)

la atuei em dois projetos grandes
1 - Drogasil/Drogaria que eh um dos top 10 maiores marketplace do brasil e primeiro na industria farmaceutica. La atuei como estagiario porem fazia diversas atividades usando diversas tecnologias 

Site com react, nextjs
Backoffice - Java, Microservicos, EJB, Java 6,8, 17, MongoDB, OracleDB, RabbitMQ
BFF - NestJS, GraphQL, MongoDB, Redis

Uma parte interessante que contribui com features diretas foi o Compre Retire, que eh o produto de voce comprar no site e retirar na loja. Nao consigo pensar em KPIs mas me ajude epensar depois

maioria do tempo trabalhavamos com integracoes de outros sistemas, como era um marketplace, consumiamos de varios lugares, fazia integracoes de pagamento de varios lugares tbm, resolviamos problemas de consistencia eventual por atual com microservicos... 


O 2o projeto foi o da CircleK, que eh uma empresa de varejo, pesquise um pouco sobre ela para saber mais, 
La nao atuei muito tempo, mas estavamos construindo uma integracao muito legal com a bomba de gasolina que falva em socket, construimos um software java para comunicar com a bomba que eh o adapter, (para cada modelo de bomba, existia um adapter), com isso, tinhamos varios eventos como iniciar abastecimento, parar, autorizado, emitindo nota etc. 

Para a integracao com o sistema da CK, precisavamos de um orquestrador para traduzir essas mensagens e direcionar para o adapter correto. 
Fomos de cloud native com azure, cosmos db, azure queue service, azure service bus, azure kubernetes service, containers, config service, log em blob storage... Nao sei como ficou pq sai antes de ir para a producao.

em termos de hard skills, aprendi mt na accenture, depois de 1 ano la fui promovido para Analista Junior

Depois de 1 ano e meio como junior mais ou menos, 
em Jan de 2025 comecei na netcracker (uma empresa de telecom grande)

la comecei atuando no primeiro time Brasileiro da GFiber OSS, faziamos integracoes e implementava o sistema de produto da NC para a GF, GF foi um sucesso, foi para a producao, o time resolveu muitos bugs e ajudou muito para a integracao do NDO (produto oss da NC)

NC viu que GF foi sucesso, entao decidiu investir mais no Brasil, criando o primeiro time do NDO (produto), que eh aonde atualmente eu faco parte, 
aqui faco implementacoes de feature, bugs para todos os customers da NC, Gfiber, telesat, tmobile, rogers (canada), Claro

Usamos golang, java(spring boot), python, react, ambientes em cloud, gen IA, ci cd, graylog, arangodb, postgres. Um fix relevante que fiz eh quando GF foi para a producao, comecou a vir dados massivos, travando o DB e o sistema como um todo, dando timeouts em producao, fiz o tracing, olhando os logsno graylog, ate chegar no arango db, ver que a query estava levando +40s para executar, e o api gateway tava timeout em 30s

logo, fiz o debugging da query, profilling e vi que o indexador nao estava sendo utilizado corretamente, entao resolvi no servico que montava a query e foi de 40s para 6s em producao com mais de 2 milhoes de dados
```

crie em dark mode e light mode, pegue a preferencia do usuario

tbm tem q ser em ingles e portugues, pegue as preferencias do usuario

crie Dockerfile

use vite, e deixe preparado para rodar em algum dominio com ssl.

nao esqueca das informacoes de contato