export class RipeUrl {
    constructor(config) {
        this.protocol = config.protocol;
        this.hostname = config.hostname;
        this.port = config.port;
        this.path = config.path;
        this.query = config.query;
        this.fragment = config.fragment;
    }

    toString() {
        if (!this._mandatoryFieldsPresent()) {
            return '';
        }

        let string = `${this.protocol}://${this.hostname}`;
        if (this.port) {
            string += `:${this.port}`;
        }
        if (this.path) {
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

    isBad() {
        return false;
    }

    _mandatoryFieldsPresent() {
        return this.protocol && this.hostname;
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
}

export class RawUrl {
    constructor(config) {
        this._raw = config.raw;
        this.protocol = config.protocol;
        this.hostname = config.hostname;
        this.port = config.port;
        this.path = config.path;
        this.query = config.query;
        this.fragment = config.fragment;
        this._isBad = config.isBad;
    }

    isBad() {
        return this._isBad;
    }

    toString() {
        return this._raw;
    }
}
