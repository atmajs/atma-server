var ConfigUtils = {
	$formatPath: PathUtils.format
};

// private
var configurate_Include,
	configurate_Mask,
	configurate_Pages,
	configurate_Plugins
	;

(function(){
	
	configurate_Include = function(cfg){
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
	};
	
	configurate_Mask = function(cfg){
		var maskCfg = cfg.mask;
		if (maskCfg == null) 
			return;
		
		mask.compoDefinitions(
			maskCfg.compos,
			maskCfg.utils,
			maskCfg.attributes
		);
	};
	
	configurate_Pages = function(cfg){
		var pages = cfg.pages;
		if (pages == null) 
			return;
			
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
	};
	
	configurate_Plugins = function(cfg, app){
		if (cfg.plugins == null) 
			return null;
		
		if (app.isRoot === false) 
			return null;
		
		var dfr = new Class.Await,
			src = cfg.plugins.map(function(name){
				return 'node_modules/' + name + '/index.js'
			});
		
		include
			.instance(cfg.base)
			.js(src)
			.done(function(resp){
				for (var key in resp){
					if (resp[key] && typeof resp[key].attach === 'function') 
						resp[key].attach(app);
				}
				
				dfr.resolve();
			});
		
		return dfr;
	}
	
}());
