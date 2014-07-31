server.HttpPage = (function(){
	
	// import ./page-utils.js
	// import ./Resources.js	
	// import ./HttpContext.js
	// import ./HttpErrorPage.js
	
	var Page = Class({
		
		Extends: [
			Class.Deferred,
			Resources
		],
		
		template: null,
		master: null,
		
		app: null,
		ctx: null,
		middleware: null,
		
		templatePath: null,
		masterPath: null,
		compoPath: null,
		
		route: null,
		query: null,
		model: null,
		
		send: null,
		
		// Page information contianer (got from configuration)
		data: {
			id: null
		},
		
		Construct: function(mix, app){
			
			if (this instanceof Page === false) 
				return page_Create(mix);
			
			if (mix == null) 
				return this;
			
			var route = mix;
			if (route.value == null) {
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
		},
		_setPageData: function(data, cfg){
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
		
		sendError: function(error, req, res, config){
			HttpErrorPage.send(error, req, res, config);
		},
		
		_load: function(){
			
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
		},
		
		
		_response: function(resp){
			
			var master = resp.load.Master || this.master,
				template = resp.load.Template || this.template,
				Component = resp.Compo;
			
			if (master == null && this.masterPath !== '') {
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
	
	});
	
	
	return Page;	
}());
