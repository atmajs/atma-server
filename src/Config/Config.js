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
			configs = params.configs,
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
		
		configs = cfg_prepair(path_base, configs, PATH);
		
		if (configs === void 0) {
			//! not a `null`-check, as `null` is also acceptable
			configs = [ path_base + PATH ];
		}
		
		if (configs)
			// is `configs` null, do not load also build values
			path_Build = path_base + (params.buildDirectory || BUILD_PATH);
		
		if (params.config) 
			appConfig = { config: params.config };
		
		
		var $sources = [
			{
				config: JSON.parse(__cfgDefaults)
			},
			{
				config: {
					base: path_base
				}
			},
			////// - removed. Push configs array afterwards
			//////path_Configs
			//////	? {
			//////		path: path_Configs
			//////	}
			//////	: null,
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
				getterProperty: 'atma',
				optional: true
			},
			{
				config: EnvUtils
			},
			appConfig
		];
		
		if (configs) {
			configs.forEach(function(config){
				if (typeof config === 'string') {
					$sources.push({
						path: config
					});
					return;
				}
				$sources.push({
					config: config
				});
			});
		}
		
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