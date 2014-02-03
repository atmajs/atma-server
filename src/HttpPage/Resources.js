var Resources = (function(){
	
	
	
	var Resources = {
		getScripts: function(){
			return __app
				.config
				.$getScripts(this.data.id);
		},
		
		getStyles: function(){
			return __app
				.config
				.$getStyles(this.data.id);
		}
	};
	
	
	return Resources;
}());