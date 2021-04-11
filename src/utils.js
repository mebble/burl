export const emptyIfBlank = str => {
    if (str === null || str === undefined) {
        return '';
    }
    return str;
}
