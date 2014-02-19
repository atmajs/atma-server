server.HttpPage = (function(){
	
	// import Resources.js	
	// import HttpContext.js
	
	var Page = Class({
		
		Extends: [
			Class.Deferred,
			Resources
		],
		
		template: null,
		master: null,
		
		templatePath: null,
		masterPath: null,
		compoPath: null,
		
		route: null,
		model: null,
		
		send: null,
		
		/**
		 *	- data (Object)
		 *		- template: ? page name
		 *
		 *	@TODO pass current route params
		 */
		Construct: function(mix, app){
			
			if (this instanceof Page === false) {
				return page_Create(mix);
			}
			
			var cfg = __app.config;
			
			/**
			 * Page can also have path url definition like '/?:pageName/?:section/?:anchor'
			 * and then get it like ctx.page.query.pageName;
			 */
			this.route = cfg.page.route;
			
			var route = mix;
			if (!(route && route.value)) {
				logger
					.error('<httppage> current route value is unedefined');
				
				return;
			}
			
			
			var data = this.data = route.value;
			this.query = route.current && route.current.params;
			
			if (data.masterPath) 
				this.masterPath = data.masterPath + '::Master';
			
			if (data.templatePath) 
				this.templatePath = data.templatePath + '::Template';
			
			if (data.master) 
				this.masterPath = cfg.$getMaster(data) + '::Master';
			
			if (data.template) 
				this.templatePath = cfg.$getTemplate(data) + '::Template';
			
			if (data.compo) 
				this.compoPath = cfg.$getCompo(data) + '::Compo';
			
			
			if ((this.template || this.compoPath || this.templatePath) == null) 
				this.templatePath = cfg.$getTemplate(data) + '::Template';
		},
		
		process: function(req, res){
			
			if (this.route) {
				var query = ruta
					.parse(this.route, req.url)
					.params;

				for(var key in query){
					if (this.query[key] == null)
						this.query[key] = query[key];
				}
			}
			
			this.ctx = new HttpContext(this, req, res);
			
			if ('secure' in this.data) {
				
				var user = req.user,
					secure = this.data.secure,
					role = secure && secure.role
					;
					
				if (user == null || (role && user.isInRole(role)) === false) {
					this.ctx.redirect(__app.config.page.urls.login);
					return this;
				}
			}
			
			this._load();
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
				.load(this.masterPath, this.templatePath)
				.js(this.compo)
				.done(fn_proxy(this._response, this));
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
			
			
			var html = mask.render(this.nodes || template, this.model, this.ctx);
			
			if (this.ctx._rewrite != null) {
				__app
					.handlers
					.get(this.ctx._rewrite, page_rewriteDelegate(this));
				return;
			}
			
			if (this.ctx.async) {
				
				this
					.ctx
					.done(fn_proxy(this._doResolve, this))
					.fail(fn_proxy(this.fail, this));
					
				return;
			}
			
			this._doResolve(html);
		},
		
		_doResolve: function(html){
			if (this.ctx._redirect != null) {
				// response was already flushed
				return;
			}
			
			this.resolve(html);
		}
	
	});
	
	
	function page_Create(classProto) {
		
		if (classProto.Base == null) {
			classProto.Base = Page;
		} else if (classProto.Extends == null) {
			classProto.Extends = Page;
		} else if (Array.isArray(classProto)) {
			classProto.Extends.push(Page);
		} else {
			classProto.Extends = [Page, classProto.Extends];
		}
		
		return Class(classProto);
	}
	
	
	function page_rewriteDelegate(page) {
		var ctx = page.ctx;
		
		if (ctx.rewriteCount == null) 
			ctx.rewriteCount = 1;
		
		if (++ctx.rewriteCount > 5) {
			page.reject('Too much rewrites, last path: ' + ctx._rewrite);
			return;
		}
		
		
		return function(rewrittenHandler){
			if (rewrittenHandler == null) {
				page.reject('Rewritten Path is not valid: ' + ctx._rewrite);
				return;
			}
			
			rewrittenHandler
				.process(ctx.req, ctx.res)
				.done(page.resolveDelegate())
				.fail(page.rejectDelegate())
				;
		}
	}
	
	function pageError_sendDelegate(res, error){
		
		return function(html) {
			send_Content(res, html, error.statusCode || 500, mime_HTML);
		};
	}
	
	function pageError_failDelegate(res, error){
		return function(internalError){
			var str = is_Object(internalError)
				? JSON.stringify(internalError)
				: internalError
				;
				
			str += '\nError: ' + error.message
			
			send_Content(res, 'ErrorPage Failed: ' + str, 500, mime_PLAIN);
		}
	}
	
	return Page;	
}());
