import { useState, useEffect, useReducer } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import UrlField from '../components/UrlField';
import { emptyUrl, getQueryParams, parseUrl } from '../url';
import { prompt } from '../constants';
import { urlReducer, action } from '../reducers';

export default function Home() {
    const [ url, send ] = useReducer(urlReducer, emptyUrl());
    const [urlInput, setUrl] = useState('');
    const disableFields = url.isBad || url.toString() === '';

    useEffect(() => {
        const appParams = getQueryParams(window.location.search);
        if (appParams.has('u')) {
            setUrl(appParams.get('u'));
            send(action('REPLACE', parseUrl(appParams.get('u'))))
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
                <input name="url" value={url.toString()} type="text" onChange={e => send(action('REPLACE', parseUrl(e.target.value)))} />
                <p className="prompt">{
                    url.toString() === ''
                        ? prompt.intro
                        : (url.isBad
                            ? prompt.invalid
                            : prompt.done)
                }</p>
                <UrlField name="protocol" value={url.protocol} onChange={e => send(action('PROTOCOL', e.target.value))} disabled={disableFields} />
                <UrlField name="hostname" value={url.hostname} onChange={e => send(action('HOSTNAME', e.target.value))}  disabled={disableFields} />
                <UrlField name="port" value={url.port} onChange={e => send(action('PORT', e.target.value))} disabled={disableFields} />
                <UrlField name="path" value={url.path} disabled={disableFields} />
                <ul className="query">{
                    Array.from(url.query).map(([ key, val ]) => (
                        <li key={key}>
                            <UrlField name={key} value={val} disabled={disableFields} />
                        </li>
                    ))
                }</ul>
                <UrlField name="fragment" value={url.fragment} disabled={disableFields} />
            </main>
        </div>
    )
}
