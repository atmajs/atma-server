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

		var importsArr = ctx.config.$getImports('client');
		var importsStr;
		if (importsArr.length) {
			importsStr = importsArr.map(function(x){
				if (x.type === 'script') {
					return ".js('" + x.path + "')"
				}
				if (x.type === 'style') {
					return ".css('" + x.path + "')"
				}
				if (x.type === 'mask') {
					return ".mask('" + x.path + "')"
				}
			}).join('\n');
		}
		this.model = {
			include: {
				src: model.include.src,
				routes: JSON.stringify(model.include.routes, null, 4),
				config: JSON.stringify(model.include.cfg, null, 4),
				maskSrc: model.mask.src
			},
			scripts: model.scripts
				.map(function(x){
					return "'" + x + "'";
				})
				.join(',\n'),
			imports: importsStr,
			mask: model.mask
		};
	}
});
Dev_Scripts.getModel = model_getScripts;