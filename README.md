This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# 14 - Configurando FaunaDB

Outras opções: Firebase Supabase

- Criar conta no FaunaDB
    - Gratuíta
    - 100K operações de leitura
    - 50k de escrita
    - 500k de computação
    - 100 MB de storage
- Pra aplicações até médio porte é tranquilo.
- Criar DB novo
- Security
    - Configurar API key
    - Role admin
    - Key name : ignews.data.app
        - Gerada a chave, só copiar
- Na aplicação
    - envlocal
        - FAUNADB_KEY= chave
- Criar collection users
- Criar índice (index) user_by_email
- Termos → data.email

## Schema Free

- O FaunaDB é Schema free
    - Não tem colunas no banco de dados
    - Temos só documentos, e cada documento pode ter os dados que quisermos
    - É a aplicação que controla o que ela quer salvar.

# Íncide (id)

- É necessário para buscar por registros de forma mais performática.

# Instalar a sdk do FaunaDB

```tsx
yarn add faunadb
```

- na pasta services criar fauna.ts
- importar Client from faunadb
- export const fauna = new Cliente({
- passar a key

```tsx
import { Client } from 'faunadb';

export const fauna = new Client({
    secret: process.env.FAUNADB_KEY
})
```

# Só pra lembrar

- As operações feitas no banco de dados ou stripe que precisam ter acessa à essa key, não podem ser feitas pelo browser
    - Não podem ser feitas requisições nos componentes
- Só podem ser feitas nas rotas da pasta api ou por dentro dos métodos getStaticProps e getStaticSideGenerationProps