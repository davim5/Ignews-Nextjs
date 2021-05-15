import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';
import Prismic from '@prismicio/client';

export default function Posts(){
    return(
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href="#">
                        <time>15 maio de 2021</time>
                        <strong>Título do post</strong>
                        <p>Breve paragrafo do post bem grande pra dar uma ocupada na tela.</p>
                    </a>
                    <a href="#">
                        <time>15 maio de 2021</time>
                        <strong>Título do post</strong>
                        <p>Breve paragrafo do post bem grande pra dar uma ocupada na tela.</p>
                    </a>
                    <a href="#">
                        <time>15 maio de 2021</time>
                        <strong>Título do post</strong>
                        <p>Breve paragrafo do post bem grande pra dar uma ocupada na tela.</p>
                    </a>
                </div>
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()

    // Buscar os conteudos
    const response = await prismic.query([
        Prismic.predicates.at('document.type','post')
    ],{
        fetch: ['post.title','post.content'],
        pageSize: 100,
    })

    console.log(response)

    return {
        props:{}
    }
}