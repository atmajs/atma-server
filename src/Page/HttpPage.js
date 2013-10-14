server.HttpPage = (function(){
	
	// import Resources.js	

	
	var Page = Class({
		
		Extends: [
			Class.Deferred,
			Resources
		],
		
		template: null,
		master: null,
		route: null,
		
		/**
		 *	- data (Object)
		 *		- template: ? page name
		 *
		 *	@TODO pass current route params
		 */
		Construct: function(mix){
			
			if (this instanceof Page === false) {
				return page_Create(mix);
			}
			
			var cfg = __app.config.page;
			
			/**
			 * Page can also have path url definition like '/?:pageName/?:section/?:anchor'
			 * and then get it like ctx.page.query.pageName;
			 */
			this.route = cfg.route;
			
			var route = mix;
			if (!(route && route.value)) {
				logger
					.error('<httppage> current route value is unedefined');
				
				return;
			}
			
			
			this.data = route.value;
			this.query = route.current && route.current.params;
			
			this.template = cfg.getTemplate(this.data) + '::Template';
			this.master = cfg.getMaster(this.data) + '::Master';

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
			
			this.ctx = {
				req: req,
				res: res,
				page: this
			};
			
			this.load();
			return this;
		},
		
		load: function(){
			
			include
				.instance()
				.load(this.master, this.template)
				.done(fn_proxy(this.response, this));
		},
		
		
		response: function(resp){
			
			var master = resp.load.Master,
				template = resp.load.Template;
				
			
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
			
			
			if (master) {
				mask.render(mask.parse(master));
			}
			
			if (this.onRenderStart) {
				this.onRenderStart(this.ctx.req, this.ctx.res);
			}
			
			var html = mask.render(this.nodes || template, this.model, this.ctx);
			
			if (this.ctx.rewrite) {
				__app
					.handlers
					.get(this.ctx.rewrite, page_rewriteDelegate(this));
				return;
			}
			
			if (this.ctx.async) {
				
				this
					.ctx
					.done(fn_proxy(this.resolve, this))
					.fail(fn_proxy(this.fail, this));
					
				return;
			}
	
			this.resolve(html);
		}
	
	});
	
	
	function page_Create(classProto) {
		var base = classProto
		while (base.Base){
			base = base.Base;
		}
		
		base.Base = Page;
		
		return Class(classProto);
	}
	
	
	function page_rewriteDelegate(page) {
		var ctx = page.ctx;
		
		if (ctx.rewriteCount == null) 
			ctx.rewriteCount = 1;
		
		if (++ctx.rewriteCount > 5) {
			page.reject('Too much rewrites, last path: ' + ctx.rewrite);
			return;
		}
		
		
		return function(rewrittenHandler){
			if (rewrittenHandler == null) {
				page.reject('Rewritten Path is not valid', ctx.rewrite);
				return;
			}
			
			rewrittenHandler
				.process(ctx.req, ctx.res)
				.done(fn_proxy(page.resolve, page))
				.fail(fn_proxy(page.reject, page))
				;
		}
	}
	
	
	return Page;	
}());
