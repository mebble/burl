export class Url {
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
        return `${this.protocol}://${this.hostname}${this.path}`;
    }

    _mandatoryFieldsPresent() {
        return this.protocol && this.hostname && this.path;
    }
}
