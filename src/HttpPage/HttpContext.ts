import { send_REDIRECT } from '../util/send';

export default class HttpContext {
    _rewrite: string;
    _redirect: string;

    debug?: boolean | {
        breakOn?: string
    }

    constructor(public page, public config, public req, public res) {

    }

    redirect(url, code = 302) {

        send_REDIRECT(this.res, url, code);
        this._redirect = url;
    }

    rewrite(url) {

        this._rewrite = url;
    }
}
