server.HttpPage = (function(){
	
	// import page-utils.js
	// import Resources.js	
	// import HttpContext.js
	
	
	var Page = Class({
		
		Extends: [
			Class.Deferred,
			Resources
		],
		
		template: null,
		master: null,
		
		ctx: null,
		middleware: null,
		
		templatePath: null,
		masterPath: null,
		compoPath: null,
		
		route: null,
		model: null,
		
		send: null,
	
		Construct: function(route, app){
			
			if (this instanceof Page === false) {
				return page_Create(route, app);
			}
			
			var cfg = app.config;
			
			/**
			 * Page can also have path url definition like '/?:pageName/?:section/?:anchor'
			 * and then get it like ctx.page.query.pageName;
			 */
			this.route = cfg.page.route;
			if (!(route && route.value)) {
				logger
					.error('<httppage> current route value is unedefined');
				
				return;
			}
			
			
			var data = this.data = route.value;
			this.query = route.current && route.current.params;
			
			if (data.masterPath) 
				this.masterPath = data.masterPath;
			
			if (data.templatePath) 
				this.templatePath = data.templatePath;
			
			if (data.master) 
				this.masterPath = cfg.$getMaster(data);
			
			if (data.template) 
				this.templatePath = cfg.$getTemplate(data);
			
			if (data.compo) 
				this.compoPath = cfg.$getCompo(data);
			
			
			if (this.template == null && this.compoPath == null && this.templatePath == null)
				this.templatePath = cfg.$getTemplate(data);
			
			if (this.master == null && this.masterPath == null)
				this.masterPath = cfg.$getMaster(data);
				
		},
		
		process: function(req, res, config){
			
			if (this.middleware == null) 
				return page_proccessRequest(this, req, res, config);
			
			this.middleware.process(
				req,
				res,
				page_proccessRequestDelegate(this, req, res, config),
				config
			);
			return this;
		},
		
		sendError: function(res, mix, statusCode){
			var pageCfg = __app.config.page,
				errorPages = pageCfg.errors,
				genericPage = pageCfg.error
				;
			
			var error;
			if (mix instanceof Error) {
				error = mix;
			}
			else if (is_String(mix)) {
				error = new HttpError(mix, statusCode);
			}
			else if (is_Object(mix)) {
				error = new HttpError(JSON.stringify(mix), statusCode);
			}
			
			var pageData = (errorPages && errorPages[error.statusCode]) || genericPage,
				page;
				
			
			if (pageData == null) {
				pageError_failDelegate
					(res, error)
					('No Error Page in Configuration')
					;
				return;
			}
			
			this.masterPath = __app.config.$getMaster(pageData) + '::Master';
			this.templatePath = pageData.template + '::Template';
			this.compoPath = null;
			this.model = error;
			this
				.defer()
				.done(pageError_sendDelegate(res, error))
				.fail(pageError_failDelegate(res, error))
				._load()
				;
			
		},
		
		_load: function(){
			
			this.resource = include
				.instance()
				.load(
					page_pathAddAlias(this.masterPath, 'Master'),
					page_pathAddAlias(this.templatePath, 'Template'))
				.js(
					page_pathAddAlias(this.compoPath, 'Compo')
				)
				.done(fn_proxy(this._response, this));
			return this;
		},
		
		
		_response: function(resp){
			
			var master = resp.load.Master || this.master,
				template = resp.load.Template || this.template,
				Component = resp.Compo;
			
			if (master == null) {
				this.reject(HttpError('Page: Masterpage not found'));
				return;
			}
			
			if (template == null && Component == null) {
				this.reject(HttpError('Page: Template not found'));
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
			
			
			var html = mask.render(
				this.nodes || template,
				this.model,
				this.ctx,
				null,
				this
			);
			
			if (this.ctx._rewrite != null) {
				__app
					.handlers
					.get(this.ctx._rewrite, page_rewriteDelegate(this));
				return;
			}
			
			if (this.ctx.async) {
				this
					.ctx
					.done(fn_delegate(page_resolve, this))
					.fail(this.rejectDelegate());
				return;
			}
			
			page_resolve(this, html)
		}
	
	});
	
	
	return Page;	
}());
