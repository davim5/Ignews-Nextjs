This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# 18 - Evitando duplicação no Stripe

- Atualmente estamos criando o costumer da subscription, mas não devemos criar mais de um costumer com o mesmo email.
- Utilizar banco de dados do FaunaDB
- Quando criar o usuário, salvar o id do stripe junto com as informações no FaunaDB.
- Quando for cair na rota Subscribe, verificar se ele já tem **id** do customer stripe inserido
    - Se sim, só reaproveitar
    - Se não, só criar

- Salvar o usuário criado no stripeCustomer criado numa variável

# Buscando o usuário

- Buscar o usuário que precisamos atualizar.
- Não é possível atualizar o usuário pelo índice diretamente.
    - q.Get → faz um SELECT
        - q.Match → que seja igual
            - q.Index → Procurar o usuário pelo email
            - que o email seja igual ao da session logada.

```tsx
const user = await fauna.query<User>(
            q.Get(
                q.Match(
                    q.Index('user_by_email'),
                    q.Casefold(session.user.email)
                )
            )
        )
```

# Atualizando o Usuário no FaunaDB

- Atualizar um usuário
- q.Update → Atualizar
    - q.Ref → o usário dessa collection que tenham essa Ref.
    - Passar os dados que queremos atualizar.
        - nome do dado: valor do dado.

```tsx
await fauna.query(
                q.Update(
                    q.Ref(q.Collection('users'), user.ref.id),{
                        data: {
                            stripe_customer_id: stripeCustomer.id,
                        }
                    }
                )
            ) 
```

- Assim, agora o usuário tem o id do stripe junto com seus dados no FaunaDB.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/77cb40ab-caa3-4276-a4ba-bab5b7e8cd00/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/77cb40ab-caa3-4276-a4ba-bab5b7e8cd00/Untitled.png)

## Criando o Tipo User pra não da Erro.

```tsx
type User = {
    ref: {
        id:string;
    }
    data:{
        stripe_customer_id:string;
    }
}
```

# Verificação

- Verificar se o usuário já tem o stripe_customer_id
- Armazenar a stripe_customer_id do usuário em uma variável **customerId.**

```tsx
let customerId = user.data.stripe_customer_id;
```

- Se **customerId** não existir
    - Criar o novo customer
    - Armazenar o id criado no **customerId**

```tsx
if(!customerId){
            const stripeCustomer = await stripe.customers.create({
                email: session.user.email,
                // metadata
            })
    
            await fauna.query(
                q.Update(
                    q.Ref(q.Collection('users'), user.ref.id),{
                        data: {
                            stripe_customer_id: stripeCustomer.id,
                        }
                    }
                )
            )

            customerId = stripeCustomer.id;
        }
```

- Passar o customerId na criação da sessão.

```tsx
customer: customerId,
```