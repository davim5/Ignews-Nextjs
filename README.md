This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# 32 - Gerando preview Static

- Em todo getStaticProps é importate retornar a opção revalidate
    - Diz em quando em quanto tempo o post deve ser renovado/atualizado conforme os acessos das pessoas.
    - em segundos

```tsx
return {
        props:{
            post,
        },
        redirect: 60 * 30,
    }
```

# GetStaticPaths

- Next tem alguns comportamentos na parte de geração de sites estáticos.

    ## 2 Formatos mais comuns

    ### 1. **Gerar as páginas estáticas durante a build**

    - Carregar previamente na hora que for rodado o ***yarn build***
    - **Antes de ser colocado em produção, o Next vai nas páginas que precisam ser geradas estáticas e já cria o html estático de todas essas páginas, para que assim que a primeira pessoa acesse, já esteja estático e não precise aguardar ser carregado.**
    - Nesse caso ele iria em cada um dos arquivos e já geraria o HTML.
    - Se tivessem, milhares de páginas para carregar, isso seria inviável.

    ### 2. Gerar a página estática no primeiro acesso.

    - A primeira pessoa a acessar página do produto, ele vai executar a getStaticProps e armazenar o HTML de forma estática.

    ### 3. Metade

    - Gerar a parte estática da página de apenas alguns produtos e deixar o resto pra gerar de forma estática conforme o acesso.
    - Não existe certo nem errado, mas pros e contras.

## GetStaticPaths

- Paths → Retorna quais previews de pos quero gerar durante a build
    - Vazio → Todos serão gerados conforme são acessados
    - Poderia ter uma chamada dos posts mais 'quentes' e retornar em um objeto os slugs.
    - Só existe em páginas com parâmetros dinâmicos ( com os colchetes)
- Fallback →
    - blocking → Tipo o true, mas quando  tentar acessar um post que não foi gerado de forma estática, vai carregar na camada do next e mostrar quando tiver carregado.
    - true → Se alguem tentar acessar um post que não foi gerado de forma estática, carregar pelo lado do browser.
        - Causa layout shift.
        - Não é bom pra SEO
    - false → se o post não foi gerado de forma estática ainda, mostrar 404.
        - Pode ser usado em ocasiões que não tem novos registros.

```tsx
export const getStaticPaths: GetStaticPaths = () => {
  return{
      paths:[],
      fallback:'blocking'
  }
}
```