import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import UrlField from '../components/UrlField';
import { emptyUrl, getQueryParams, isHttpUrl, parseUrl } from '../url';
import { prompt } from '../constants';

export default function Home() {
    const [url, setUrl] = useState('');
    const isValidUrl = isHttpUrl(url);
    const parsedUrl = isValidUrl ? parseUrl(url) : emptyUrl();

    useEffect(() => {
        const appParams = getQueryParams(window.location.search);
        if (appParams.has('u')) {
            setUrl(appParams.get('u'));
        }
    }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>bURL</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>bURL</h1>
                <input className="url" value={url} onChange={e => setUrl(e.target.value)} />
                <p className="prompt">{
                    url === ''
                        ? prompt.intro
                        : (!isValidUrl
                            ? prompt.invalid
                            : prompt.done)
                }</p>
                <UrlField name="protocol" value={parsedUrl.protocol} disabled={!isValidUrl} />
                <UrlField name="hostname" value={parsedUrl.hostname} disabled={!isValidUrl} />
                <UrlField name="port" value={parsedUrl.port} disabled={!isValidUrl} />
                <UrlField name="path" value={parsedUrl.path} disabled={!isValidUrl} />
                <ul className="query">{
                    Array.from(parsedUrl.query).map(([ key, val ]) => (
                        <li key={key}>
                            <UrlField name={key} value={val} disabled={!isValidUrl} />
                        </li>
                    ))
                }</ul>
                <UrlField name="fragment" value={parsedUrl.fragment} disabled={!isValidUrl} />
            </main>
        </div>
    )
}
