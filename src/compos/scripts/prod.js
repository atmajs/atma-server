var Prod_Sctipts;
(function(){
	
	var build_DIR = '/public/build/',
		Template = [
			// import:string prod.mask
		][0];
	

	Prod_Sctipts = Compo({
		mode: 'server:all',
		template: Template,
		cache: {
			byProperty: 'ctx.page.id'
		},
		onRenderStart: function(model, ctx){
			
			if (ctx.config.build == null) {
				logger
					.error('<Application is not built>')
					.warn('To execute the DEV version use `--debug` flag: `node index --debug`'.bold)
					.warn('To build the application run `atma custom node_modules/atma-server/tools/build`')
					;
					
				return;
			}
			
			var pageData = ctx.page.data,
				id = pageData.id,
				data = ctx.config.build[id],
				that = this;
			
			this.model = {
				buildVersion: ctx.config.buildVersion
			};
			
			if (data == null) {
				logger.error('<atma:scripts> No page info',
					id,
					'Build could be faily'
				);
				return;
			}
			
			Compo.pause(this, ctx);
			
			var load = [net.Uri.combine(build_DIR, 'load.html::app')];
			if (id && data.load)
				load.push(net.Uri.combine(build_DIR, id, 'load.html::page'))
			
			
			include
				.instance()
				.load(load)
				.done(function(resp){
					
					var loadedData = resp.load.app;
					if (resp.load.page) 
						loadedData += resp.load.page;
					
					that.model.load = loadedData;
					Compo.resume(that, ctx);
				});
			
		}
	});		
}());
