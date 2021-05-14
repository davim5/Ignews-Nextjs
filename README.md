This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# 15 - Salvando usuários no BD

# Callbacks no Nextauth

- São funções executadas de forma automática assim que acontece alguma ação.
    - Exemplo: Sempre que usuário faz login na aplicação, é executada uma função signIn

# Salvar os dados no banco de dados.

- importar o fauna no nextauth.
- Escrever um query
    - importar Query as q do faunadb

## Inserção no banco de dados

q.Create → método para fazer inserção

- parâmetros → nome da collection que vamos inserir
- Objeto com o data → Dados que vamos inserir.

[https://docs.fauna.com/fauna/current/api/fql/cheat_sheet](https://docs.fauna.com/fauna/current/api/fql/cheat_sheet)

- retornar true caso o login dê certo

```tsx
callbacks: {
    async signIn(user, account, profile) {
      const { email } = user;

      await fauna.query(
        q.Create(
          q.Collection('users'),
          { data: { email }}
        )
      )

      return true
    }
  },
```

- Quando fizermos o login, será criado um Document dentro da collection users
- Vai criar um timeStamp (ts)
- e ref → como se fosse um id.

# Detalhe

- Como estamos fazendo uma inserção no banco de dados toda vez que o usuário loga, se o usuário já existe ele vai tentar criar de novo.

# Verificação se usuário já existe

- Se existir
    - Ou fazer nada
    - Ou atualizar o document já existente.
- Usar um try catch
- Verificação com o FaunaDB
- Encontrar o usuário pelo índice
    - Se não encontrar, cria novo usuário
    - Se encontrar, não cria, só retorna os dados

```tsx
callbacks: {
    async signIn(user, account, profile) {
      const { email } = user;
      
      console.log(user)

      try{
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(user.email)
                )
              )
            ),q.Create(
              q.Collection('users'),
              { data: { email }}
            ),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email)
              )
            ) 
          )
        )
        return true;
      } catch{
        return false;
      }

    }
  },
```

- Assim, os usuários já criados são reaproveitados