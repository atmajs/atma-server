(function(root, factory){
	"use strict";

	var _global, _exports;
	
	if (typeof exports !== 'undefined' && (root === exports || root == null || root === global)){
		// raw nodejs module
		_global = _exports = global;
	}
	
	if (_global == null) {
		_global = typeof window === 'undefined' ? global : window;
	}
	if (_exports == null) {
		_exports = root || _global;
	}
	
	
	factory(_global, _exports);
	
}(this, function(global, exports){
	"use strict";
	
	var io = {};
	
	// source ../src/dependency.js
	var atma,
	    io,
	    logger;
	
	// <assign first>
	
	// atma libs
	if (global.include && global.net && global.net.URI) {
	    atma = global;
	}
	if (atma == null && global.atma) {
	    atma = global.atma;
	}
	if (atma == null) {
	    require('atma-libs/globals');
	    atma = global;
	}
	
	// logger
	if (global.logger) {
	    logger = global.logger;
	}
	if (logger == null) {
	    require('atma-logger');
	    logger = global.logger;
	}
	
	// io
	if (global.io && global.io.File) {
	    io = global.io;
	}
	if (io == null) {
	    require('atma-io');
	    io = global.io;
	}
	
	
	
	var net = atma.net,
	    Class = atma.Class,
	    ruta = atma.ruta,
	    Routes = ruta.Collection,
	    logger = global.logger;
	    
	    
	var server = {};
	    
	
	// end:source ../src/dependency.js
	// source ../src/util/obj.js
	function obj_extend(target, source) {
	    if (target == null) 
	        target = {};
	    
	    if (source == null) 
	        return target;
	    
	    
	    for (var key in source) {
	        target[key] = source[key];
	    }
	    
	    return target;
	}
	// end:source ../src/util/obj.js
	// source ../src/util/arr.js
	
	function arr_isArray(array) {
	    return Array.isArray(array);
	}
	// end:source ../src/util/arr.js
	// source ../src/util/cli.js
	
	function cli_arguments(){
		
		var argv = process.argv,
			imax = argv.length,
			i = 2,
			args = {
				args: []
			},
			x;
		
		for (; i < imax; i++){
			x = argv[i];
			
			if (x[0] === '-') {
				args[x.replace(/^[\-]+/, '')] = true;
				continue;
			}
			
			var eq = x.indexOf('=');
			if (eq !== -1) {
				args[x.substring(0, eq)] = x.substring(eq + 1);
				continue;
			}
			
			args.args.push(x);
		}
		
		return args;
	}
	
	// end:source ../src/util/cli.js
	
	// source ../src/Application.js
	
	(function(){
	
		// source HandlerFactory.js
		
		var HandlerFactory = (function(){
				
			
			return Class({
				
				Construct: function(){
					this.handlers = [];
					this.services = new Routes();
					
					this.pages = new Routes();
				},
				
				registerPages: function(routes){
					var page, key;
					
					for (key in routes) {
						
						page = routes[key];
						this.pages.add(page.path, page);
					}
					
					return this;
				},
				
				registerHandlers: function(routes, config){
					
					for (var key in routes) {
						this.handlers.push({
							matcher: rgx_fromString(key),
							handler: handler_path(routes[key], config)
						});
					}
					
					return this;
				},
				
				registerServices: function(services, config){
					for (var key in services) {
						this.services.add(key, handler_path(services[key], config));
					}
					
					return this;
				},
				
				get: function(req, callback){
					
					var handler = get_handler(this, req.url);
					if (handler) {
						
						if (typeof handler === 'string') {
							include
								.instance()
								.js(handler + '::Handler')
								.done(function(resp){
									
									callback(new resp.Handler());
								});
							return;
						}
						
						callback(handler);
						return;
					}
					
					
					var route = get_service(this, req.url);
					
					if (route) {
						
						
						var service = route.value;
						
						if (typeof service === 'string') {
							include
								.instance()
								.js(service + '::Service')
								.done(function(resp){
									
									callback(new resp.Service());
								});
							return;
						}
						
						callback(service);
						return;
					}
					
					
					var route = this.pages.get(req.url);
					if (route) {
						
						var pageData = route.value;
						callback(new server.Page(pageData));
						
						return;
					}
					
					
					callback(null);
				}
			});
			
			
			function get_handler(factory, path) {
				
				var handlers = factory.handlers;
				
				for (var i = 0, x, imax = handlers.length; i < imax; i++){
					x = handlers[i];
					
					if (x.matcher.test(path)) {
						return x.handler;
					}
				}
				
				return null;
			}
			
			function get_service(factory, path) {
				var services = factory.services,
					route = services.get(path);
				
				return route;
			}
			
			function handler_path(path, config) {
				if (path.charCodeAt(0) === 47) {
					// /
					return path;
				}
				
				var location = config && config.location;
				if (location == null) {
					console.error('[Handler] Path is relative but no location. Set handler: {location: X} in config');
					return path;
				}
				
				var params,
					route,
					i,
					length,
					arr;
					
				var template = path.split('/'),
					route = location.split(/[\{\}]/g);
				
				
				path = route[0];
				
				for (i = 1; i < route.length; i++) {
					if (i % 2 === 0) {
						path += route[i];
					} else {
						/** if template provides less "breadcrumbs" than needed -
						 * take always the last one for failed peaces */
						
						var index = route[i] << 0;
						if (index > template.length - 1) {
							index = template.length - 1;
						}
						
						
						
						path += template[index];
						
						if (i === route.length - 2){
							for(index++; index < template.length; index++){
								path += '/' + template[index];
							}
						}
					}
				}
			
				return path;
			}
			
			function rgx_fromString(str, flags) {
				return new RegExp(str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), flags);
			}
		
			
		}());
		// end:source HandlerFactory.js
		// source Config/Config.js
		
		var Config = (function(){
			
			// source Utils.js
			
			var ConfigUtils = (function(resp){
			
				
				var __cfg;
				
				// source PathUtils.js
				var PathUtils = (function() {
				
					return {
						format: function path_format(location, path) {
							if (path.charCodeAt(0) === 47) {
								// /
								return path;
							}
				
				
				
							var params,
								route,
								i,
								length,
								arr;
				
							var template = path.split('/'),
								route = location.split(/[\{\}]/g);
				
				
							path = route[0];
				
							for (i = 1; i < route.length; i++) {
								if (i % 2 === 0) {
									path += route[i];
								} else {
									/** if template provides less "breadcrumbs" than needed -
									 * take always the last one for failed peaces */
				
									var index = route[i] << 0;
									if (index > template.length - 1) {
										index = template.length - 1;
									}
				
				
				
									path += template[index];
				
									if (i === route.length - 2) {
										for (index++; index < template.length; index++) {
											path += '/' + template[index];
										}
									}
								}
							}
				
							return path;
						}
					};
				
				}());
				// end:source PathUtils.js
				// source PageUtils.js
				var PageUtils = (function() {
				
				
					var PageUtils = {
						getScripts: function(pageID) {
							var cfg = app.config,
								scripts = getResources('scripts', cfg.env)
									.slice();
				
							var page = cfg.pages[pageID];
				
							if (page == null) {
								if (pageID)
									console.error('[404] Page is not defined', pageID);
				
								return scripts;
							}
				
							if (page.scripts) {
								var self = getResources('page', cfg.env, page.scripts, page.routes);
				
								Array
									.prototype
									.push
									.apply(scripts, self);
							}
				
							return scripts;
						},
						getScriptsForPageOnly: function(pageID) {
							var cfg = app.config,
								page = cfg.pages[pageID],
								scripts = [];
				
							if (page == null)
								return scripts;
				
				
							var _scripts = page.scripts;
							if (_scripts) {
				
								scripts = getResources('page', cfg.env, _scripts, page.routes)
									.slice();
							}
				
							return scripts;
						},
				
						getStyles: function(pageID) {
							var cfg = app.config,
								styles = getResources('styles', cfg.env)
									.slice();
				
							var page = cfg.pages[pageID];
				
							if (page == null) {
								if (pageID)
									console.error('[404] Page is not defined', pageID);
				
								return styles;
							}
				
							if (page.styles) {
								var self = getResources('page', cfg.env, page.styles, page.routes);
				
								Array
									.prototype
									.push
									.apply(styles, self);
							}
				
							return styles;
						},
				
						getStylesForPageOnly: function(pageID) {
							var cfg = app.config,
								page = cfg.pages[pageID];
				
							if (page && page.styles) {
				
								return getResources('page', cfg.env, page.styles, page.routes)
									.slice();
							}
				
							return [];
						},
				
						getInclude: function() {
							var env = app.config.env,
								include = {
									src: '',
									routes: {},
									cfg: {}
								};
				
							incl_extend(include, env.both.include);
							incl_extend(include, env.client.include);
				
							if (!include.src)
								console.error('[FATAL ERROR] Include PATH is not specified, use in client.yml/json include: { src: "PATH" }')
				
							incl_extend(include, {
								routes: env.both.routes
							});
							incl_extend(include, {
								routes: env.client.routes
							});
				
							return include;
						},
				
						getIncludeForPageOnly: function(pageID) {
							var page = app.config.pages[pageID],
								include = {};
				
							return page && page.include ? incl_extend(include, page.include) : include;
						},
				
						getTemplate: function(pageData) {
							var template = pageData.template || this.index.template;
				
							return app
								.config
								.formatPath(this.location.template, template);
						},
						getMaster: function(pageData) {
							var master = pageData.master || this.index.master;
				
							return app
								.config
								.formatPath(this.location.master, master);
						}
					};
				
				
					var getResources = Class.Fn.memoize(function(type, env, pckg, routes) {
				
						var Routes = new includeLib.Routes(),
							array = [];
				
				
						function register(obj) {
							if (obj == null)
								return;
				
							for (var key in obj) {
								Routes.register(key, obj[key]);
							}
						}
				
						function resolve(pckg) {
							if (pckg == null)
								return;
				
							Routes.each('js', pckg, function(namespace, route) {
								array.push(route.path);
							});
						}
				
						register(env.client.routes);
						register(env.both.routes);
				
						if (type === 'page') {
							register(routes);
							resolve(pckg);
							return array;
						}
				
						resolve(env.client[type]);
						resolve(env.both[type]);
				
						return array;
					});
				
				
					function incl_extend(include, source) {
						if (source == null)
							return include;
				
						if (typeof source === 'string') {
							include.src = source;
							return include;
						}
				
						if (source.src)
							include.src = source.src;
				
						if (source.cfg) {
							include.cfg = obj_extend(include.cfg, source.cfg, 'loader');
				
							if (source.cfg.loader)
								include.cfg.loader = obj_extend(include.cfg.loader, source.cfg.loader);
				
						}
				
						if (source.routes)
							obj_extend(include.routes, source.routes);
				
				
				
						return include;
					}
				
					function obj_extend(target, source, dismissKey) {
				
						if (source == null)
							return target;
				
						if (target == null)
							target = {};
				
						for (var key in source) {
							if (key === dismissKey)
								continue;
				
							target[key] = source[key];
						}
				
						return target;
					}
				
					
					return PageUtils;
				}());
				// end:source PageUtils.js
				
				var Utils = {
					page: PageUtils,
					formatPath: PathUtils.format
				};
				
				
				function cfg_attach(target, source) {
					if (target == null) 
						return;
					
					for (var key in source) {
						
						if (typeof source[key] === 'object') {
							cfg_attach(target[key], source[key]);
							continue;
						}
						
						if (typeof source[key] === 'function') {
							target[key] = source[key];
							continue;
						}
						
					}
				}
				
				return {
					attach: function(cfg) {
						__cfg = cfg;
						
						cfg_attach(cfg, Utils);
					}
				};
				
			}());
			
			// end:source Utils.js
			
			var cfg_attachUtils = ConfigUtils.attach;
				
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
					}
				};
				
				
				return cfg_load(cfg, configs, callback);
				
			};
			
			
			Config.getList = function(path){
				if (global.io == null || io.Directory == null) {
					console.error('atma-io seems to be not loaded');
					return null;
				}
				
				var uri_config = io
						.env
						.currentDir
						.combine(path)
						;
				
				var configs = new io
					.Directory(uri_config)
					.readFiles('**.yml')
					.files
					.map(function(file){
						return file
							.uri
							.toRelativeString(uri_config)
							.replace('.yml', '');
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
					return '/server/config/'
						+ config
						+ '.yml::'
						+ config.replace(/\//g, '.');
				});
				
				
				include
					.instance()
					.load(configs)
					.done(cfg_parseDelegate(cfg, callback));
				
				return cfg;
			}
			
			
			function cfg_parseDelegate(cfg, callback) {
				
				function obj_extend(obj, value, namespace) {
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
					
					obj_extend(obj, value);
					
				}
				
				return function(resp){
					var data = resp.load,
						key,
						value;
					
					for (key in data) {
						value = data[key];
						
						if (value == null)
							continue;
						
						
						obj_extend(cfg, value, key);
						
					}
					
					
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
			
		}());
		
		
		// end:source Config/Config.js
		
	
	
		server.Application = Class({
			Extends: Class.Deferred,
			Construct: function(proto){
				if (proto == null) 
					proto = {};
				
				if (this instanceof server.Application === false) {
					return new server.Application(proto);
				}
				
				
				this.handlers = new HandlerFactory();
				
				var path_CONFIGS = proto.configs || 'server/config/';
				
				var configs = proto.configs;
				if (configs == null)
					configs = Config.getList(path_CONFIGS);
					
				this.config = Config(configs, cfg_doneDelegate(this));
				this.args = cli_arguments();
				
				return this;
			},
			
			
			responder: function(){
				
				return responder(this);
			}
			
		});
		
		
		function responder(app) {
			return function (req, res, next){
				
				
				include
					.instance()
					.js(app.config.env.server.scripts)
					.js(app.config.env.both.scripts)
					.done(function(){
				
				app
					.handlers
					.get(req, function(handler){
						
						if (handler == null) {
							next();
							return;
						}
						
						handler
							.process(req, res)
							.done(function(content, statusCode, mimeType, headers){
								
								if (statusCode) {
									res.statusCode = statusCode;
								}
								if (typeof mimeType === 'string') {
									res.setHeader('Content-Type', mimeType);
								}
								if (headers) {
									for (var key in headers) {
										res.setHeader(key, headers[key]);
									}
								}
								
								res.end(content);
							})
							.fail(function(message, statusCode){
								
								res.statusCode = statusCode;
								res.end(message);
							});
					});
				});
			}
		}
		
		function cfg_doneDelegate(app) {
			return function(error) {
				
				var cfg = app.config;
				
				app
					.handlers
					.registerHandlers(cfg.handlers, cfg.handler)
					.registerServices(cfg.services, cfg.service)
					.registerPages(cfg.pages)
					;
					
				
				app.resolve(app);
			}
		}
		
	}());
	// end:source ../src/Application.js

	
	if (exports.atma != null && typeof exports.atma === 'object') {
		
		obj_extend(exports.atma, atma);
		return;
	}
	
	exports.atma = atma;
	
}));