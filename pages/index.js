import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Burl</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>bURL</h1>
        <input className="url" />
        <input className="protocol" />
        <input className="host" />
        <input className="port" />
        <input className="path" />
        <ul class="query"></ul>
        <input className="fragment" />
      </main>
    </div>
  )
}
