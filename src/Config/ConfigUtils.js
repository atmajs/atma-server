var ConfigUtils = {
	$formatPath: PathUtils.format
};

// private
var cfg_prepair,
	configurate_Include,
	configurate_Mask,
	configurate_Pages,
	configurate_Plugins,
	configurate_Projects,
	configurate_BowerAndCommonJS
	;

(function(){
	cfg_prepair = function(base, configs, defaults){
		if (configs == null && configs !== void 0) 
			return null;
		if (configs === void 0) 
			return [ prepair(defaults) ];
		
		if (typeof configs === 'string') 
			return [ prepair(configs) ];
		
		return configs.map(prepair);
	
		// private
		function prepair(config){
			if (typeof config !== 'string') {
				return {
					config: config
				};
			}
			var path = path_hasProtocol(config)
				? config
				: net.Uri.combine(base, config)
				;
			return { path: path };
		}
	};
	
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
					if (io.File.exists(x)) {
						path = x.toString();
						break;
					}
					
					base = base.combine('../');
					if (base.path === '' || base.path === '/') 
						break;
				}
				return path + '::' + name;
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
	};
	
	configurate_BowerAndCommonJS = function(cfg, app){
		var await = new Class.Await;
		for(var type in _types){
			handleAllEnvironments(cfg, type, await.delegate());
		}
		return await;
	};
	
	// === private
	var _types = {
		bower: {
			dir: 'bower_components',
			package: 'bower.json'
		},
		npm: {
			dir: 'node_modules',
			package: 'package.json'
		}
	};
	function handleAllEnvironments(config, type, cb){
		var await = new Class.Await;
		[
			'client',
			'server',
			'both'
		].forEach(function(envType){
			var env = config.env[envType],
				scripts = env.scripts,
				x = scripts && scripts[type];
			if (x == null) 
				return;
			
			var done = await.delegate();
			handleModulePaths(config, type, x, function(paths){
				// prevent routes to be handled if registered
				scripts[type] = null;
				scripts['__' + type] = paths;
				done();
			});
		});
		await.always(cb);
	}
	function handleModulePaths(config, type, arr, cb){
		var base = new net.Uri(config.base),
			paths = [];
		
		var data = _types[type];
		if (data == null) 
			throw Error('Support:' + Object.keys(_types) + ' Got:' + type);
		
		var await = new Class.Await;
		var dirName = data.dir,
			packageName = data.package;
		arr.forEach(function(name){
			
			var aliasIndex = name.indexOf('::'),
				alias = '';
			if (aliasIndex !== -1) {
				alias = name.substring(aliasIndex);
				name  = name.substring(0, aliasIndex);
			}
			
			if (name.indexOf('/') !== -1) {
				if (/\.\w+$/.test(name) === false) 
					name += '.js';
				
				paths.push(
					'/'
					+ dirName
					+ '/'
					+ name
					+ alias
				);
				return;
			}
			
			var pckgPath = resolveModulePath(
				base, dirName + '/' + name + '/' + packageName
			);
			io
				.File
				.readAsync(pckgPath)
				.done(function (pckg) {
					
					paths.push(
						'/'
						+ dirName
						+ '/'
						+ name
						+ '/'
						+ pckg.main
						+ alias
					);
				})
				.fail(logger.error)
				.always(await.delegate(name, false))
				;
		});
		await.always(function(){
			cb(paths);
		});
	}
	function resolveModulePath(base, path){
		var x;
		while (true) {
			x = base.combine(path);
			if (io.File.exists(x)) {
				path = x.toString();
				break;
			}
			
			base = base.combine('../');
			if (base.path === '' || base.path === '/') {
				logger.error('<Module path is not resolved>', path);
				break;
			}
		}
		return path;
	}
}());
