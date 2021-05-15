import Head from 'next/head'
import styles from './styles.module.scss'

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