
var Config = (function(){
	
	// import Utils.js
	
	var cfg_attachUtils = ConfigUtils.attach,
		
		_buildPath = 'public/build/',
		_configsPath = 'server/config/';
		
	function Config(params, baseConfig, callback) {
		
		if (params.buildDirectory) 
			_buildPath = params.buildDirectory;
		
		var path,
			directory,
			basePath
			;
			
		
		path = params.configs || _configsPath;
		basePath = params.base || io.env.currentDir.toString();
		directory = cfg_getDirectory(path);
		
		if (baseConfig && params.configs == null) 
			path = null;
		
		
		var cfg = {
			base: basePath,
			env: {
				client: {
					routes: null,
					scripts: null,
					styles: null
				},
				server: {
					routes: null,
					scripts: null
				},
				both: {
					routes: null,
					scripts: null
				}
			},
			
			page: {
				location: null,
				include: null
			},
			// route: data
			pages: null,
			
			handler: {
				location: null
			},
			// route: controller Path
			handlers: null,
			
			service: {
				location: null,
			},
			// route: controller Path
			services: null,
				
			
			
			passport: {
				// strategy : data
			},
			
			app: {
				// generic application configuration
			},
			
			build: {
				// page: availableResources
			}
		};
		
		obj_deepExtend(cfg, JSON.parse(JSON.stringify(__cfgDefaults)));
		
		if (path && directory.exists()) {
			cfg_load(
				basePath,
				directory,
				cfg,
				Config.getList(directory),
				baseConfig,
				callback
			);
		} else{
			
			obj_deepExtend(cfg, baseConfig);
			process.nextTick(callback);
		}
		
		return cfg;
	};
	
	
	function obj_deepExtend(target, source){
		
		if (source == null) 
			return target;
		
		if (Array.isArray(target) && Array.isArray(source)) {
			for (var i = 0, x, imax = source.length; i < imax; i++){
				x = source[i];
				if (target.indexOf(x) === -1) {
					target.push(x);
				}
			}
			return target;
		}
		
		if (typeof source !== 'object' && typeof target !== 'object') {
			logger.log('<cfg extend> not an object or type missmatch');
			return target;
		}
		
		var key, val;
		for(key in source){
			val = source[key];
			
			if (target[key] == null) {
				target[key] = val;
				continue;
			}
			
			if (Array.isArray(val)) {
				if (Array.isArray(target[key]) === false) {
					logger.log('<cfg extend> type missmatch', key, val, target[key]);
					
					target[key] = val;
					continue;
				}
				obj_deepExtend(target[key], val);
				continue;
			}
			
			if (typeof val === 'object' && typeof target[key] === 'object') {
				target[key] = obj_deepExtend(target[key], val);
				continue;
			}
			
			target[key] = val;
		}
		
		return target;
	}
	
	
	Config.getList = function(directory){
		
		var configs = directory
			.readFiles('**.yml')
			.files
			.map(function(file){
				
				return file
					.uri
					.toRelativeString(directory.uri)
					.replace('.yml', '')
					;
			});
		
		if (configs.length === 0)
			logger.error('<server> No configuration files in', directory.uri.toString());
		
		
		return configs;
	};
	
	
	function cfg_getDirectory(path){
		var uri = new net.Uri(path);
		if (uri.isRelative()) {
			uri = new io.Directory().uri.combine(uri);
		}
		
		return new io.Directory(uri);
	}
	
	
	/**
	 *	- configs - Array - ['name']
	 */
	function cfg_load(basePath, directory, cfg, configs, baseConfig, callback) {
		if (Array.isArray(configs) === false){
			process.nextTick(function(){
				callback('<server.config> should be an array of filenames');
			});
			return;
		}
		
		configs = configs.map(function(config){
			return directory
				.uri
				.combine(config + '.yml')
				.toString()
				+ '::'
				+ config.replace(/\//g, '.');
		});
		
		// build data
		var buildFile = new io.File(net.Uri.combine(basePath, _buildPath, 'stats.json'));
		
		if (buildFile.exists()) {
			configs
				.push(buildFile.uri.toString() + '::build');
		} else {
			
			if (!__app.args.debug)
				logger
					.warn('<config> %s/stats.json . App is not built', _buildPath);
			
		}
		
		
		include
			.instance()
			.load(configs)
			.done(cfg_parseDelegate(cfg, baseConfig, callback))
			;
	}
	
	
	function cfg_parseDelegate(cfg, baseConfig, callback) {
		
		function cfg_extend(obj, value, namespace) {
			if (namespace == null || namespace.indexOf('.') === -1) {
				
				for (var key in value) {
					obj[key] = value[key];
				}
				
				return;
			}
			
			var parts = namespace.split('.'),
				length = parts.length - 1,
				i = 0;
			
			for (; i < length; i++) {
				obj = (obj[parts[i]] || (obj[parts[i]] = {}));
			}
			
			cfg_extend(obj, value);
			
		}
		
		
		return function(resp){
			var data = resp.load,
				key,
				value,
				cfgLoad = {};
			
			for (key in data) {
				value = data[key];
				
				if (value == null)
					continue;
				
				
				cfg_extend(cfgLoad, value, key);
				
			}
			
			obj_deepExtend(cfg, cfgLoad)
			
			var maskCfg = cfg.mask;
			if (maskCfg.compos) {
				mask.compoDefinitions(
					maskCfg.compos,
					maskCfg.utils,
					maskCfg.attributes
				);
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
					
			
			ConfigUtils.prepairIncludes(cfg.env.server.scripts);
			ConfigUtils.prepairIncludes(cfg.env.client.scripts);
			
			// Prepair PAGES
			var pages = cfg.pages;
			if (pages) {
				
				for (var key in pages) {
					
					pages[key].id = key;
				}
				//for (path in pages) {
				//	page = pages[path];
				//	page.path = path;
				//			
				//	if (page.id == null) 
				//		page.id = path.substring(path.indexOf('/') + 1);
				//	
				//	if (page.id === '') 
				//		page.id = page.view || 'index';
				//	
				//	
				//	if (page.view == null) 
				//		page.view = page.id;
				//
				//}
				//
				//for (path in pages) {
				//	page = pages[path];
				//	pages[page.id] = page;
				//	
				//	delete pages[path];
				//}
			}
			
			
			cfg_attachUtils(cfg);		
			obj_deepExtend(cfg, baseConfig);
			
			callback();
		};
		
	}
	
	function cfg_completeDelegate(callback) {
		
		return function(){
			callback();
		};
	}
	
	
	return Config;
}());

