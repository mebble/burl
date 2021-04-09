import { Url } from './types';

export const getQueryParams = (url) => {
    if (!url.includes('?') || url.slice(-1) === '?') {
        return new Map();
    }

    const query = url.split(/\?(.+)/)[1].split('#')[0];
    const queryList = query.split('&')
        .map(pair => pair.split(/=(.+)/));

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
        return badUrl();
    }

    const webApiUrl = new URL(url);
    const parsedUrl = new Url({
        protocol: webApiUrl.protocol.slice(0, -1),
        hostname: webApiUrl.hostname,
        port: getPort(url),
        path: webApiUrl.pathname,
        query: getQueryParams(url),
        fragment: webApiUrl.hash.slice(1),
        isBad: false,
    });

    return parsedUrl;
};

const getPort = (url) => {
    const match = url.match(/:(\d+)/);
    if (match) {
        return match[1];
    }
    return '';
};

export const emptyUrl = () => {
    return new Url({
        protocol: '',
        hostname: '',
        port: '',
        path: '',
        query: new Map(),
        fragment: '',
    });
};

export const badUrl = (raw) => {
    return new Url({
        raw: raw,
        protocol: '',
        hostname: '',
        port: '',
        path: '',
        query: new Map(),
        fragment: '',
        isBad: true,
    });
};
