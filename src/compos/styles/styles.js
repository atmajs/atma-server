
(function(){
	var	DEBUG = app.config.debug || app.config.$get('app.debug'),
		template = "each (.) > link type='text/css' rel='stylesheet' href='~[.]';"
		;
		
	mask.registerHandler('atma:styles', Class({
		mode: 'server:all',
		nodes: mask.parse(template),
		cache: {
			byProperty: DEBUG && 'ctx.page.id'
		},
		renderStart: function(model, ctx){
			
			this.model = DEBUG
				? ctx.page.getStyles()
				: getStyles(app, ctx)
				;
		}
	}));
	
	
	function getStyles(app, ctx) {
		var array = ['/public/build/styles.css'];
		
		var pageData = ctx.page.data,
			id = pageData.id,
			data = app.config.build[id];
			
					
		if (data.styles) 
			array
				.push('/public/build/' + id  + '/styles.css');
		
		return array;
	}
	
}());