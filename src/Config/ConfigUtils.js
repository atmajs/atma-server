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
		var resource = include.instance(cfg.base);
		
		cfg.env.both.routes
			&& resource.routes(cfg.env.both.routes);

		cfg.env.both.include
			&& resource.cfg(cfg.env.both.include.cfg);

		cfg.env.server.include
			&& resource.cfg(cfg.env.server.include.cfg);

		cfg.env.server.routes
			&& resource.routes(cfg.env.server.routes);


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
			sources = cfg.plugins.map(function(name){
				var base = new net.Uri(cfg.base),
					path = 'node_modules/' + name + '/index.js',
					x;
				while (true) {
					x = base.combine(path);
					if (io.File.exists(x)) 
						return x.toString();
					
					base = base.combine('../');
					if (base.path === '' || base.path === '/') 
						return path;
				}
			});
		
		include
			.instance(cfg.base)
			.js(sources)
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
