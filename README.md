This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# 27 - Navegação no Menu

- Podemos simplesmente usar o href na tag <a>

```bash
<nav>
    <a className={styles.active} href="/">Home</a>
    <a href="/posts">Posts</a>
</nav>
```

# Então qual o problema disso?

- O Next é feito com React.
- O React, muita coisa entre uma página e outra é reaproveitado entre as páginas.
- Se dentro do next, deixarmos apenas um <a> com href para trocar página, toda a aplicação será carregada novamente.
    - Ele vai ficar limpando e carregando tudo de novo.
- Utilizar somente <a>, vamos usar apenas o recurso do Next de SSR
    - Vamos fazer todas as páginas serem renderizadas do zero

# Como melhorar?

- Em vez da âncora, usar um componente de dentro de next/link → Link
- Colocar por volta das âncoras o Link
- passar o href pro Link.

```bash
<nav>
    <Link href="/">
    <a className={styles.active} >Home</a>
    </Link>
    <Link href="/posts">
    <a >Posts</a>
    </Link>
</nav>
```

- Deixando o ccont
- Agora estamos aproveitando também o conceito de SPA.
    - Aproveitando o bom do React e do Next.
    - Reaproveitando o Core da aplicação mudando somente o conteúdo

## Outra vantagem

- O componente link tem uma propriedade chama prefetch
- **O prefetch, quando termina de carregar toda uma página da aplicação, pode deixar uma outra página já carregada.**
- Bom de deixar em links que o usuário normalmente acessa.