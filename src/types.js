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

        let string = `${this.protocol}://${this.hostname}`;
        if (this.port || this._hasPortColon()) {
            string += `:${this.port}`;
        }
        if (this.path !== '/' || this.raw.endsWith('/')) {
            string += this.path;
        }
        if (this.query.size > 0) {
            string += `?${this._toQueryString()}`;
        }
        if (this.fragment) {
            string += `#${this.fragment}`;
        }

        return string;
    }

    _mandatoryFieldsPresent() {
        return this.protocol && this.hostname && this.path;
    }

    _toQueryString() {
        return Array.from(this.query)
            .map(([k, v]) => `${k}=${v}`)
            .reduce((acc, pair) => acc + '&' + pair);
    }

    _hasPortColon() {
        const [ _, afterHostname ] = this.raw.split(this.hostname);
        return afterHostname[0] === ':';
    }
}
