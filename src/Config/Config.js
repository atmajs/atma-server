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
		
		path_base = path_base == null
			? 'file://' + path_normalize(process.cwd()) + '/'
			: path_resolveSystemUrl(path_base + '/')
			;
		
		configs = cfg_prepair(path_base, configs, PATH);
		
		if (configs)
			// if `configs` null, do not load also build values
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
			$sources = $sources.concat(configs);
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