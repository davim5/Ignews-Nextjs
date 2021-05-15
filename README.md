This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# 20 - Ouvindo eventos do Stripe

- Receber os eventos e  conseguir "Parsear" esses eventos e pegar os dados dentro deles..
- O Stripe, quando envia os webhooks, utiliza um dado de streaming
    - É como se quando fizessa a requisição para nossa API, eles não estivessem prontos todos de uma vez.
    - É recebido aos poucos
    - Precisamos fazer um código para transformar a resposta do Stripe em algo que seja legível dentro do JS.
- Não é um código pra decorar, é um código específico do Node para streaming.
- Só usar e pronto.

# Converter Stream para String

```tsx
async function buffer(readable:Readable) {
    const chunks = [];

    for await(const chunk of readable){
        chunks.push(
            typeof chunk === "string" ? Buffer.from(chunk) : chunk
        );
    }
    
    return Buffer.concat(chunks);
}
```

- Next tem um formato de entender requisição
- Nessa caso ele vem como Stream
- Precisamos desabilitar o entendimento padrão o Next de como receber requisição

```tsx
export const config = {
    api: {
        bodyParser: false
    }
}
```

# Função

- Verificar se o método é POST
- Receber o código secreto que garante que somos nós que estamos fazendo a requisição

```tsx
export default async (req: NextApiRequest, res: NextApiResponse) =>{
    // Verificar se o método é POST
    if(req.method === 'POST') {
        const buf = await buffer(req)
        // Receber um código secreto que garante que somos nós que estamos fazendo
        // a requisição.
        const secret = req.headers['stripe-signature'];

        // Forma que stripe recomenda (não deve ser com if tradicional)
        
        let event: Stripe.Event

        try {
            event = stripe.webhooks.constructEvent(buf, secret,process.env.STRIPE_WEBHOOK_SECRET);
        } catch (err) {
            return res.status(400).send(`Webhook error: ${err.message}`)
        }

        const { type } = event;

        if(relevantEvents.has(type)) {
            console.log('Evento recebido', event)
        }

        res.status(200).json({ ok:true })
    } else{
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed')
    }

}
```

- Cria uma variável de event do Stripe
- Recebe o event, se bater a key

```tsx
let event: Stripe.Event

try {
    event = stripe.webhooks.constructEvent(buf, secret,process.env.STRIPE_WEBHOOK_SECRET);
} catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`)
}

const { type } = event;
```

- O event nos dá acesso á varias informações
- Vamos usá-lo pra determinar o que fazer
    - **event.type →** retorna exatamente o que vemos no terminal
    - Baseado nesse type decidimos se queremos fazer algo ou não

## Selecionando os eventos

- Set → Array que não pode ter nada duplicado dentro.
- Criar um array que os tipos de eventos que são relevantes para a aplicação.

```tsx
const relevantEvents = new Set([
    'checkout.session.completed'
])
```

## Colhendo o evento

- Se o evento for do tipo que "achamos" relevante.
- console.log

```tsx
if(relevantEvents.has(type)) {
        console.log('Evento recebido', event)
    }
```