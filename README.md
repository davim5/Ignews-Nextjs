This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# 31 - Página preview do post

- Vai ser utilizada principalmente pelos mecanismos de busca para que os posts sejam indexados, mesmo que sejam apenas acessável por quem assina a aplicação.
- Ver preview do post.
- Dar opção de se inscrever

# Criar

- Pasta preview dentro da pasta posts
- Copiar a [...slug] e utilizar a mesma estilização.

### Código pra funcionar que vai ser explicado depois

```tsx
export const getStaticPaths = () => {
    return{
        paths:[],
        fallback:'blocking'
    }
}
```

# Removendo parte do post

- Remover parte do post que não deve ser exibido
- Fazer um splice no conteúdo do post
    - Pegar os 3 primeiros blocos de conteúdo

```tsx
const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content.splice(0,3)),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR',{
            day: '2-digit',
            month: 'long',
            year: '2-digit' 
        }),
```

## Fazedo degradê

- Colocando outra classe na div do content.

```tsx
<div
className={`${styles.postContent} ${styles.previewContent}`} 
dangerouslySetInnerHTML={{__html: post.content}}/>
```

- Se o a classe postContent for também um previewContent, adicionar um linear gradient.

```tsx
&.previewContent{
    background: linear-gradient(var(--gray-100),transparent);
    background-clip: text;
    -webkit-text-fill-color: transparent; // fazer gradiente no texto
}
```

# Verificar se o usuário está logado e redirecionar.

- Se a pessoa está logada e tem uma inscrição ativa, é melhor ela não ver o preview do post, mas o post original completo.
- Como isso é estático, não há como fazer uma verificação.
- A única forma de saber se o usuário está logado é por dentro do proprio componente PostPreview.
- useSession
- useEffect se a session mudar.
    - Não deixar o array vazio.
    - Ele funcionaria com array vazio, mas assim ele só vai executar a verificação no momento em que a página for carregada.
    - Se o useEffect for de acordo com o session, se o usuário logar na hora, ele já vai ser redirecionado para a página com conteúdo completo.

```tsx
useEffect(() => {
    if(session?.activeSubscription) {
        router.push(`/posts/${post.slug}`)
    }
},[session]);
```