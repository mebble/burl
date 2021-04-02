import { Url } from './types';

export const getQueryParams = (url) => {
    if (!url.includes('?') || url.slice(-1) === '?') {
        return new Map();
    }

    const query = url.split(/\?(.+)/)[1].split('#')[0];
    const queryList = query.split('&')
        .map(pair => pair.split('='));

    return new Map(queryList);
};

export const isHttpUrl = (string) => {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
};

export const parseUrl = (url) => {
    if (!isHttpUrl(url)) {
        throw new Error('Must be an HTTP URL');
    }

    const webApiUrl = new URL(url);
    const parsedUrl = new Url({
        protocol: webApiUrl.protocol.slice(0, -1),
        hostname: webApiUrl.hostname,
        port: webApiUrl.port,
        path: webApiUrl.pathname,
        query: getQueryParams(url),
        fragment: webApiUrl.hash.slice(1),
    });

    return parsedUrl;
};
