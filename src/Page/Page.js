
include
	.js('Resources.js')
	.done(function(resp){
	
	atma.Page = Class({
		
		Extends: [
			Class.Deferred,
			resp.Resources
		],
		
		template: null,
		master: null,
		route: null,
		
		/**
		 *	- data (Object)
		 *		- template: ? page name
		 */
		Construct: function(data){
			
			var cfg = app.config.page;
			
			this.template = cfg.getTemplate(data) + '::Template';
			this.master = cfg.getMaster(data) + '::Master';
			
			this.route = cfg.route;
			
			
			
			this.data = data;
		},
		
		process: function(req, res){
			
			if (this.onRenderStart) 
				this.onRenderStart(req, res);
			
			
			this.query = ruta
				.parse(this.route, req.url)
				.params;
			
			this.cntx = {
				req: req,
				res: res,
				page: this
			};
			
			this.load(this.response);
			return this;
		},
		
		load: function(){
			
			include
				.instance()
				.load(this.master, this.template)
				.done(this.response);
		},
		
		Self: {
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
					this.cntx.debug = { breakOn : this.query.breakOn };
				}
				
				
				if (master) {
					mask.render(mask.parse(master));
				}
				
				
				var html = mask.render(template, this.model, this.cntx);
				
				if (this.cntx.async) {
					
					
					this
						.cntx
						.done(this.resolve.bind(this))
						.fail(this.fail.bind(this));
						
					return;
				}
		
				this.resolve(html);
			}
		}
	});
	
});