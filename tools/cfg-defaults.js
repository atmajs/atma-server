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
					return this.content = cfg_getDefault();
				}
			}));
		
		done();
	}
}


function cfg_getDefault(){
	var defaults = {},
		cfg;
	
	new io
		.Directory('src/ConfigDefaults/')
		.readFiles('*.yml')
		.files
		.forEach(function(file){
			cfg = file.read();
			
			for(var key in cfg){
				defaults[key] = cfg[key];
			}
		});
	
	return JSON.stringify(defaults, null, 4);
}