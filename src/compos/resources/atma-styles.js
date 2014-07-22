var Styles = Compo({
	mode: 'server:all',
	nodes: mask.parse(
		"each (.) > link type='text/css' rel='stylesheet' href='~[.]';"
	),
	cache: DEBUG 
		? { byProperty: 'ctx.page.id' }
		: null
		,
	renderStart: function(model, ctx){
		this.model = model_getStyles(
			ctx.page, ctx.config, false
		);
	}
});
Styles.getModel = model_getStyles;

mask.registerHandler('atma:styles', Styles);