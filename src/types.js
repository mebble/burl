import { default as UrlParse } from 'url-parse';

export class Url {
    constructor(config) {
        this.raw = config.raw;
        this.protocol = config.protocol;
        this.hostname = config.hostname;
        this.port = config.port;
        this.path = config.path;
        this.query = config.query;
        this.fragment = config.fragment;
        this.isBad = config.isBad;
    }

    toString() {
        if (this.isBad) {
            return this.raw;
        }
        if (!this._mandatoryFieldsPresent()) {
            return '';
        }

        const parsedUrl = new UrlParse(this.raw);

        let stringified = parsedUrl.toString();
        if (this.path === '/' && !this.raw.endsWith('/') && stringified.endsWith('/')) {
            stringified = stringified.slice(0, -1)
        }

        return stringified;
    }

    _mandatoryFieldsPresent() {
        return this.protocol && this.hostname && this.path;
    }

    _toQueryString() {
        return Array.from(this.query)
            .map(([k, v]) => `${k}=${v}`)
            .reduce((acc, pair) => acc + '&' + pair);
    }
}
