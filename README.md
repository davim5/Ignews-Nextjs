This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# 13 - Autenticação com Next Auth

- Seguir guia do NextAuth
- [https://next-auth.js.org/getting-started/example](https://next-auth.js.org/getting-started/example)
- Instalar ela e as tipagens

```tsx
yarn add next-auth
yarn add @types/next-auth -D
```

---

# Github

- Criar uma aplicação por ambiente.
    - Um pra desenvolvimento
    - Outro pra produção

Github → Settings → Developer Settings → OAuth Settings → New OAuth App

- Nome da aplicação
- URL →
- Descrição opcional
- Authorization callback → http://localhost:3000/api/auth/callback

```tsx
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope:'read-user'
    }),
    
    // ...add more providers here
  ],
})
```

# Variáveis ambiente

GITHUB_CLIENT_ID=

GITHUB_CLIENT_SECRET=

# Scope

- Quais informações quero ter acesso dos usuários.
- [https://docs.github.com/en/developers/apps/authorizing-oauth-apps](https://docs.github.com/en/developers/apps/authorizing-oauth-apps)
- scope: 'read:user' (mais básico)

```tsx
      scope:'read-user'
```

---

# No botão

- No componente que precisa realizar a autenticação
- Importar signIn de next-auth/client
    - Faz a autenticação do usuário.
- onClick={() ⇒ signIn('')}
- signIn recebe informação do tipo de autenticação, no caso 'github'.

```tsx
import { signOut, signIn, useSession } from 'next-auth/client'

export function SignInButton(){
  const [session] = useSession();

  return session ? (
    <button 
    type="button"
    className={styles.signInButton}
    onClick={()=>signOut()}
    >
        <FaGithub color="#04d361"/>
        Davi Lima
        <FiX color="#737380" className={styles.closeIcon}/>
    </button>
```

# Hook useSession

- Retorna informação de que se usuário está logado ou não

```tsx
const [session] = useSession();
```

- Agora em vez da variável, usamos o sessions para verificar se está logado ou não.

```tsx
return session ? () : ()
```

---

# Informações conectadas

- Todos os componentes precisam ter acesso à essa informação.
- Usando contexto.

## no _app.tsx

- Importar Provider do next-auth/client.
    - Como pode ter mais de um, é bom renomear com o que eles são:

        ```tsx
        import { Provider as NextAuthProvider } from 'next-auth/client'
        ```

- Trocar o frament pelo provider.
- Passar um propriedade *session={pageProps.session}.*
    - As informações ativas de estar logado ou não vai chegar mesmo com refresh.

```tsx
import { AppProps } from 'next/app'
import { Header } from '../components/Header';
import '../styles/global.scss';
import { Provider as NextAuthProvider } from 'next-auth/client';

function MyApp({ Component, pageProps }:AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Header/> 
      <Component {...pageProps} />
    </NextAuthProvider>
  );
}

export default MyApp
```

**OBS: Sempre reiniciar o servidor ao mudar variáveis ambiente**

# Logout

- Importar signOut de 'nex-auth/client'
- Disparar a função com onClick no botão.