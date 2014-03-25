
var Dev_Scripts;
(function(){
	
	var Template = [
		// import:string dev.html
	][0];
	
	Dev_Scripts = Compo({
		mode: 'server:all',
		
		scripts: null,
		renderStart: function(model, ctx){
			
			this.include = ctx
				.config
				.$getInclude();
			
			this.scripts = ctx
				.config
				.$getScripts(ctx.page.data.id)
				.map(function(x, index){
					return "'" + x + "'";
				})
				.join(',\n');
				
		},
		toHtml: function(){
			return Template
				.replace('%CFG%', JSON.stringify(this.include.cfg, null, 4))
				.replace('%ROUTES%', JSON.stringify(this.include.routes, null, 4))
				.replace('%INCLUDE%', this.include.src)
				.replace('%SCRIPTS%', this.scripts)
				;
		}
	});
}());