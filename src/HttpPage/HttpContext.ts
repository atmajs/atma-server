export default class HttpContext {
	_rewrite: string;
	_redirect: string;

	constructor(public page, public config, public req, public res) {

	}

	redirect(url, code) {
		if (code == null)
			code = 302;

		this.res.statusCode = code;
		this.res.setHeader('Location', url);
		this.res.setHeader('Content-Length', '0');
		this.res.end();

		this._redirect = url;
	}

	rewrite(url) {

		this._rewrite = url;
	}

}
