
# API Bancária - Pós-Graduação UFG

Este projeto é desenvolvido como parte da pós-graduação na Universidade Federal de Goiás (UFG). A API simula o funcionamento de um sistema bancário, oferecendo serviços como criação de contas, gerenciamento de transações, consulta de saldo, entre outros.

## Tecnologias Utilizadas

- **Node.js**: Plataforma para construir a API.
- **MongoDB**: Banco de dados NoSQL utilizado para armazenar os dados.
- **Prisma**: ORM para facilitar a comunicação com o MongoDB.
- **Arquitetura**: A aplicação segue uma estrutura baseada em service, controller e rotas.

## Funcionalidades

- **Cadastro de Contas**: Permite a criação de novas contas bancárias.
- **Gerenciamento de Transações**: Suporte para depósitos, saques e transferências entre contas.
- **Consulta de Saldo**: Verificação do saldo disponível em uma conta.
- **Histórico de Transações**: Consulta detalhada das transações realizadas em uma conta.

## Estrutura do Projeto

O projeto segue uma arquitetura organizada em camadas para facilitar a manutenção e escalabilidade.

- **Controllers**: Responsáveis por receber as requisições e devolver as respostas adequadas.
- **Services**: Contêm a lógica de negócios da aplicação.
- **Routes**: Definem as rotas da API e associam-nas aos controllers apropriados.

# Projeto de Aplicação Node.js com TypeScript e Prisma

Este projeto é uma aplicação Node.js utilizando TypeScript e Prisma para gerenciar o banco de dados. Abaixo estão os principais pacotes necessários para o funcionamento da aplicação.

## Instalação dos Pacotes

Antes de iniciar a aplicação, é necessário instalar as dependências. Utilize os comandos abaixo para instalar os pacotes principais:

```bash
$ npm install express
$ npm install prisma -D
$ npm install @prisma/client -D
$ npm install @types/express -D
$ npm install @types/node -D
$ npm install typescript -D
$ npm install ts-node-dev -D

$ npx tsc --init
$ npx primsa init 

## Apos configurar o schema.prisma 

$ npx prisma generate

$ npm install jsonwebtoken  
$ npm install @types/jsonwebtoken -D

