
var Config = (function(){
	
	// import Utils.js
	
	var cfg_attachUtils = ConfigUtils.attach,
		cfg_Dir = new io.Directory('server/config/');
		
	function Config(configs, callback) {
		
		var cfg = {
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
		
		obj_deepExtend(cfg, __cfgDefaults);
		
		return cfg_load(cfg, configs, callback);
		
	};
	
	
	function obj_deepExtend(target, source){
		
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
	
	
	Config.getList = function(path){
		if (global.io == null || io.Directory == null) {
			console.error('atma-io seems to be not loaded');
			return null;
		}
		
		cfg_Dir = io
				.env
				.currentDir
				.combine(path)
				;
		
		var configs = new io
			.Directory(cfg_Dir)
			.readFiles('**.yml')
			.files
			.map(function(file){
				return file
					.uri
					.toRelativeString(cfg_Dir)
					.replace('.yml', '')
					;
			});
			
		
		return configs;
	};
	
	
	
	/**
	 *	- configs - Array - ['name']
	 */
	function cfg_load(cfg, configs, callback) {
		if (Array.isArray(configs) === false){
			callback('[Application.Config] should be an array of file names');
			return cfg;
		}
		
		configs = configs.map(function(config){
			return cfg_Dir
				.combine(config + '.yml')
				.toString()
				+ '::'
				+ config.replace(/\//g, '.');
		});
		
		configs
			.push('/public/build/stats.json::build');
		
		include
			.instance()
			.load(configs)
			.done(cfg_parseDelegate(cfg, callback));
		
		return cfg;
	}
	
	
	function cfg_parseDelegate(cfg, callback) {
		
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
			
			if (cfg['compos-info']) {
				mask.compoDefinitions(cfg['compos-info']);
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
				var path, page;
				
				for (path in pages) {
					page = pages[path];
					page.path = path;
							
					if (page.id == null) 
						page.id = path.substring(path.indexOf('/') + 1);
					
					if (page.id === '') 
						page.id = page.view || 'index';
					
					
					if (page.view == null) 
						page.view = page.id;

				}
		
				for (path in pages) {
					page = pages[path];
					pages[page.id] = page;
					
					delete pages[path];
				}
			}
			
			
			cfg_attachUtils(cfg);		
			
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

