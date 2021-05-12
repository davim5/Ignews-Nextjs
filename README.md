This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# 04 - Configurando fonte Externa

# Entendendo o _app

- Sempre que se cria um arquivo na pasta pages, o arquivo se torna um rota na aplicação.
    - Não precisamos criar um sistema de roteamento todo na mão, como seria sem usar um next.
- Porém, para repetir um elemento entre as páginas, por exemplo, um Header ou algo que queiramos executar, como um Context.
- No **Next.js**, não temos o componente App que temos com o `create react-app`.
- Aqui teremos o _app
    - É um componente que sempre vai estar  por volta de todas as páginas.
    - Quando acessamos uma página no Next, estamos acessando esse componente.

    ```tsx
    import { AppProps } from 'next/app'

    function MyApp({ Component, pageProps }:AppProps) {
      return <Component {...pageProps} />
    }

    export default MyApp
    ```

- Quando acessamos o componente "Home", na verdade estamos acessando o App, que mostra o Home, no lugar do *Component* que está dentro dele.

## Qual o grande ponto do _app?

- O _app vai ser recarregado toda vez que o usuário mudar de página.
    - Sempre que trocar de tela, _app vai ser reexecutado.
    - Tudo que tiver dentro de chamada HTTP, Estado, tudo vai ser criado do zero.
- Por isso não podemos usar o _app para carregar fontes externas.
    - Pois é algo que deveria ocorrer uma única vez
- Para isso criaremos um arquivo _document.tsx

# _document

- Funciona semelhante ao _app, mas é carregado **uma única vez.**
- Pode ser comparado ao index.html na pasta public.
- Mas não é uma HTML, e sim um componente.
- Precisa ser escrito no formato de classe
    - Formato mais antigo do React.
    - Único que vai ser assim.
- Vai "extender" ao Document que está dentro do next.
- Vai ter +/- as mesma coisas o index.html, tirando algumas que ele já faz sozinhos.

```tsx
import Document from 'next/document'

export default class MyDocument extends Document{
    render(){
        return(
            // <!DOCTYPE html>
            <html lang="en">
            <head>
                {/* <meta charset="UTF-8" /> */}
                {/* <meta http-equiv="X-UA-Compatible" content="IE=edge" /> */}
                {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
                <title>Document</title>
            </head>
            <body>
                
            </body>
            </html>
        );
    }
}
```

- Algumas coisas precisam ser substituídas por elementos do próprio next.
    - O html → Html
    - O head → Head
    - a div root → Main
    - Colocar o NextScript → É onde o Next vai colocar os arquivos Js que a aplicação vai rodar.

```tsx
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document{
    render(){
        return(
            <Html>
            <Head>
                <title>ig.news</title>
            </Head>
            <body>
                <Main/>
                <NextScript/>
            </body>
            </Html>
        );
    }
}
```

# Configurando a Fonte

- Buscar no google fontes
- Escolher os tamanhos
- Copiar tags links
- Colar no Head com o preconnected em primeiro

```tsx
<Head>
	<link rel="preconnect" href="https://fonts.gstatic.com"/>
	<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap" rel="stylesheet"/>
  <title>ig.news</title>
</Head>
```

- Atualiar font-family nos styles