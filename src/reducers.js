import { RipeUrl } from './types'

export const urlReducer = (url, action) => {
    if (action.type === 'PROTOCOL') {
        return new RipeUrl({
            protocol: action.payload,
            hostname: url.hostname,
            port: url.port,
            path: url.path,
            query: url.query,
            fragment: url.fragment,
        });
    }
    if (action.type === 'HOSTNAME') {
        return new RipeUrl({
            protocol: url.protocol,
            hostname: action.payload,
            port: url.port,
            path: url.path,
            query: url.query,
            fragment: url.fragment,
        });
    }
    if (action.type === 'PORT') {
        return new RipeUrl({
            protocol: url.protocol,
            hostname: url.hostname,
            port: action.payload,
            path: url.path,
            query: url.query,
            fragment: url.fragment,
        });
    }
    if (action.type === 'PATH') {
        return new RipeUrl({
            protocol: url.protocol,
            hostname: url.hostname,
            port: url.port,
            path: action.payload,
            query: url.query,
            fragment: url.fragment,
        });
    }
    if (action.type === 'FRAGMENT') {
        return new RipeUrl({
            protocol: url.protocol,
            hostname: url.hostname,
            port: url.port,
            path: url.path,
            query: url.query,
            fragment: action.payload,
        });
    }
    if (action.type === 'QUERY_UPDATE') {
        const { key, value } = action.payload;
        const newQuery = new Map(url.query);
        if (newQuery.has(key)) {
            newQuery.set(key, value);
        }
        return new RipeUrl({
            protocol: url.protocol,
            hostname: url.hostname,
            port: url.port,
            path: url.path,
            query: newQuery,
            fragment: url.fragment,
        });
    }
    if (action.type === 'QUERY_ADD') {
        const { key, value } = action.payload;
        const newQuery = new Map(url.query);
        if (key && !newQuery.has(key)) {
            newQuery.set(key, value);
        }
        return new RipeUrl({
            protocol: url.protocol,
            hostname: url.hostname,
            port: url.port,
            path: url.path,
            query: newQuery,
            fragment: url.fragment,
        });
    }
    if (action.type === 'QUERY_REMOVE') {
        const key = action.payload;
        const newQuery = new Map(url.query);
        newQuery.delete(key);
        return new RipeUrl({
            protocol: url.protocol,
            hostname: url.hostname,
            port: url.port,
            path: url.path,
            query: newQuery,
            fragment: url.fragment,
        })
    }
    if (action.type === 'REPLACE') {
        return action.payload;
    }

    return url;
};

export const action = (type, payload) => {
    return { type, payload };
};
