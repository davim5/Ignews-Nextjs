This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Adicionando Typescript ao Projeto

# Adicionando junto com as tipagens

- Tipagens do react e node

```jsx
yarn add typescript @types/react @types/node -D
```

- Trocar nome dos arquivos de js para tsx
- Ele vai criar as configurações e arquivos quando rodar.

# No _app

- mportar de next/app as ppropriedades do App → **AppProps**

```tsx
import { AppProps } from ' next/app'

function MyApp({Component,pageProps}:AppProps){
	return <Component {...pageProps}/>
}
```