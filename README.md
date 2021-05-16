This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# 29 - Página: Post

- Dentro da API roots, quando a página é dinâmica ela não vai ser de um post, mas de todos os posts.
- Preciso saber qual post quero mostrar, baseado no id por exemplo.

# Como

- Criar arquivo
- Usar colchete pro nome do parâmetro

# Para acessar o conteúdo do post, precisa de uma assinatura.

- Se for gerada de forma estática, a página não será protegida.

## Usando ServerSideProps

- Vai garantir que o usuário não tem acesso ao conteúdo da página caso não esteja logado.
- Vai precisar ir na Api do prismic toda vez pra buscar o conteúdo do post.
- Dentro do assim, teremos acesso à requisição
- Dentro dela saber se o usuário está logado ou não;

```tsx
export const getServerSideProps = *async* ({ req,params }) => {
```

- Passa com parâmetro o req
- Requisição de onde ele vai buscar os cookies pra saber se está logado ou não.

```tsx
const session = await getSession({ req });
```

## PRA CARREGAR O CONTEÚDO

- Vamos precisar do slug
- pegamos no parametro 'params'

```tsx
const { slug } = params;
```

- Buscar cliente do prismic
- Passando req como parâmetro

```tsx
const prismic = getPrismicClient(req)
```

- Buscar qualquer documento pelo UID.
- Transformar em String

```tsx
const response = await prismic.getByUID('post',String(slug),{});
```

## FORMATAÇÃO DOS DADOS

```tsx
const post = {
		slug,
		title: RichText.asText(response.data.title),
		content: RichText.asHtml(response.data.content),
		updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR',{
		day: '2-digit',
		month: 'long',
		year: '2-digit'
	}),
}
```

- Retornar o post nas props para passar lá em cima

```tsx
return {
	props:{
		post,
	}
}
```

# dangerouslySetInnerHTML

- Como pegamos o conteúdo do post em HTML, não conseguimos inserir ele como uma variável direto em um div.
    - Assim, ele mostraria as próprias tags HTML em tela.
- Porem, os elementos do React possuem uma propriedade chamada **dangerouslySetInnerHTML**, que permite que possamos passar o HTML como parâmetro.

```tsx
export default function Post ({post}:PostProps){
return (
  <>
      <Head>
          <title>{post.title} | Ignews </title>
      </Head>
      <main className={styles.container}>
          <article className={styles.post}>
              <h1>{post.title}</h1>
              <time>{post.updatedAt}</time>
              <div
              className={styles.postContent} 
              dangerouslySetInnerHTML={{__html: post.content}}/>
          </article>
      </main>
  </>
)
}
```