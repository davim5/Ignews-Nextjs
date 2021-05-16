This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# 30 - Validando Assinatura Ativa

- Validar se a assinatura do usuário está ativa para mostrar o conteúdo do post.
- Precisamos passar no useSession se o usuário logado possui uma inscrição ativa ou não.
    - Poderia usar o getStaticProps, mas se precisarmos dessa informação em outra páginas, vai tornar o processo trabalhoso.

# Modificando os dados dentro do Session

- Novo callback no [...nextauth].
- Passando a session

## Encontrar a informação de se o usuário está com a inscrição ativa.

- Pegar dados da inscrição pelo Id(ref) do usuário.
- Comparar com o id(ref) do usuário logado.
    - Buscar informação do usuário logado a partir do email passado na session.
- Verificar se a inscrição está a ativa ou não.
- **Se encontrar:**
    - Retornar session com tudo que já tinha na session mais a nova variável que armazena o status.
- **Se não encontrar:**
    - Retornar session com tudo que já tinha na session mais a nova variável que armazena o status como **null.**

```tsx
callbacks: {
    async session(session){

      try {
        const userActiveSubscription = await fauna.query(
          q.Get(
            q.Intersection([
              q.Match(
                q.Index('subscription_by_user_ref'),
                q.Select(
                  'ref',
                  q.Get(
                    q.Match(
                      q.Index('user_by_email'),
                      q.Casefold(session.user.email)
                    )
                  )
                )
              ),
              q.Match(
                q.Index('subscription_by_status'),
                "active"
              )
               ])
          )
        )
  
        return {
          ...session,
          activeSubscription:userActiveSubscription
        };
      } catch {
        return {
          ...session,
          activeSubscription: null
        }
      }
    },
```

# Redirecionando o usuário

- Na pagina do post [...slug], se o usuário não for inscrito, redirecioná-lo para a Home.

```tsx
// Redirecionando caso a inscrição do usuário não esteja ativa
    if(!session.activeSubscription) {
        return {
            redirect:{
                destination:'/',
                permanent: false,
            }
        }
    }
```

# Evitando que o usuário se inscreva mais de uma vez.

- Agora que a session também envia o status da inscrição do usuário.
- Na função HandleSubscribe
    - Verificar se o usuário logado já possui inscrição ativa ou não.
    - Se tiver: mandar para a página posts.
- 

```tsx
export function SubscribeButton({priceId}:SubscribeButtonProps){
    const [session] = useSession();
    const router = useRouter();

    async function handleSubscribe(){
        if (!session){
            signIn('github');
            return;
        }

        if(session.activeSubscription){
            router.push('/posts');
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
```