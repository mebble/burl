import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import { getQueryParams, isHttpUrl } from '../src/url';

export default function Home() {
    const [url, setUrl] = useState('');
    const isValidUrl = isHttpUrl(url);

    useEffect(() => {
        const appParams = getQueryParams(window.location.search);
        if (appParams.has('u')) {
            setUrl(appParams.get('u'));
        }
    }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>Burl</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>bURL</h1>
                <input className="url" value={url} onChange={e => setUrl(e.target.value)} />
                <p className="prompt">{
                    url === ''
                        ? 'Enter a URL above'
                        : (!isValidUrl
                            ? 'This URL is not valid!'
                            : 'Your URL is broken down below')
                }</p>
                <input className="protocol" disabled={!isValidUrl} />
                <input className="hostname" disabled={!isValidUrl} />
                <input className="port" disabled={!isValidUrl} />
                <input className="path" disabled={!isValidUrl} />
                <ul className="query"></ul>
                <input className="fragment" disabled={!isValidUrl} />
            </main>
        </div>
    )
}
