This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# 21 - Salvando dados do evento

- Colocar um switch no type do evento
- Pra cada tipo de evento, dar um resposta diferente
- Se o tipo não for contemplado jogar um throw error
- Pôr um try catch

```tsx
if(relevantEvents.has(type)) {
    try{
        switch(type){
            case 'checkout.session.completed':
                break;
            default:
                throw new Error('Unhandled event.')
        }
    } catch(err) {
        return res.json({error:'Webhook handler failed.'})
    }
}
```

# No FaunaDB

- Criar um índice para buscar o usuário pela costumer id → user_by_stripe_costumer_id
- Criar nova collection que vai salvar as inscrições do usuário → subsriptions

# Pasta _lib

- Dentro da pasta api
    - O '_' é para que essa pasta não seja interpretada como rota.
        - Todo arquivo dentro da pasta api se torna um api root.
- Nela criar arquivo manageSubscription.ts
- Criar e exportar uma função assíncrona **saveSubscription**
    - Vai receber com parâmetros a a subscriptionId e a costumerId.

    ```tsx
    export async function saveSubscription(
        subscriptionId: string,
        customerId:string,
    ){}
    ```

- Dentro do switch do type checkout.session.completed
    - executar a função de saveSubscription passando os parâmetros.toString()

```tsx
const checkoutSession = event.data.object as Stripe.Checkout.Session

  await saveSubscription(
      checkoutSession.subscription.toString(),
      checkoutSession.customer.toString()
  )
```

## Buscar usuário

- Buscar usuário no FaunaDB com o customer_id.
- Select → pegar apenas o dado passado "ref"
    - De todos que tiver o customer_id igual ao passado na função como parâmetro

```tsx
const userRef = await fauna.query( // Pegando referência do usuário
    q.Select(
        "ref",
        q.Get(
            q.Match(
                q.Index('user_by_stripe_customer_id'),
                customerId
            )
        )
    )
)
```

## Buscar todos os dados da subscription

- Armazenar na variável subscription
    - Os dados que tiverem da subscription com o mesmo id passado na função como parâmetro.

```tsx
const subscription = await stripe.subscriptions.retrieve(subscriptionId);
```

### Separando os dados mais importantes (que vão ser usados)

- Criar uma variável subscriptionData

```tsx
const subscriptionData = {
        id: subscription.id,
        userId: userRef,
        status: subscription.status,
        price_id: subscription.items.data[0].price.id,
    }
```

# Salvar os dados no Fauna DB

```tsx
await fauna.query(
        q.Create(
            q.Collection('subscriptions'),
            { data:subscriptionData }
        )
    )
```