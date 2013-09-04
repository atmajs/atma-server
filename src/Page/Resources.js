var Resources = (function(){
	
	
	
	var Resources = {
		getScripts: function(){
			return __app
				.config
				.page
				.getScripts(this.data.id);
		},
		
		getStyles: function(){
			return __app
				.config
				.page
				.getStyles(this.data.id);
		}
	};
	
	
	return Resources;
}());