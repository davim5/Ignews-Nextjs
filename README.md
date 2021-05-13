This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# 10 - Consumindo a API do Stripe (SSR)

# Por que precisamos dessas informações?

- Pode ser que algo mude, então precisamos que reflita a configuração do stripe.
- Quando se clica em subscribe, precisamos fazer a referência de qual produto estamos nos inscrevendo.

# Chama à API

## Antes usaríamos useState() useEffect()

- Essa chama iria acontecer somente no browser, depois da interface estar premontada
- Isso geraria duas coisas
    1. A interface vai ser exibida em primeiro momento sem o preço, até que ele carregue a informação (layout-shift)
        - Alteração da página percebida pelo usuário
    2. Se for indexar a página no google, ele não iria indexar esse preço.

## Agora usaremos Server-side Rendering

- Fazer chamadas à API, não broswer, mas no Next.js
- Não precisaria ser em todas as páginas, só em informações importantes.

### Fazendo chama

- Dentro de uma página do Next.js
- **Funciona em páginas, não em componentes.**
    - **Se quiser ter acesso dentro do componente à alguma informação SSR, preciso passar da página para o componente**
- Na página Home
- Exportar uma função const **getServerSideProp**s
    - Precisa ser esse nome, não pode ser outro
- Assícrona -< async ()
- De dentro do Next.js vamos importar um tipagem GetServerSideProps.

```tsx
export const getServerSideProps: GetServerSideProps = async () => {
	return {
		props: {
			nome: 'Diego'
		}
	}
}
```

---

# Função getServerSideProps

- Dessa função pode devolver: redirect, notFound, props
- Tudo que for repassado nesse retorno como propriedade, pode-se acessar nas props do componente.

```tsx
export const getServerSideProps:GetServerSideProps = async () =>{
  return{

  }
}
```

- Todo código dentro dessa função é executado dentro do servidor Node (Next.js)
- Podemos ter acesso no terminal

---

# Instalar Stripe

```tsx
yarn add stripe
```

- Criar pasta services
- Criar stripe.ts

    ## Configurando Stripe

    - Vai definir conexão com stripe
    - É uma biblioteca para lidar com a API do stripe sem precisar fazer as requisições HTTP
- Passamos a secret key
- apiVersion → versão utilizada
- appInfo → informações de metadados
    - name → nome da aplicação
    - version → versão no package JSON
        - Pode-se importar direto do package.json

```tsx
import Stripe from 'stripe'
import { version } from '../../package.json'

export const stripe = new Stripe(
	process.env.STRIPE_API_KEY,
	{
		apiVersion: '2020-08-27',
		appInfo: {
			name: 'Ignews',
			version
		}
	}
)
```

---

# Setando getServerSideProps

- importar a configuração do stripe criada.
    - Com a API do stripe é mais fácil do que com HTTP, pois ele já mostra todas as opções possíveis
- await stripe.prices.retrieve
    - Passar a key do produto
- expand:['product']
    - Daria acesso à todas as informações do produto.
- Criar objeto product
    - priceId: price.id
    - amount: price.unit_amount / 100 → Salvar em centavos é muito mais fácil de lidar e manipular.
    - priceId: price.id
- Retornar o product nas props

```tsx
export const getServerSideProps:GetServerSideProps = async () =>{
  const price = await stripe.prices.retrieve('price_1IqVj5GFhz5DUpN4Nt2aLZPB')
  
  const product = {
    priceId: price.id,
    amount: price.unit_amount / 100, // Em centavos
  };

  return{
    props:{
      product
    }
  }
}
```

- Pegar props no Componente

    ```tsx
    export default function Home({product}:HomeProps)
    ```

    - Criar interface do props.

```tsx
interface HomeProps{
  product:{
    priceId: string;
    amount: number;
  }
}
```

- Formatar preço