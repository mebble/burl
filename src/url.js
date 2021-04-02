export const getQueryParams = (url) => {
    if (!url.includes('?') || url.slice(-1) === '?') {
        return new Map();
    }

    const query = url.split('?')[1];
    const queryList = query.split('&')
        .map(pair => pair.split('='));

    return new Map(queryList);
};
