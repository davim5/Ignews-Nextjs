This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# 05 - Título Dinâmico por Página

- vai dar um erro de usarmos a tag title diretamente dentro do _doc.
- Seria como se tivesse o mesmo título para todas páginas.
- O ideal seria ter um título diferente para cada página

# Como?

- Tirar o title
- Ir para página que deve informar o proprio título
- Importar Head from 'next/head'
    - **Componente React que podemos colocar em qualquer lugar da tela e tudo que for jogado dentro do Head, vai ser anexado ao Head do _document.**
- Podemos passar meta tags
    - Bom para informações de SEO.
    - keywords..
- Colocar title dentro do Head.

```tsx
import Head from 'next/head';
import styles from '../styles/home.module.scss';

export default function Home() {
  return (
    <>
    <Head>
      <title>ig news | Home</title>
    </Head>
    <h1 className={styles.title}>Hello <span>Mundo</span></h1>
    </>
  )
}
```