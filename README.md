This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# 19 - Webhooks do Stripe

- É uma pattern utilizado para integração entre sistemas na web,
- **Quando vamos integrar na ferramenta de terceiros, como o stripe, as ferramentas usam o conceito de Webhook para conseguir avisar a aplicação de que aconteceu alguma coisa com a aplicação terceira.**

### Exemplo:

- Usuário faz a inscrição
- Usuária cria customer e subscription
- Após o mês o cartão do usuário está sem fundo e não faz o pagamento.
- Como a aplicação fica sabendo que o cartão não passou?
- Deveria ter uma for do stripe avisar a aplicação que o cartão não passou.
- É assim que funciona, quando uma aplicação terceira avisa à nossa aplicação o que algo aconteceu.

## Como?

- Normalmente é por uma **rota HTTP.**
- Damos uma rota para o stripe, para que toda vez que algo acontece ele vai mandar para essa rota.

# No Stripe

- Em settings
- configure webhooks
- Se a aplicação já estiver online, cadastramos um endpoint.
    - Enquanto não está online, não há como colocar o localhost:3000, por exemplo.

# CLI do Stripe

- Como a aplicação não está online
- Linha de comando
- Fica observando/ouvindo os webhooks do stripe e encaminhando para o localhost

## Instalar CLI

- Dar o login

# Começar a ouvir os webhooks

## Criar arquivo webhooks.ts

- Na pasta page/api

```tsx
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) =>{
    console.log('evento recebido');

    res.status(200).json({ ok:true })
}
```

- Executar no terminal
- stripe list foward-to [localhost:3000/rota](http://localhost:3000/rotaque)dapasta

```bash
stripe listen --forward-to localhost:3000/api/webhooks
```

## Testando

- Executando, ir na aplicação e finalizar uma compra

    ### Obs: Pra testar a compra com cartão no Stripe , podemos usar um cartão fictício → 4242 4242 4242 4242

- Ele vai disparar vários webhooks

- Agora vamos organizar esses dados obtidos para usar.