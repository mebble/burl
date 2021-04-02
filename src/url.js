export const getQueryParams = (url) => {
    if (!url.includes('?') || url.slice(-1) === '?') {
        return new Map();
    }

    const query = url.split(/\?(.+)/)[1];
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
    throw new Error('Must be an HTTP URL')
};
