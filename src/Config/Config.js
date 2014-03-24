var Config = (function() {

	var PATH = 'server/config/**.yml',
		BUILD_PATH = 'public/build/stats.json';

	// import PathUtils.js
	// import ConfigUtils.js
	// import EnvUtils.js
	// import IncludeUtils.js
		
	function Config(params, app) {
		params = params || {};
		
		var path_base = params.base,
			path_Configs = params.configs,
			path_Build,
			appConfig;
		
		if (path_base != null){
			if (path_base[0] === '/')
				path_base = path_base.substring(1);
				
			var uri = new net.Uri(path_base);
			path_base = uri.isRelative()
				? io
					.env
					.currentDir
					.combine(uri)
					.toString()
				: uri.toString()
				;
		}
		
		if (path_base == null) 
			path_base = io.env.currentDir.toString()
		
		
		if (path_Configs === void 0) {
			//! not a `null`-check, as `null` is also acceptable
			path_Configs = path_base + PATH;
		}
		
		if (path_Configs) 
			path_Build = path_base + (params.buildDirectory || BUILD_PATH);
		
		if (params.config) 
			appConfig = { config: params.config };
		
		
		var $sources = [
			{
				config: __cfgDefaults
			},
			{
				config: {
					base: path_base
				}
			},
			path_Configs
				? {
					path: path_Configs
				}
				: null,
			path_Build
				? {
					path: path_Build,
					optional: true
				}
				: null,
			{
				config: ConfigUtils
			},
			{
				path: 'package.json',
				getterProperty: 'atma'
			},
			{
				config: EnvUtils
			},
			appConfig
		];

		if (Array.isArray(params.sources)) 
			$source = $sources.concat(params.sources);
		
		return require('appcfg')
			.fetch($sources)
			.fail(function(error){
				throw new Error('<app:configuration>', error);
			})
			.done(function() {
			
			var cfg = this;
			cfg.defer();
			
			new Class.Await(
				configurate_Mask(cfg),
				configurate_Include(cfg),
				configurate_Pages(cfg, app),
				configurate_Plugins(cfg, app)
			)
			.always(function(){
				cfg.resolve();
			});
		});
	}

	return Config;
}());