import { RawUrl } from './types.js';
import { emptyIfBlank } from './utils.js';

export const getQueryParams = (url) => {
    if (!url.includes('?')) {
        return new Map();
    }

    const postQuerySeparator = url.split(/\?(.+)/)[1];
    if (!postQuerySeparator) {
        return new Map();
    }

    const query = postQuerySeparator.split('#')[0];
    const queryList = query.split('&')
        .filter(token => token.length > 0)
        .map(token => {
            const [ key, val ] = token.split(/=(.*)/);
            return [ key, emptyIfBlank(val) ];
        });

    return new Map(queryList);
};

export const getUrlParam = (paramKey, url) => {
    const postQuerySeparator = url.split(/\?(.+)/)[1];
    if (!postQuerySeparator) {
        return null;
    }

    const pairs = postQuerySeparator.split('&')
        .map(token => token.split('='));
    const paramIndex = pairs.findIndex(([ key, _ ]) => key === paramKey);

    if (paramIndex === -1) {
        return null;
    }

    return postQuerySeparator.split(new RegExp(`${paramKey}=(.+)`))[1];
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
        return badUrl(url);
    }

    const webApiUrl = new URL(url);
    const path = webApiUrl.pathname;
    const hostname = webApiUrl.hostname;

    const parsedUrl = new RawUrl({
        raw: url,
        protocol: webApiUrl.protocol.slice(0, -1),
        hostname: hostname,
        port: getPort(hostname, url),
        path: path,
        query: getQueryParams(url),
        fragment: webApiUrl.hash.slice(1),
        isBad: false,
    });

    return parsedUrl;
};

const getPort = (hostNameFound, url) => {
    const regex = new RegExp(`${hostNameFound}:(\\d+)`);
    const match = url.match(regex);
    if (match) {
        return match[1];
    }
    return '';
};

// deprecated
export const emptyUrl = () => {
    return new RawUrl({
        protocol: '',
        hostname: '',
        port: '',
        path: '',
        query: new Map(),
        fragment: '',
        raw: '',
        isBad: true,
    });
};

export const badUrl = (raw) => {
    return new RawUrl({
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
