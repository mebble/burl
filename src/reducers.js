import { Url } from './types'

export const urlReducer = (url, action) => {
    if (action.type === 'PROTOCOL') {
        return new Url({
            protocol: action.payload,
            hostname: url.hostname,
            port: url.port,
            path: url.path,
            query: url.query,
            fragment: url.fragment,
        });
    }
    if (action.type === 'HOSTNAME') {
        return new Url({
            protocol: url.protocol,
            hostname: action.payload,
            port: url.port,
            path: url.path,
            query: url.query,
            fragment: url.fragment,
        });
    }
    if (action.type === 'PORT') {
        return new Url({
            protocol: url.protocol,
            hostname: url.hostname,
            port: action.payload,
            path: url.path,
            query: url.query,
            fragment: url.fragment,
        });
    }
    if (action.type === 'PATH') {
        return new Url({
            protocol: url.protocol,
            hostname: url.hostname,
            port: url.port,
            path: action.payload,
            query: url.query,
            fragment: url.fragment,
        });
    }
    if (action.type === 'FRAGMENT') {
        return new Url({
            protocol: url.protocol,
            hostname: url.hostname,
            port: url.port,
            path: url.path,
            query: url.query,
            fragment: action.payload,
        });
    }
    if (action.type === 'QUERY') {
        const { key, value } = action.payload;
        const newQuery = new Map(url.query);
        if (newQuery.has(key)) {
            newQuery.set(key, value);
        }
        return new Url({
            protocol: url.protocol,
            hostname: url.hostname,
            port: url.port,
            path: url.path,
            query: newQuery,
            fragment: url.fragment,
        });
    }
    if (action.type === 'REPLACE') {
        return action.payload;
    }

    return url;
};
