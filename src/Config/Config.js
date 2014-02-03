var Config = (function() {

	var PATH = 'server/config/**.yml',
		BUILD_PATH = 'public/build/stats.json';

	// import PathUtils.js
	// import ConfigUtils.js
	// import EnvUtils.js
	// import IncludeUtils.js
		
	function Config(params) {
		params = params || {};
		
		var path_Configs = params.configs || PATH,
			path_Build = params.buildDirectory || BUILD_PATH;
		
		var path_base = params.base || io.env.currentDir.toString();

		var $sources = [{
				config: __cfgDefaults
			}, {
				config: {
					base: path_base
				}
			}, {
				path: path_Configs
			}, {
				path: path_Build,
				optional: true
			}, {
				config: ConfigUtils
			}, {
				config: EnvUtils
			}
			
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
					
					if (pages[page.id]) 
						logger.error('<page:register> overwrite existed ID', page.id);
						
					pages[page.id] = page;
					
					delete pages[key];
				}
			}
		})
	}

	return Config;
}());