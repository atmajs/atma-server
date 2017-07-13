import { include, mask, logger, Class, is_Function } from '../dependency'
import { HttpError } from '../HttpError/HttpError'
import { LIB_DIR } from '../vars'
import { fn_delegate, fn_proxy } from '../util/fn'
import Application from '../HttpApplication/Application'
import HttpPageBase from './HttpPageBase'
import HttpErrorPage from './HttpErrorPage'
import { 
	page_process, 
	page_resolve, 
	page_pathAddAlias, 
	page_Create,
	pageError_sendDelegate, 
	pageError_failDelegate, 
	page_proccessRequest,
	page_proccessRequestDelegate,
	page_processPartial } from './page-utils'


export default class HttpPage extends HttpPageBase {

	constructor(route, app: Application){
		super();
		
		if (route == null || route.value == null) {
			logger.error(
				'<HttpPage> Route value is undefined'
			);
			return this;
		}

		var cfg = app.config,
			data = route.value;

		this.app = app;
		this.route = cfg.page.route;
		this.query = route.current && route.current.params;
		this._setPageData(data, cfg);

		return this;
	}
	private _setPageData (data, cfg){
		this.data = data;

		if (data.masterPath != null)
			this.masterPath = data.masterPath;

		if (data.templatePath != null)
			this.templatePath = data.templatePath;

		if (data.master)
			this.masterPath = cfg.$getMaster(data);

		if (data.template)
			this.templatePath = cfg.$getTemplate(data);

		if (data.compo)
			this.compoPath = cfg.$getCompo(data);

		// Generate default template path
		if (this.template == null && this.compoPath == null && this.templatePath == null) {
			this.templatePath = cfg.$getTemplate(data);
		}
	}
	process (req, res, config){

		if (this.middleware == null)
			return page_proccessRequest(this, req, res, config);

		this.middleware.process(
			req,
			res,
			page_proccessRequestDelegate(this, req, res, config),
			config
		);
		return this;
	}

	sendError (error, req, res, config){
		HttpErrorPage.send(error, req, res, config);
	}

	_load (){

		var env = this.data.env,
			env_server,
			env_both;
		if (env != null) {
			env_both = env.both;
			env_server = env.server;
		}
		var base = this.ctx.config.base,
			parent = this.app.resources;
		this.resource = include
			.instance(base, parent)
			.setBase(base)
			.load(
				page_pathAddAlias(this.masterPath, 'Master'),
				page_pathAddAlias(this.templatePath, 'Template'))
			.js(
				page_pathAddAlias(this.compoPath, 'Compo')
			)
			.js(env_both)
			.js(env_server)
			.done(fn_proxy(this._response, this));
		return this;
	}


	_response (resp){
		var master = resp.load.Master || this.master,
			template = resp.load.Template || this.template,
			Component = resp.Compo;

		if (master == null && this.masterPath) {
			this.reject(new HttpError('Page: Masterpage not found'));
			return;
		}

		if (template == null && Component == null) {
			this.reject(new HttpError('Page: Template not found'));
			return;
		}

		if ('master' === this.query.debug) {
			this.resolve(master);
			return;
		}
		if ('template' === this.query.debug) {
			this.resolve(template);
			return;
		}
		if (this.query.breakOn) {
			this.ctx.debug = { breakOn : this.query.breakOn };
		}


		if (master)
			mask.render(mask.parse(master));

		if (Component != null) {

			if (template && Component.template == null)
				Component.template = template;

			if (Component.mode == null)
				Component.mode = 'server';

			this.nodes = new mask
				.Dom
				.Component('', null, Component)
				;
		}

		if (is_Function(this.onRenderStart))
			this.onRenderStart(this.model, this.ctx);

		var nodes = this.nodes || template;
		if (this.query.partial) {
			page_processPartial(this, nodes, this.query.partial);
			return;
		}

		page_process(
			this
			, nodes
			, fn_delegate(page_resolve, this)
		);
	}


	static create (mix) {
		return page_Create(mix);
	}

}
