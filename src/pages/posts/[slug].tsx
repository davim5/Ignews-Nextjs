import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client"
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../../services/prismic";

import styles from './post.module.scss';

// Interaface do Post
interface PostProps {
    post:{
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}

export default function Post ({post}:PostProps){
    return (
        <>
            <Head>
                <title>{post.title} | Ignews </title>
            </Head>
            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div
                    className={styles.postContent} 
                    dangerouslySetInnerHTML={{__html: post.content}}/>
                </article>
            </main>
        </>
    )
}

// Vai precisar ir na Api do prismic toda vez pra buscar o conteúdo do post.
// ùnica forma de garantir que o usuário
// Dentro do assim, teremos acesso à requisição
    // Dentro dela saber se o usuário está logado ou não;
export const getServerSideProps: GetServerSideProps = async ({ req,params }) => {
    const session = await getSession({ req });

    // Redirecionando caso a inscrição do usuário não esteja ativa
    if(!session?.activeSubscription) {
        return {
            redirect:{
                destination:'/',
                permanent: false,
            }
        }
    }
    // PRA CARREGAR O CONTEÚDO
    // Vamos precisar do slug
        // pegamos no parametro 'params'
    const { slug } = params;

    // Buscar cliente do prismic
    // Passando req como parâmetro
    const prismic = getPrismicClient(req)

    // Buscar qualquer documento pelo UID.
        // Transformar em String
    const response = await prismic.getByUID('post',String(slug),{});

    //FORMATAÇÃO DOS DADOS
        // 
    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR',{
            day: '2-digit',
            month: 'long',
            year: '2-digit' 
        }),
    }

    // Retornar o post nas props para passar lá em cima
    return {
        props:{
            post,
        }
    }

    

}