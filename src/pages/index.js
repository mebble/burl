import { useState, useEffect, useReducer } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import UrlField from '../components/UrlField';
import { emptyUrl, getQueryParams, isHttpUrl, parseUrl } from '../url';
import { prompt } from '../constants';
import { urlReducer, action } from '../reducers';

export default function Home() {
    const [ url, send ] = useReducer(urlReducer, emptyUrl());
    const [urlInput, setUrl] = useState('');

    useEffect(() => {
        const appParams = getQueryParams(window.location.search);
        if (appParams.has('u')) {
            setUrl(appParams.get('u'));
        }
    }, []);

    // const [url, send] = useReducer(urlReducer, emptyUrl())
    // const [urlInput, setUrlInput] = useState('')

    // useEffect(() => {
    //     if (!url.isEmpty()) {
    //         setUrlInput(url.toString())
    //     }
    // }, [url])

    // useEffect(() => {
    //     try {
    //         url = parse(urlInput)
    //     } catch () {
    //         url = emptyUrl()
    //     }
    //     send(action('REPLACE', url))
    // }, [urlInput])

    return (
        <div className={styles.container}>
            <Head>
                <title>bURL</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>bURL</h1>
                <input name="url" value={url.raw} type="text" onChange={e => send(action('REPLACE', parseUrl(e.target.value)))} />
                <p className="prompt">{
                    url.raw === ''
                        ? prompt.intro
                        : (url.isBad
                            ? prompt.invalid
                            : prompt.done)
                }</p>
                <UrlField name="protocol" value={url.protocol} disabled={url.isBad} />
                <UrlField name="hostname" value={url.hostname} disabled={url.isBad} />
                <UrlField name="port" value={url.port} disabled={url.isBad} />
                <UrlField name="path" value={url.path} disabled={url.isBad} />
                <ul className="query">{
                    Array.from(url.query).map(([ key, val ]) => (
                        <li key={key}>
                            <UrlField name={key} value={val} disabled={url.isBad} />
                        </li>
                    ))
                }</ul>
                <UrlField name="fragment" value={url.fragment} disabled={url.isBad} />
            </main>
        </div>
    )
}
