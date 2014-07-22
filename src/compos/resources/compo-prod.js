var Prod_Scripts = Compo({
	template:[
		// import:string tmpl-prod.mask
	][0],
	model: 'server:all',
	cache: {
		byProperty: 'ctx.page.id'
	},
	onRenderStart: function(model, ctx){
		var resume = Compo.pause(this, ctx),
			self = this;
			
		model_getScripts(
			ctx.page, ctx.config, false, function(model){
				self.model = model;
				resume();
			}
		);
	}
});
Prod_Scripts.getModel = model_getScripts;