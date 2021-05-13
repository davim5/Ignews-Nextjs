This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# 12 - Static Side Generation (SSG)

# O que é?

- O processo é semelhante ao SSR.
- A partir do momento que uma pessoa acessa aplicação e faz todo o fluxo
    - Next > Chamadas > Gerar HTML
- Além do Next retornar diretamente pro browser o HTML gerado, ele vai salvar om HTML como um arquivo físico. (Arquivo HTML estático).
- Assim, da proxima vez que a tela for acessada novamente, ele retorna o HTML estático direto pro broswer sem fazer nenhuma chamada.

# Como aplicar?

- Trocar **GetServerSideProps** por **GetStaticProps.**
    - Importar e trocar
- Além disso, tem o **revalidate:**
    - Em quanto tempo, em segundos, quero que essa página seja revalidada(Reconstruída)?
    - Ex: Se dentro de um minuto, várias pessoas acessarem a mesma página vão ver o mesmo HTML.
        - Depois desse minuto, a página será gerada novamente, revalidando o conteúdo da página se houve alguma mudança.

```tsx
export const getStaticProps:GetServerSideProps = async () =>{
  const price = await stripe.prices.retrieve('price_1IqVj5GFhz5DUpN4Nt2aLZPB')
  
  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style:'currency',
      currency:'USD',
    }).format(price.unit_amount / 100), // Em centavos
  };

  return{
    props:{
      product
    },
		revalidate: 60 * 60 * 24 // 24 horas
  }
}
```

# Outras diferenças

- Enquanto o SSG é mais performático, o SSR permite ser mais dinâmico.
- SSG só pode ser usado para páginas que serão iguais para todos.
- SSR pode utilizar dados dinâmicos, como nome do usuário logado.
- Nenhum dos dois substituem totalmente uma chamada API que pode ser feita direto pelo componente
    - **Se não há necessidade de trazer informação do servidor por motivos de indexação ou motores de busca, na maioria das vezes, é melhor fazer pelo cliente. Se for muito custosa, pode ser melhor fazer estática.**

# Resumo

- No React há 3 formas principais de fazer chamada API.

## Client-side Rendering

- Outros casos. Não precisa de indexação. Informação carregada a partir de ação do usuário, não necessariamente quando a página carrega.

## Server-side Rendering

- Vai utilizar quando precisa da indexação, mas também precisa de dados dinâmicos da sessão do usuário. Informação em tempo real. do usuário
- Tudo que é feito dentro do server-side, vai exigir mais processamento/tempo.
    - Exemplo: Nome do usuário

## Static Site Generation

- Vai utilizar para casos de gerar um HTML que será o mesmo para todas as pessoas que irão acessar a aplicação.
- Ex: Home de blog, post do blog, página de um produto, página de categoria.
    - São páginas iguais para todos e que precisam de indexação (SEO)

## Exemplo Geral

- Post do blog
    - Conteúdo do Post → SSG
        - O mais importante e igual para todos.
    - Sessão de comentários → Client-side
        - Pois não é tão importante e precisamos em tempo real.