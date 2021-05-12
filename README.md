This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Estilização com SASS

- Pasta styles na pasta src

# Scoped CSS

- Funcionamento por padrão no Next.
- Um CSS nunca afetar outro componente, sempre fica "escopado", aplicado ao escopo de um único componente.

# Styled Components vs CSS Tradicional

- Style Components é muito utilzaido
- Não precisar ser utilizado em toda aplicação
- Em algumas aplicações é como "Matar um formiga com uma bazuca"
- Trás complexidades à mais que o CSS Tradicional.
- Trás custo de performance maior que CSS Tradicional.

# Como usar CSS Scoped?

- Mudar arquivo CSS para terminar com .module.css
    - Usa CSS modules
- Importar na pasta do página.
- Não deixa fazer estilizações de forma direta.
- Não deixa CSS ser compartilhado entre mais de um componente

# SASS

- Só instalar o SASS.

```tsx
yarn add sass
```

- mudar arquivo para module.scss
- Permite usar CSS em cascata.

```sass
.title{
    color: red;

    span {
        color:blue;
    }
}
```

# Usando

- Importar o arquivo de estilização em variável styles.
- Chamar a classe como *styles.nomedaclasse*

```tsx
import styles from '../styles/home.module.scss'

export default function Home() {
  return (
    <h1 className={styles.title}>Hello <span>Mundo</span></h1>
  )
}
```