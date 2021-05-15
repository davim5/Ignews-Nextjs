This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# 25 - Consumindo API do Prismic

# Formas

## API em Rest

- O que estamos acostumados

## GraphQL

## Com as tecnologias mais comuns

- JavaScript
- React
- Next (em beta)

- No caso vamos usar de React/Javascript

# Criar service

- Cada service é uma forma de contatar alguma coleta de dados, cada services é uma integração com algum serviço
- Criar em services um prismic.ts

### Instalar

- Cliente do prismic pra integrar com JS

```tsx
yarn add @prismicio/client
```

- Importar prismic de
- Instanciar client do prismic. (documentação)
    - Criar client do prismic passando a access token
    - Passar também um objeto com a access token.
- Passar o req como parâmetro do tipo uknown.

```tsx
import Prismic from '@prismicio/client';

export function getPrismicClient(req?: unknown){
  const prismic = Prismic.client(
      process.env.PRISMIC_ENDPOINT,
      {
          req,
          accessToken: process.env.PRISMIC_ACCESS_TOKEN
      }
  )
}
```

# Carregar listagem de posts

- Na página posts
- A página vai ser estática
    - Não teremos posts a cada minuto
    - Pode atualizar uma vez a cada 1 hora por exemplo.
- Usar api do prismic → getPrismicCliente()
- Fazer um query para buscar os dados do client.
    1. A api de fazer where do prismic é o *predicates*
        - documentos que o tipo for post

    2. Fetch → quais dados quero buscar da publicação,

    - pageSize: quantos posts quero trazer
        - Prismic sempre usa paginação, é sempre bom ter algum tipo.

- retornar props

```tsx
export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()

    // Buscar os conteudos
    const response = await prismic.query([
        Prismic.predicates.at('document.type','post')
    ],{
        fetch: ['post.title','post.content'],
        pageSize: 100,
    })

    console.log(response)

    return {
        props:{}
    }
}
```

# Formas

## API em Rest

- O que estamos acostumados

## GraphQL

## Com as tecnologias mais comuns

- JavaScript
- React
- Next (em beta)

- No caso vamos usar de React/Javascript

# Criar service

- Cada service é uma forma de contatar alguma coleta de dados, cada services é uma integração com algum serviço
- Criar em services um prismic.ts

### Instalar

- Cliente do prismic pra integrar com JS

```tsx
yarn add @prismicio/client
```

- Importar prismic de
- Instanciar client do prismic. (documentação)
    - Criar client do prismic passando a access token
    - Passar também um objeto com a access token.
- Passar o req como parâmetro do tipo uknown.

```tsx
import Prismic from '@prismicio/client';

export function getPrismicClient(req?: unknown){
  const prismic = Prismic.client(
      process.env.PRISMIC_ENDPOINT,
      {
          req,
          accessToken: process.env.PRISMIC_ACCESS_TOKEN
      }
  )
}
```

# Carregar listagem de posts

- Na página posts
- A página vai ser estática
    - Não teremos posts a cada minuto
    - Pode atualizar uma vez a cada 1 hora por exemplo.
- Usar api do prismic → getPrismicCliente()
- Fazer um query para buscar os dados do client.
    1. A api de fazer where do prismic é o *predicates*
        - documentos que o tipo for post

    2. Fetch → quais dados quero buscar da publicação,

    - pageSize: quantos posts quero trazer
        - Prismic sempre usa paginação, é sempre bom ter algum tipo.

- retornar props

```tsx
export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()

    // Buscar os conteudos
    const response = await prismic.query([
        Prismic.predicates.at('document.type','post')
    ],{
        fetch: ['post.title','post.content'],
        pageSize: 100,
    })

    console.log(response)

    return {
        props:{}
    }
}
```