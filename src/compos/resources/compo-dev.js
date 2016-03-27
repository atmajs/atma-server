var Dev_Scripts = Compo({
	template:[
		// import:string tmpl-dev.mask
	][0],
	meta: {
		mode: 'server',
	},
	onRenderStart: function(model, ctx){
		model = model_getScripts(
			ctx.page, ctx.config
		);

		var resources = model_getResources(ctx.config);

		this.model = {
			include: {
				src: model.include.src,
				routes: JSON.stringify(model.include.routes, null, 4),
				config: JSON.stringify(model.include.cfg, null, 4)
			},
			scripts: model.scripts
				.map(function(x){
					return "'" + x + "'";
				})
				.join(',\n'),
		};
	}
});
Dev_Scripts.getModel = model_getScripts;