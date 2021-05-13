This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# 08 - Componente: SignInButton

- Criar como componente isolado

# Por que?

- Terá dois funcionamentos
    - Ao clicar: fazer toda a questão da autenticação
    - Vai ter dois estados, tem comportamento.
        - Logado
        - Não logado
    - Esse comportamento não é necessário fora do contexto dele.
- Queremos isolar os comportamentos que não pertencem ao restante do App.

## Por pertencer ao Header, posso colocar dentro da pasta Header?

- Sim, é bom em projetos maiores.
- Nessa caso, não colocaremos

---

# React Icons

- Biblioteca com vários ícones úteis.

```tsx
yarn add react-icons
```

- Insere como um componente.

```tsx
<button 
type="button"
className={styles.signInButton}>
    <FaGithub color="#04d361"/>
    Davi Lima
    <FiX color="#737380" className={styles.closeIcon}/>
</button>
```

- Mudando cor e o elemento de acordo com um "estado"

```tsx
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi';
import styles from './styles.module.scss';

export function SignInButton(){
    const isUserLoggedIn = true;

    return isUserLoggedIn ? (
        <button 
        type="button"
        className={styles.signInButton}>
            <FaGithub color="#04d361"/>
            Davi Lima
            <FiX color="#737380" className={styles.closeIcon}/>
        </button>
    ) : (
        <button 
        type="button"
        className={styles.signInButton}>
            <FaGithub color="#eba417"/>
            Sign in with Github
        </button>
    );
}
```