import HandlerFactory from '../HandlerFactory'
import { IHttpHandler } from '../IHttpHandler'
import HttpPage from '../HttpPage/HttpPage'
import { Class } from '../dependency'

class MaskRunner extends Class.Deferred implements IHttpHandler {
	
	constructor (public route, public app) {
		super();
		this.app = app;
		this.route = route;
	}

	process (req, res, config) {
		var url = req.url.replace(/\.\w+$/, '');
		var route = {
			current: this.route.current,
			value: { template: url, master: null }
		};
		var page = new HttpPage(route, this.app);
		page
			.process(req, res, config)
			.pipe(this);

		return this;
	}
};


HandlerFactory.Handlers.MaskRunner = MaskRunner;