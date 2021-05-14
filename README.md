This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# 16 - Gerando Sessão de Checkout
# Checkout session

- Uma url que redireciona usuário
- Ele preencher informações de pagamento
- É redirecionado de volta.

# Criar função handleSubscribe

- Saber se o usuário está logado
    - useSession()
    - Se ele não existir session, redirecionar para autenticação com github
    - retornar
- Se ele está logado
- **Criação de checkout session**

    [https://stripe.com/docs/api/checkout/sessions](https://stripe.com/docs/api/checkout/sessions)

- Executar a função do stripe.
- Não vai funcionar no componente do botão pois,
    - Não teria como ter acesso à Key privada

```tsx
function handleSubscribe(){
        if (!session){
            signIn('github');
            return;
        }
    }
```

- Há 3 opções viáveis
    - getStaticProps (SSG) → Só utilizado quando página é renderizada.
    - getServerSideProps (SSR)  → Só utilizado quando página é renderizada.
    - **API routes**
- Na pasta auth
- criar arquivo subscribe.ts

# Função de Checkout

- exportar função assícrona

```tsx
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { env } from "process";
import { stripe } from "../../services/stripe";

export default async (req:NextApiRequest, res:NextApiResponse) => {
    // Checar se é POST
    if(req.method === 'POST'){
        const session = await getSession({ req });

        const stripeCustomer = await stripe.customers.create({
            email: session.user.email,
            // metadata
        })

        const stripeCheckoutSession = await stripe.checkout.sessions.create({ 
            customer: stripeCustomer.id,
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            line_items: [
                { price: 'price_1IqVj5GFhz5DUpN4Nt2aLZPB', quantity:1}
            ],
            mode:'subscription',
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL
        })

        return res.status(200).json({sessionId:stripeCheckoutSession.id})
    } else {
        res.setHeader('Allow','POST') // Explicando pro Front que o método aceito é POST
        res.status(405).end('Method not allowed'); 
        
    }
}
```

- Verificar se o método da requisição é do tipo POST.
    - se não for POST
        - res.setHeader('Allow','POST')
        - res.status(405).end('method not allowed)'
    - **se for POST**
        - Criar sessão do stripe.
            - Escolher metódo de pagamento.
            - Selecionar se endereço é obrigatório ou não.
            - Selecionar os itens
                - preço
                - quantidade
            - modo
            - Permitir cupons de desconto
            - url de sucesso
            - url se cancelar
        - Informação do comprador
            - Vai ser preciso criar um customer dentro do stripe.

        ## Obtendo informações do usuário

        - Pegar dos cookies.
        - importar getSession do next-auth

        ```tsx
        const session = await getSessoin({ req }) 
        ```

        - Cadastrar no stripe

        ```tsx
        const stripeCustomer = await stripe.customers.create({
        	email: session.user.email,
        // metadata
        })
        ```

    - Passar as informações para a função Checkout
- retornar res.status(200).json(sessionId: stripeCheckoutSessionId)