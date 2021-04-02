export class Url {
    constructor(config) {
        this.protocol = config.protocol;
        this.hostname = config.hostname;
        this.port = config.port;
        this.path = config.path;
        this.query = config.query;
        this.fragment = config.fragment;
    }
}
