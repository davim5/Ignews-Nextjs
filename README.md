This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# 26 - Listando Posts em Tela

- Pegar todos os posts do prismic e listar em tela

# Formatação de dados

- Quando buscamos dados de uma API, terceiro é comum os dados não virem no formato que precisamos
    - Principalmente quando lidamos com dadas, valores monetarios, o retorno do prismic
- Fica comum deixar pra formatar esses valores na interface.
    - Fazer formatação dentro do HTML.
    - Essa data vai ser formatada no frontend toda vez que a página for acessada.
    - **Se formatar essa data no momento em que faço chamada da API, antes de passar isso pra visualização, isso só vai ser feito uma vez**
- **Sempre faça a formatação dos dados logo após consumir os dados da API.**
    - Vai  garantir mais processamento, pois não será preciso formatar os valores em tempo de execução na tela.

# Formatando

- Criar um objeto posts
    - Percorrer os resultados
    - retornar um objeto com os dados já formatados.

## Instalar Prismic-dom

- Converte os formatos do prismic para HTML ou texto

```bash
yarn add prismic-dom
yarn add @types/prismic-dom
```

- Importar  RichText da prismic-dom
    - Conversor do formato do prismic para texto ou html

```bash
const posts = response.results.map(post=> {
        return {
            slug: post.uid, // URL 
            title: RichText.asText(post.data.title),
            excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR',{
                day: '2-digit',
                month: 'long',
                year: '2-digit' 
            }),
        };
    });
```

- Pegar o primeiro paragrafo de texto do post
    - Se o post não começar com o texto, descartar
- Pegar conteúdo o post
    - dar um find
        - Encontrar se o conteúdo do texto é do tipo='paragraph'
            - Precorrer o array até encontrar o primeiro que o tipo seja paragraph
                - Se encontrar
                    - Pegar texto
                - Se não
                    - retornar ' '

```bash
excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
```

- retornar os props

```bash
return {
        props: {
            posts
        }
    }
```

# Declarar formato das props

- Por ser array, é bom separa o tipo num type separado e falar que é um array desse tipo.

```bash
type Post = {
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string;
};

interface PostProps {
    posts: Post[];
}

export default function Posts({ posts }:PostProps){
```