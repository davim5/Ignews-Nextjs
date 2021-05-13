This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# 06 - Estilos Globais do App

- Estilos compartilhados em todas as páginas.
- criar um global.scss
    - **Sem o "module", pois com o module o css importado ficaria disponível só para o componente que o importou.**
- **Importar o global dentro do _app**
- CSS não pode ser importado no _document
    - Está num nível de renderização que não está pronto pro CSS.
    - É um nível muito próximo ao CSS.
---
# Padronização das cores

- É interessante organizar as variáveis CSS das cores de acordo com a intensidade de cada cor.
- Sendo quanto maior o número ao lado, mais forte a "iluminação" da cor é.

```sass
:root{
    --white: #FFFFFF;

    --gray-100: #e1e1e6;
    --gray-300: #a8a8b3;
    --gray-900: #121214;
    
    --cyan-500: #61dafb;
    --yellow-500: #eba417;
}
```