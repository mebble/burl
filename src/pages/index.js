import { useEffect, useReducer } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import UrlField from '../components/UrlField';
import QueryForm from '../components/QueryForm';
import QueryList from '../components/QueryList';

import { badUrl, getUrlParam, parseUrl } from '../url';
import { prompt } from '../constants';
import { urlReducer, action } from '../reducers';

export default function Home() {
    const [ url, send ] = useReducer(urlReducer, badUrl(''));
    const disableFields = url.isBad();

    useEffect(() => {
        const urlParam = getUrlParam('u', window.location.href);
        if (urlParam) {
            send(action('REPLACE', parseUrl(urlParam)));
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
                <p className={styles.flex}>
                    <input name="url" value={url.toString()} type="text" onChange={e => send(action('REPLACE', parseUrl(e.target.value)))} />
                    <a className="url"
                        href={disableFields ? '#' : url.toString()}
                        target={disableFields ? null : "_blank"}
                        rel="noopener noreferrer"
                    >Visit</a>
                </p>
                <p className="prompt">{
                    url.toString() === ''
                        ? prompt.intro
                        : (url.isBad()
                            ? prompt.invalid
                            : prompt.done)
                }</p>
                <UrlField name="protocol" value={url.protocol} onChange={value => send(action('PROTOCOL', value))} disabled={disableFields} />
                <UrlField name="hostname" value={url.hostname} onChange={value => send(action('HOSTNAME', value))}  disabled={disableFields} />
                <UrlField name="port" value={url.port} onChange={value => send(action('PORT', value))} disabled={disableFields} />
                <UrlField name="path" value={url.path} onChange={value => send(action('PATH', value))} disabled={disableFields} />
                <QueryList
                    queryParams={url.query}
                    disabled={disableFields}
                    onChange={(key, value) => send(action('QUERY_UPDATE', { key, value }))}
                    onRemove={(key) => send(action('QUERY_REMOVE', key))} />
                <QueryForm disabled={disableFields} onSubmit={(key, value) => send(action('QUERY_ADD', { key, value }))} />
                <UrlField name="fragment" value={url.fragment} onChange={value => send(action('FRAGMENT', value))} disabled={disableFields} />
            </main>
        </div>
    )
}
