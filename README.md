# project2-2026b-renatasfon
# Projeto: Aplicação com persistência de dados em backend

<img width="1310" height="590" alt="educa" src="https://github.com/user-attachments/assets/680bfd89-a7ed-498d-b2e9-1323e4baec77" />


## Acesso

http://educajunto-production.up.railway.app


## Desenvolvedor(a)
Renata Fonseca  
Sistemas de informação



## Proposta
Modalidade:  
A 

Proposta:  
Aplicação web para conectar alunos de escolas públicas a pessoas interessadas em ajudá-los, permitindo cadastrar, consultar, atualizar e excluir pedidos de materiais escolares, uniformes, mochilas e outros recursos. Os alunos podem cadastrar suas necessidades, enquanto os doadores podem consultar os pedidos disponíveis e demonstrar interesse em realizar uma doação.



## Parceria/cliente/usuário
Parceria: Lauren Auth Lugoch


## Feedback/comentário da parceria/cliente/usuário
Ao comparar os dois projetos, percebi algumas diferenças principalmente nas tecnologias e na forma de organizar o código. A Renata utilizou TypeScript com Node.js e Express no backend, enquanto eu utilizei Python com Flask. Também utilizamos formas diferentes de trabalhar com o banco de dados, ela utilizou o Prisma, enquanto eu utilizei a biblioteca psycopg e consultas SQL diretamente.

No backend, a Renata separou as rotas dos controllers, deixando a lógica das operações nos controllers, enquanto no meu projeto a lógica das operações fica junto com as rotas. Também estruturamos o banco de dados de formas diferentes. No projeto da Renata, alunos e doadores ficam em uma tabela Usuario, diferenciados por um campo tipo, enquanto no meu projeto eles ficam em tabelas separadas. Além disso, ela utiliza os recursos do Prisma, como include e select, para buscar informações relacionadas entre as tabelas, enquanto eu utilizei consultas SQL com JOIN.

No frontend, as duas utilizaram as mesmas tecnologias, HTML, CSS e JavaScript, mas a Renata organizou a aplicação em uma única página com diferentes telas, controladas pelo script.js. No meu projeto, a estrutura é mais separada entre HTML, CSS e JavaScript, com o script.js sendo utilizado principalmente para fazer as requisições à API e atualizar os dados da página.

## Desenvolvimento

### Processo

### Processo

Escolhi desenvolver este projeto em TypeScript por ser uma linguagem que eu ainda não havia utilizado, mas que tinha interesse em aprender por sua aplicação no desenvolvimento web. Para o backend, também optei por utilizar Node.js, Express e Prisma, trabalhando com PostgreSQL no banco de dados. Isso fez com que boa parte do projeto fosse construída com tecnologias novas para mim.

No início, utilizei um vídeo explicativo para entender a estrutura básica do TypeScript e do Express. A partir dessa base, fui desenvolvendo a aplicação aos poucos, começando pela configuração do servidor e pela comunicação com o banco de dados. A integração entre Prisma e PostgreSQL foi uma das etapas que mais exigiu aprendizado, principalmente por ser a primeira vez que utilizei um ORM. Nesse processo, utilizei a IA como apoio para entender conceitos e resolver dúvidas, mas também fui testando as operações na prática para entender melhor como as diferentes partes do sistema se relacionavam.

Uma das escolhas que fiz durante o desenvolvimento foi manter o backend organizado em `routes` e `controllers`. Em vez de concentrar toda a lógica em um único arquivo, fui separando as responsabilidades conforme novas funcionalidades eram adicionadas. Isso também facilitou a realização dos testes, pois eu conseguia desenvolver uma funcionalidade, testar sua resposta pelo terminal e só depois utilizá-la como base para a próxima etapa.

Durante o desenvolvimento, também tive alguns problemas relacionados ao ambiente de desenvolvimento. A falta de memória na minha máquina deixou o sistema lento e chegou a impedir a instalação de algumas dependências. Precisei interromper temporariamente o desenvolvimento para resolver esse problema e, depois disso, consegui retomar o projeto.

Outra etapa importante foi a criação das regras de funcionamento do sistema. Ao longo do desenvolvimento, fui adicionando validações para situações como tipos diferentes de usuário, criação de pedidos, materiais e registro de interesse dos doadores. Os testes realizados pelo terminal ajudaram a encontrar esses problemas antes de avançar para as próximas partes da aplicação.

O deploy foi a etapa que mais me deu trabalho. Como era minha primeira experiência utilizando o Railway, encontrei um erro durante a publicação que não consegui resolver inicialmente com a ajuda da IA. Acabei recorrendo aos próprios painéis e configurações da plataforma e, explorando as opções disponíveis, consegui descobrir que o problema estava relacionado à URL configurada nas variáveis do Railway. Depois de corrigir essa configuração, consegui finalizar o deploy e colocar a aplicação em funcionamento.

Ao final do projeto, além de aprender uma nova linguagem e novas ferramentas, consegui entender melhor o processo de desenvolvimento de uma aplicação full-stack, desde a criação do banco e construção da API até os testes, integração com o frontend e deploy. O projeto também me mostrou a importância de testar cada etapa durante o desenvolvimento e de tentar resolver os problemas por conta própria quando uma solução inicial não funciona.  

Concluo que foi uma ótima experiência de aprendizado, onde pude consolidar conhecimentos práticos de backend e desenvolvimento full-stack, além de exercitar a resolução autônoma de problemas.

### Trechos de código

Ainda não definidos

## Tecnologias

### Linguagens e afins

Substitua este trecho por uma lista detalhada de tecnologias utilizadas:
- TypeScript + node.js + Express
- HTML, CSS, Script.Js  
- Postgres + Prisma  
- Railway

### Ambiente de desenvolvimento

- VsCode  
- ChatGpt gratuito  
- Claude gratuito  
- Railway

## Referências e créditos

- Mini curso sobre TypeScript  https://www.youtube.com/watch?v=QoqDr4H2G8U  
- Entendendo NodeJs            https://www.youtube.com/watch?v=kJVAdDrp19A  
- Chat GPT                     geração de código  
- Claude                       correção de bugs  



---
Projeto entregue para a disciplina de [Desenvolvimento de Software para a Web](http://github.com/andreainfufsm/elc1090-2026b) em 2026b
