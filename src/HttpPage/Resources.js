var Resources = (function(){
	
	
	
	var Resources = {
		getScripts: function(config){
			return config.$getScripts(this.data.id);
		},
		
		getStyles: function(config){
			return config.$getStyles(this.data.id);
		}
	};
	
	
	return Resources;
}());