This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# 28 - Componente: ActiveLink

- Manter o Link do menu selecionado na página aberta
- Dentro do next temos o **useRouter()**
    - Retorna algumas informações que podemos utilizar
        - **asPath.**
            - Mostar exatamente a rota que está sendo acessado
            - Na home mostra apenas "/".
- Então poderíamos passar uma comparação dentro da className de quando cada um dos links está ativo ou não.

```bash
import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss';
import Link from 'next/link';

export function Header(){
	const { asPath } = useRouter();
	
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="ig.news" />
                <nav>
                    <Link href="/">
                    <a className={asPath === '/' ? styles.active : '' } >Home</a>
                    </Link>
                    <Link href="/posts" prefetch>
                    <a className={asPath === '/posts' ? styles.active : '' } >Posts</a>
                    </Link>
                </nav>
                <SignInButton/>
            </div>
        </header>
    )
}
```

# Problema

- Se for preciso fazer isso toda vez que tiver um link na aplicação fica trabalhoso

# Criar componente ActiveLink

- Não tem estilização
    - Só um link do next sendo que com a possibilidade de ter essa classe Active ou não.
- Retornar o Link do proprio Next
- Receber props
- Criar interface ActiveLinkProps
    - children → Vai ser um ReactElement
        - Pois é um elemento React, no caso é  o <a>.
    - activeClassName → a classe que quero colocar quando o link estiver ativo

```tsx
interface ActiveLinkProps {
    children: ReactElement;
    activeClassName: string;
}
```

- Colocar o activeLink no lugar do Link
- Permitir que o ActiveLink receba também trodas as propriedades que o Link já recebe
    - href e etc..
    - extender as propridedas com LinkProps

    ```tsx
    interface ActiveLinkProps extends LinkProps{
        children: ReactElement;
        activeClassName: string;
    }
    ```

- Desestruturas as props
    - Pegar children e activeClassName
    - O restante pode ficar dentro do "...rest"
    - Passar o restanto no <Link>
    - Repassar o children dentro do Link

    ```bash
    export function ActiveLink({ children, activeClassName,...rest}:ActiveLinkProps){
        const { asPath } = useRouter();
        
        return (
            <Link {...rest}>
               {children}
            </Link>
        );
    }
    ```

## Adicionar a verificação na ActiveLink

- Importar o mesmo useRouter em AtiveLink
- Criar className
    - se asPath for igual ao que está sendo passado no href
        - a class vai ser activeClassName
        - se não vai ser vazia

```bash
export function ActiveLink({ children, activeClassName,...rest}:ActiveLinkProps){
    const { asPath } = useRouter();
    
    const className = asPath === rest.href
        ? activeClassName
        : '';

    return (
        <Link {...rest}>
            {children}
        </Link>
    );
}
```

## Passando a classe na <a>

- A <a> está sendo passado com children
- Não temos como passar uma propriedade para o children, pois ele não é um componente.

### cloneElement

- Existe a propriedade cloneElement no react.
- Ela permite clonar um elemento e modificar coisas nele.
- Nessa caso vamos clonar children, mas adicionar com propriedade a className.

```bash
export function ActiveLink({ children, activeClassName,...rest}:ActiveLinkProps){
    const { asPath } = useRouter();
    
    const className = asPath === rest.href
        ? activeClassName
        : '';

    return (
        <Link {...rest}>
            {cloneElement(children,{
                className,
            })}
        </Link>
    );
}
```

-