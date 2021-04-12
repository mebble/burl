export class RipeUrl {
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
        if (this.query.size > 0 || this._hasQueryMark()) {
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
            .reduce((acc, pair) => {
                return acc === ''
                    ? pair
                    : acc + '&' + pair;
            }, '');
    }

    _hasPortColon() {
        const [ _, afterHostname ] = this.raw.split(this.hostname);
        return afterHostname[0] === ':';
    }

    _hasQueryMark() {
        const [ _, afterPath ] = this.raw.split(this.path);
        return afterPath[0] === '?';
    }
}

export class RawUrl {
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
        return this.raw;
    }
}
