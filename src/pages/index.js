import { useEffect, useReducer } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import UrlField from '../components/UrlField';
import QueryForm from '../components/QueryForm';
import QueryParam from '../components/QueryParam';

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
                <UrlField name="protocol" value={url.protocol} onChange={e => send(action('PROTOCOL', e.target.value))} disabled={disableFields} />
                <UrlField name="hostname" value={url.hostname} onChange={e => send(action('HOSTNAME', e.target.value))}  disabled={disableFields} />
                <UrlField name="port" value={url.port} onChange={e => send(action('PORT', e.target.value))} disabled={disableFields} />
                <UrlField name="path" value={url.path} onChange={e => send(action('PATH', e.target.value))} disabled={disableFields} />
                <ul className="query">{
                    Array.from(url.query).map(([ key, val ]) => (
                        <li key={key}>
                            <QueryParam
                                name={key}
                                value={val}
                                disabled={disableFields}
                                onChange={e => send(action('QUERY_UPDATE', { key, value: e.target.value }))}
                                onRemove={() => send(action('QUERY_REMOVE', key))} />
                        </li>
                    ))
                }</ul>
                <QueryForm disabled={disableFields} onSubmit={({ newKey, newValue }) => send(action('QUERY_ADD', { key: newKey, value: newValue }))} />
                <UrlField name="fragment" value={url.fragment} onChange={e => send(action('FRAGMENT', e.target.value))} disabled={disableFields} />
            </main>
        </div>
    )
}
