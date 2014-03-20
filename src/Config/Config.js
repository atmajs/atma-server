var Config = (function() {

	var PATH = 'server/config/**.yml',
		BUILD_PATH = 'public/build/stats.json';

	// import PathUtils.js
	// import ConfigUtils.js
	// import EnvUtils.js
	// import IncludeUtils.js
		
	function Config(params) {
		params = params || {};
		
		var path_base = params.base,
			path_Configs = params.configs,
			path_Build,
			appConfig;
		
		if (path_base != null){
			if (path_base[0] === '/')
				path_base = path_base.substring(1);
				
			path_base = io
				.env
				.currentDir
				.combine(path_base)
				.toString();
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
			}, {
				config: EnvUtils
			},
			appConfig
		];

		if (Array.isArray(params.sources)) {
			$source = $sources.concat(params.sources);
		}


		return require('appcfg')
			.fetch($sources)
			.done(function() {
				
			var cfg = this;
			
			var maskCfg = cfg.mask;
			if (maskCfg.compos) {
				mask.compoDefinitions(
					maskCfg.compos,
					maskCfg.utils,
					maskCfg.attributes);
			}

			if (cfg.env.both.routes)
				include
					.routes(cfg.env.both.routes);

			if (cfg.env.both.include)
				include
					.cfg(cfg.env.both.include.cfg);

			if (cfg.env.server.include)
				include
					.cfg(cfg.env.server.include.cfg);

			if (cfg.env.server.routes)
				include
					.routes(cfg.env.server.routes);


			IncludeUtils.prepair(cfg.env.server.scripts);
			IncludeUtils.prepair(cfg.env.client.scripts);

			// Prepair PAGES
			var pages = cfg.pages;
			if (pages) {
				
				var page,
					key;
				for (key in pages) {
					page = pages[key];
					
					if (page.id == null) {
						page.id = key
							.replace(/[^\w_-]/g, '_')
							.replace(/[_]{2,}/g, '_')
							;
					}
					
					
					if (page.route == null) 
						page.route = key;
					
					if (pages[page.id] && pages[page.id] !== page) 
						logger.error('<page:register> overwrite existed ID',
							key.bold,
							pages[page.id] === page);
						
					pages[page.id] = page;
					
					delete pages[key];
				}
			}
		})
	}

	return Config;
}());