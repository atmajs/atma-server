import HandlerFactory from '../HandlerFactory'
import IHttpHandler from '../IHttpHandler'
import HttpPage from '../HttpPage/HttpPage'

class MaskHtml extends IHttpHandler<any> {
	
	constructor (public route, public app) {
		super();		
	}

	process (req, res, config) {        
		var url = req.url;
		var route = {
			current: this.route.current,
			value: { 
				template: url, 
				master: null,
				isHtmlPage: true
			}
		};
		var page = new HttpPage(route, this.app);
		page
			.process(req, res, config)
			.pipe(this);

		return this;
	}
};


HandlerFactory.Handlers.MaskHtml = MaskHtml;