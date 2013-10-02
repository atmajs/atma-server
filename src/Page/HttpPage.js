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
		Construct: function(data, query){
			
			if (this instanceof Page === false) {
				return page_Create(data);
			}
			
			var cfg = __app.config.page;
			
			this.template = cfg.getTemplate(data) + '::Template';
			this.master = cfg.getMaster(data) + '::Master';
			////-this.route = cfg.route;
			
			this.data = data;
			this.query = query;
		},
		
		process: function(req, res){
			
			////this.query = ruta
			////	.parse(this.route, req.url)
			////	.params;
			
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
