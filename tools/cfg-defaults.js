module.exports = {
	process: function(){		
		io
			.File
			.getFactory()
			.registerHandler(/cfg-defaults\.json$/i, class {
				exists (){
					return true;
				}
				read (){
					
					console.log('reading cfg defaults'.cyan.bold);
					
					return this.content = cfg_getDefaults();
				}
			});
	}
};


var cfg_getDefaults;
(function(){
	
	cfg_getDefaults = function(){
		return _defaults || (_defaults = get());
	};
	
	var _defaults;

	function get(){
		var defaults = {},
		cfg;
		
		new io
			.Directory('src/ConfigDefaults/')
			.readFiles('**.yml')
			.files
			.forEach(function(file){
				cfg = file.read();
				
				for(var key in cfg){
					defaults[key] = cfg[key];
				}
			});
		
		return JSON.stringify(JSON.stringify(defaults));
	};
}());
