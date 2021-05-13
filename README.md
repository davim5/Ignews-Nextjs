This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# 07 - Componente: Header

- Aqui a estrutura de pastas não muda do projeto React comum.
- Pasta Componentes
    - Arquivos index.tsx e styles.module.scss

---

# Importando imagens

- No Next.js, as imagens ficam sempre dentro da pasta **public**.
- Importamos sempre com barra na frente e o nome da pasta ou arquivo diretamente dentro de public.
- Não precisamos importar a imagem por dentro do arquivo tsx.
- Pode importar se quiser usando next-images

---

# Elemento em todas as páginas

- Como o header vai estar em todas as páginas da aplicação, importamos ela no _app.
- Lembro de colocar o fragment "<>" entre os dois componentes.

```tsx
import { AppProps } from 'next/app'
import { Header } from '../components/Header';
import '../styles/global.scss';

function MyApp({ Component, pageProps }:AppProps) {
  return (
    <>
      <Header/> 
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
```