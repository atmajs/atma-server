include.exports = {
	process: function(config, done){
		
		io
			.File
			.getFactory()
			.registerHandler(/cfg-defaults\.json$/i, Class({
				exists: function(){
					return true;
				},
				read: function(){
					
					logger.log('read cfg defaults'.cyan.bold);
					
					return this.content = cfg_getDefaults();
				}
			}));
		
		done();
	}
}


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
		
		return JSON.stringify(defaults, null, 4);
	};
}());
