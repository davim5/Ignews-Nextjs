This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# 17 - Redirecionando para o Stripe

- Chamar a requisição

# Instalar axios

- Criar api.ts na services
- importar
- baseURL: /api

```tsx
import axios from 'axios';

export const api = axios.create({
    baseURL:'/api',
})
```

# Chamar rota

- No handleSubscribe
    - api.post('/subscribe')
        - subscribe pois o nome da rota é sempre o nome da pasta.
    - da resposta, pegar o sessionId
- Redirecionar usuário
    - stripe tem duas sdks
        - Uma pra backend
        - Outra pro frontend
    - outro service : stripe.js.ts
    - instalar outra biblioteca
        - @stripe/stripe-js
    - importar loadString de
    - exportar função assíncrona getStripeJs()
        - Passara chave pública do stripe
            - Em developers > API keys
        - Criar variável ambiente com NEXT_PUBLIC.
            - É a única forma de uma variável ambiente ser acessada pelo front-end.

        ```tsx
        import { loadStripe } from '@stripe/stripe-js';

        export async function getStripeJs(){
            const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
            return stripeJs
        }
        ```

```tsx
import { session, signIn } from 'next-auth/client';
import { useEffect } from 'react';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe.js';
import styles from './styles.module.scss';

interface SubscribeButtonProps{
    priceId:string;
}

export function SubscribeButton({priceId}:SubscribeButtonProps){
    
    async function handleSubscribe(){
        if (!session){
            signIn('github');
            return;
        }

        try{
            const response = await api.post('/subscribe');

            const { sessionId  } = response.data;

            const stripe = await getStripeJs();

            await stripe.redirectToCheckout({ sessionId })
        }catch(err){
            alert(err.message);
        }
    }
    
    return(
        <button
        type="button"
        className={styles.subscribeButton}
        onClick ={handleSubscribe}
        >
            Subscribe now
        </button>
    )
}
```

- Mostrar mensagem de erro caso não funcione.