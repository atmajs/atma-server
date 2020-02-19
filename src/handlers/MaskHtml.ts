import HandlerFactory from '../HandlerFactory'
import { IHttpHandler } from '../IHttpHandler'
import HttpPage from '../HttpPage/HttpPage'

class MaskHtml implements IHttpHandler {

    constructor(public route, public app) {

    }

    process(req, res, config) {
        var url = req.url;
        var route = {
            current: this.route.current,
            value: {
                template: url,
                master: null,
                isHtmlPage: true
            }
        };
        let page = new HttpPage(route, this.app);
        return page.process(req, res, config);
    }
};


HandlerFactory.Handlers.MaskHtml = MaskHtml;