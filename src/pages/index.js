import { useEffect, useReducer } from 'react';
import { Space } from 'antd';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import Title from '../components/Title';
import UrlField from '../components/UrlField';
import Prompt from '../components/Prompt';
import Query from '../components/Query';
import UrlInput from '../components/UrlInput';

import { badUrl, getUrlParam, parseUrl } from '../url';
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
                <Title>bURL</Title>
                <UrlInput url={url} onChange={value => send(action('REPLACE', parseUrl(value)))} />
                <Prompt url={url} />
                <Space direction="vertical">
                    <UrlField name="protocol" value={url.protocol} onChange={value => send(action('PROTOCOL', value))} disabled={disableFields} />
                    <UrlField name="hostname" value={url.hostname} onChange={value => send(action('HOSTNAME', value))}  disabled={disableFields} />
                    <UrlField name="port" type="number" value={url.port} onChange={value => send(action('PORT', value))} disabled={disableFields} />
                    <UrlField name="path" value={url.path} onChange={value => send(action('PATH', value))} disabled={disableFields} />
                    <Query
                        queryParams={url.query}
                        disabled={disableFields}
                        onChange={(key, value) => send(action('QUERY_UPDATE', { key, value }))}
                        onRemove={(key) => send(action('QUERY_REMOVE', key))}
                        onSubmit={(key, value) => send(action('QUERY_ADD', { key, value }))} />
                    <UrlField name="fragment" value={url.fragment} onChange={value => send(action('FRAGMENT', value))} disabled={disableFields} />
                </Space>
            </main>
        </div>
    )
}
