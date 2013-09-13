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
	
	var server = {};
	
	var __app;
	
	// source ../src/dependency.js
	var atma,
	    io,
	    logger;
	
	// <assign first>
	
	// atma libs
	if (global.include && global.net && global.net.Uri) {
	    atma = global;
	}
	if (atma == null && global.atma) {
	    atma = global.atma;
	}
	if (atma == null) {
	    require('atma-libs/globals-dev');
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
	    mask = atma.mask,
	    include = atma.include,
	    Routes = ruta.Collection,
	    logger = global.logger;
	    
	    
	    
	
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
	
	function obj_defaults(target, defaults) {
	    if (target == null) 
	        target = {};
	        
	    if (defaults == null) 
	        return target;
	    
	    for (var key in defaults) {
	        if (target[key] == null) 
	            target[key] = defaults[key];
	    }
	    
	    return target;
	}
	// end:source ../src/util/obj.js
	// source ../src/util/fn.js
	function fn_proxy(fn, ctx) {
	    return function(){
	        return fn.apply(ctx, arguments);  
	    }
	}
	// end:source ../src/util/fn.js
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
	
	// source ../src/HandlerFactory.js
	
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
			
			get: function(url, callback){
				
				if (callback == null) 
					return;
				
				
				var handler = get_handler(this, url);
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
				
				
				var route = get_service(this, url);
				
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
				
				
				var route = this.pages.get(url);
				if (route) {
					
					var pageData = route.value,
						controller = __app.config.page.getController(pageData);
					
					if (controller == null) {
						callback(new server.HttpPage(pageData));
						return;
					}
					
					include
						.instance()
						.js(controller + '::Controller')
						.done(function(resp){
							
							callback(new resp.Controller(pageData));
						});
					
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
	// end:source ../src/HandlerFactory.js
	// source ../src/IHttpHandler.js
	server.IHttpHandler = Class({
		Extends: Class.Deferred,
		
		process: function(req, res){
			
			this.reject('Not Implemented', 500);
		}
	});
	// end:source ../src/IHttpHandler.js
	
	// source ../src/Page/HttpPage.js
	server.HttpPage = (function(){
		
		// source Resources.js	
		var Resources = (function(){
			
			
			
			var Resources = {
				getScripts: function(){
					return __app
						.config
						.page
						.getScripts(this.data.id);
				},
				
				getStyles: function(){
					return __app
						.config
						.page
						.getStyles(this.data.id);
				}
			};
			
			
			return Resources;
		}());
		// end:source Resources.js	
	
		
		var Page = Class({
			
			Extends: [
				Class.Deferred,
				Resources
			],
			
			template: null,
			master: null,
			route: null,
			
			/**
			 *	- data (Object)
			 *		- template: ? page name
			 */
			Construct: function(data){
				
				if (this instanceof Page === false) {
					return page_Create(data);
				}
				
				var cfg = __app.config.page;
				
				this.template = cfg.getTemplate(data) + '::Template';
				this.master = cfg.getMaster(data) + '::Master';
				this.route = cfg.route;
				this.data = data;
			},
			
			process: function(req, res){
				
				this.query = ruta
					.parse(this.route, req.url)
					.params;
				
				this.ctx = {
					req: req,
					res: res,
					page: this
				};
				
				this.load();
				return this;
			},
			
			load: function(){
				
				include
					.instance()
					.load(this.master, this.template)
					.done(fn_proxy(this.response, this));
			},
			
			
			response: function(resp){
				
				var master = resp.load.Master,
					template = resp.load.Template;
					
				
				if ('master' === this.query.debug) {
					this.resolve(master);
					return;
				}
				if ('template' === this.query.debug) {
					this.resolve(template);
					return;
				}
				if (this.query.breakOn) {
					this.ctx.debug = { breakOn : this.query.breakOn };
				}
				
				
				if (master) {
					mask.render(mask.parse(master));
				}
				
				if (this.onRenderStart) {
					this.onRenderStart(this.ctx.req, this.ctx.res);
				}
				
				var html = mask.render(this.nodes || template, this.model, this.ctx);
				
				if (this.ctx.rewrite) {
					__app
						.handlers
						.get(this.ctx.rewrite, page_rewriteDelegate(this));
					return;
				}
				
				if (this.ctx.async) {
					
					this
						.ctx
						.done(fn_proxy(this.resolve, this))
						.fail(fn_proxy(this.fail, this));
						
					return;
				}
		
				this.resolve(html);
			}
		
		});
		
		
		function page_Create(classProto) {
			var base = classProto
			while (base.Base){
				base = base.Base;
			}
			
			base.Base = Page;
			
			return Class(classProto);
		}
		
		
		function page_rewriteDelegate(page) {
			var ctx = page.ctx;
			
			if (ctx.rewriteCount == null) 
				ctx.rewriteCount = 1;
			
			if (++ctx.rewriteCount > 5) {
				page.reject('Too much rewrites, last path: ' + ctx.rewrite);
				return;
			}
			
			
			return function(rewrittenHandler){
				if (rewrittenHandler == null) {
					page.reject('Rewritten Path is not valid', ctx.rewrite);
					return;
				}
				
				rewrittenHandler
					.process(ctx.req, ctx.res)
					.done(fn_proxy(page.resolve, page))
					.fail(fn_proxy(page.reject, page))
					;
			}
		}
		
		
		return Page;	
	}());
	
	// end:source ../src/Page/HttpPage.js
	// source ../src/Service/HttpService.js
	
	server.HttpService = (function(){
		
		var HttpServiceProto = {
			Extends: Class.Deferred,
			process: function(req, res){
				
				var path = req.url,
					entry = this.routes.get(path);
				
				if (entry == null) {
					this.reject('Service Endpoint not Found: ' + path, 404);
					return this;
				}
				
				var value = entry.value;
				
				
				value.call(this, req, res);
				
				return this;
			}
		};
		
		
		return function HttpService(proto){
			
			var routes = new ruta.Collection,
				key,
				c;
			
			for (key in proto) {
				
				c = key[0];
				if ('/' === c || '!' === c) {
					
					routes.add(key, proto[key]);
				}
			}
			
			proto.routes = routes;
			
			for (key in HttpServiceProto) {
				proto[key] = HttpServiceProto[key];
			}
			
			return Class(proto);
		}
		
		
	}());
	// end:source ../src/Service/HttpService.js
	
	
	// source ../src/Application.js
	
	(function(){
	
		// source Config/Config.js
		
		var Config = (function(){
			
			// source Utils.js
			
			var ConfigUtils = (function(resp){
			
				
				var __cfg;
				
				// source PathUtils.js
				var PathUtils = (function() {
				
					return {
						/**
						 *	Format Path / location as in IncludeJS
						 */
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
						getScripts: Class.Fn.memoize(function(pageID) {
							var cfg = __app.config,
								scripts = getResources('scripts', cfg.env).slice();
				
							
							if (pageID) 
								scripts = scripts.concat(this.getScriptsForPageOnly(pageID));
							
							
							return scripts;
						}),
						getScriptsForPageOnly: Class.Fn.memoize(function(pageID) {
							var cfg = __app.config,
								page = cfg.pages[pageID],
								scripts = [];
								
							if (page == null) {
								logger.error('<page:scripts> Page not defined', pageID);
								return null;
							}
							
							if (page.scripts) {
								scripts = scripts.concat(getResources('page', cfg.env, page.scripts, page.routes));
							}
							
							
							if (page.view && page.view.controller) {
								var path = cfg.formatPath(
									this.location.viewController,
									page.view.controller
								);
								
								scripts.push(path);
							}
							
							
							return scripts;
						}),
				
						getStyles: function(pageID) {
							
							var cfg = __app.config,
								styles = getResources('styles', cfg.env).slice();
				
							if (pageID) 
								styles = styles.concat(this.getStylesForPageOnly(pageID));
						
				
							return styles;
						},
				
						getStylesForPageOnly: function(pageID) {
							var cfg = __app.config,
								page = cfg.pages[pageID],
								styles = [];
								
							if (page == null) {
								logger.error('<page:styles> Page not defined', pageID);
								return null;
							}
							
							if (page.styles) {
								styles = styles.concat(getResources('page', cfg.env, page.styles, page.routes));
							}
							
							
							if (page.view && page.view.style) {
								var path = cfg.formatPath(
										this.location.viewStyle,
										page.view.style
									);
								
								styles.push(path);
							}
							
							
							return styles;
						},
				
						getInclude: function() {
							var env = __app.config.env,
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
							var page = __app.config.pages[pageID],
								include = {};
				
							return page && page.include ? incl_extend(include, page.include) : include;
						},
				
						getTemplate: function(pageData) {
							var template = pageData.template || this.index.template;
				
							return __app
								.config
								.formatPath(this.location.template, template);
						},
						getMaster: function(pageData) {
							var master = pageData.master || this.index.master;
				
							return __app
								.config
								.formatPath(this.location.master, master);
						},
						getController: function(pageData){
							var controller = pageData.controller || this.index.controller;
							
							return controller ?
								__app
									.config
									.formatPath(this.location.controller, controller)
								: null;
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
				
						switch (type) {
							
							case 'page':
								register(routes);
								resolve(pckg);
								break;
							
							case 'debug':
								resolve(env.client.debug);
								break;
							
							default:
								// scripts
								resolve(env.client[type]);
								resolve(env.both[type]);
								break;
						}
						
				
						
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
				// source IncludeUtils.js
				var IncludeUtils = (function(){
				    
				    function incl_prepair(mix) {
				        if (mix == null) 
				            return;
				        
				        if (arr_isArray(mix)) {
				            var array = mix,
				                imax = mix.length,
				                i = 0,
				                x;
				            for (; i < imax; i++){
				                x = array[i];
				                
				                if (x == null || typeof x === 'string') 
				                    continue;
				                
				                var cond = cond_getCondition(x);
				                if (cond == null){
				                    incl_prepair(x);
				                    continue;
				                }
				                
				                
				                if (cond_match(cond)) {
				                    var diff = mod_arrayAdd(array, i, cond.value);
				                    imax += diff;
				                    i += diff;
				                    continue;
				                }
				                
				                array.splice(i, 1);
				                i--;
				                imax--;
				            }
				            return;
				        }
				        
				        if (typeof mix === 'object') {
				            
				            for (var key in mix) {
				                incl_prepair(mix[key]);
				            }
				            
				        }
				    }
				    
				    function mod_arrayAdd(array, at, value) {
				        if (arr_isArray(value)) {
				            
				            Array.prototype.splice.apply(array, [at, 1].concat(value));
				            return value.length;
				        }
				        array.splice(at, 1, value);
				        return 1;
				    }
				    
				    function cond_getCondition(object) {
				        
				        for (var key in object) {
				            
				            if (key.substring(0,3) !== 'if#')
				                return null;
				            
				            
				            return {
				                key: key.substring(3),
				                value: object[key]
				            };
				        }
				        
				        return null;
				    }
				    
				    function cond_match(cond) {
				        return __app.args[cond.key];
				    }
				    
				    return {
				        prepair: function(pckg){
				            incl_prepair(pckg);
				        }
				    };
				}());
				// end:source IncludeUtils.js
				
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
					},
					prepairIncludes: IncludeUtils.prepair
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
					},
					
					app: {
						// generic application configuration
					},
					
					build: {
						// page: availableResources
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
				
				configs
					.push('/public/build/stats.json::build');
				
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
		
		
		// end:source Config/Config.js
		
	
	
		server.Application = Class({
			Extends: Class.Deferred,
			Construct: function(proto){
				if (proto == null) 
					proto = {};
				
				if (this instanceof server.Application === false) {
					return new server.Application(proto);
				}
				
				__app = this;
				
				this.handlers = new HandlerFactory();
				
				var path_CONFIGS = proto.configs || 'server/config/';
				
				var configs = proto.configs;
				if (configs == null)
					configs = Config.getList(path_CONFIGS);
					
				this.config = Config(configs, cfg_doneDelegate(this));
				this.args = cli_arguments();
				
				if (this.args.debug !== true) 
					logger.cfg('color', 'none');
					
				return this;
			},
			
			
			responder: function(){
				
				return responder(this);
			},
			
			
			autoreload: function(httpServer){
				this.autoreloadEnabled = true;
				Autoreload.listen(httpServer);
				
				include.cfg('autoreload', Autoreload);
			},
			autoreloadEnabled: false,
			
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
					.get(req.url, function(handler){
						
						if (app.autoreloadEnabled) {
							Autoreload.watch(req.url);
						}
						
						if (handler == null) {
							next();
							return;
						}
						
						logger(95)
							.log('<request>', req.url);
						
						handler
							.process(req, res)
							.done(function(content, statusCode, mimeType, headers){
								
								if (statusCode) 
									res.statusCode = statusCode;
								
								if (typeof mimeType === 'string') 
									res.setHeader('Content-Type', mimeType);
								
								
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
				
				
				logger(90)
					.log('<app.config>', cfg);
				
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
	
	
	// source ../src/loader/coffee.js
	include
	    .cfg({
	        loader: {
	            coffee: {
	                process: function(source, res) {
				
	                    return require('coffee').compile(source);
	                }
	            }
	        }
	    });
	// end:source ../src/loader/coffee.js
	// source ../src/loader/less.js
	include
	    .cfg({
	        loader: {
	            less: {
	                process: function(source, resource, callback) {
				
	                   var filename = resource.path_getFile(),
							dir = resource.path_getDir(),
					
							less = require('less'),
							parser = new less.Parser({
								filename: filename,
								paths: [dir]
							});
							
						
						
						parser.parse(source, function(error, tree) {
							var response;
							
							if (error) {
								logger.error('<less:parse>',filename, error);
								return;
							} else {
							
								try {
									response = tree.toCSS();
								} catch (error) {
									logger.error('<less:toCss>', filename, error);
								}
							}
							
							
							callback(response);
						});
	                }
	            }
	        }
	    });
	// end:source ../src/loader/less.js
	// source ../src/loader/yml.js
	include
	    .cfg({
	        loader: {
	            yml: {
	                process: function(source, res) {
				
	                    var YAML = require('yamljs')
	        
	                    source = source
	                        .replace(/\t/g, '  ');
	                        
	        
	                    try {
	                        return YAML.parse(source);
	                    } catch (error) {
	                        logger.error('<yml parser>', error);
	                        return null;
	                    }
	                }
	            }
	        }
	    });
	// end:source ../src/loader/yml.js
	// source ../src/Autoreload/autoreload.js
	var Autoreload = (function(){
	    
	    var SocketListeners = {};
	
	        
	    // source WatcherHandler.js
	    var WatcherHandler = (function(){
	        
	        var rootFolder = net
	            .Uri
	            .combine(process.cwd(), '/')
	            .replace(/\\/g, '/');
	        
	        var FileWatcher = Class({
	            Base: Class.EventEmitter,
	            Construct: function(path){
	                
	                this.active = false;
	                this.file = new io.File(path);
	            },
	            Self: {
	                fileChanged: function(path){
	                    logger.log('<watcher:changed>', path);
	                    
	                    this.trigger('fileChange', path, 'filewatcher')
	                }
	            },
	            
	            bind: function(callback){
	                this.on('fileChange', callback);
	                
	                if (this.active) 
	                    return;
	                
	                io
	                    .File
	                    .watcher
	                    .watch(this.file, this.fileChanged);
	                    
	                this.active = true;
	            },
	            unbind: function(callback) {
	                this.off('fileChange', callback);
	                
	                if (this._listeners.length === 0) {
	                    io
	                        .File
	                        .watcher
	                        .unwatch(this.file.uri.toLocalFile());
	                }
	            }
	        });
	        
	       
	        
	        var _watchers = {};
	        
	        return new new Class({
	            Base: Class.EventEmitter,
	            
	            watch: function(file){
	                var path = file.uri.toLocalFile();
	                
	                if (_watchers[path] != null) 
	                    return;
	                
	                var watcher
	                watcher = new FileWatcher(path);
	                watcher.bind(this.fileChanged);
	                
	                _watchers[path] = watcher;
	                    
	            },
	            unwatch: function(file){
	                var path = file.uri.toLocalFile();
	                
	                if (_watchers[path] == null) {
	                    logger.log('<watcher> No watchers', path);
	                    return
	                }
	                
	                _watchers[path].unbind(callback);
	                
	                delete _watchers[path];
	            },
	            
	            isWatching: function(file){
	                var path = file.uri.toLocalFile();
	                
	                return _watchers[path] != null;
	            },
	            Self: {
	                fileChanged: function(path, sender){
	                    path = path.replace(rootFolder, '');
	                    
	                    if (sender === 'filewatcher' && include.getResource(path)) {
	                        /**
	                         *  include.autoreload feature also listens for file changes
	                         *  and if the file is in includejs cache, then this function
	                         *  will be called by includejs immediately. This happens
	                         *  while Application enables autoreload via
	                         *   include.cfg('autoreload', {
	                         *      fileChanged: function(path) {
	                         *          Autoreload.fileChanged(path)
	                         *      }
	                         *   });
	                         */
	                        return;
	                    }
	                    
	                    
	                    var that = this;
	                    include.bin_tryReload(path, function(){
	                        that.trigger('fileChange', path);
	                    });
	                }
	            },
	            
	            
	            bind: function(callback){
	                this.on('fileChange', callback);
	                
	                return this;
	            },
	            unbind: function(callback){
	                this.off('fileChange', callback);
	                
	                return this;
	            }
	        });
	        
	    }());
	    // end:source WatcherHandler.js
	    // source Connection.js
	    
	    SocketListeners['/browser'] = Class({
	        Construct: function(socket) {
	            
	            logger.log('<socket> Connected');
	            this.socket = socket;
	    
	            socket.on('disconnect', this.disconnected);
	    
	            WatcherHandler.bind(this.fileChanged);
	        },
	        Self: {
	            fileChanged: function(path) {
	                logger.log('<autoreload> path', path);
	                
	                this.socket.emit('filechange', path);    
	            },
	            disconnected: function() {
	                WatcherHandler.unbind(this.fileChanged);
	            }
	        }
	    });
	    
	    // end:source Connection.js
	    // source websocket.js
	    var WebSocket = {
	    	listen: function(httpServer) {
	    
	    		logger.log('<Autoreload> Socket opened'.green.bold);
	    
	    		// socket.io bug workaround
	    		var _io = global.io;
	    		delete global.io;
	    
	    		var io = require('socket.io')
	    			.listen(httpServer, {
	    				'log level': 0
	    			});
	    
	    		global.io = _io;
	    
	    		function listen(namespace, Handler) {
	    			return function(socket) {
	    				new Handler(socket, io);
	    			};
	    		}
	    
	    		for (var key in SocketListeners) {
	    			io
	    				.of(key)
	    				.on('connection', listen(key, SocketListeners[key]));
	    		}
	    	},
	    
	    	getConnectionHandler: function(namespace) {
	    		return SocketListeners[namespace];
	    	}
	    };
	    // end:source websocket.js
	    
	    
	    var rootUri = new net.Uri(process.cwd() + '/');
	    
	    return {
	        watch: function(requestedUrl){
	            var start = requestedUrl[0] === '/'
	                    ? 1
	                    : 0,
	                query = requestedUrl.indexOf('?'),
	                end = query === -1
	                    ? requestedUrl.length
	                    : query
	                    ;
	            
	            requestedUrl = requestedUrl.substring(start, end);
	            
	            
	            var uri = rootUri.combine(requestedUrl),
	                file = new io.File(uri);
	            
	            if (!file.uri.file) 
	                return;
	            
	            if (WatcherHandler.isWatching(file)) 
	                return;
	            
	            if (file.exists() === false)
	                return;
	            
	            
	            WatcherHandler.watch(file);
	        },
	        unwatch: function(path){
	            
	            WatcherHandler.unwatch(new io.File(path));
	        },
	        
	        listen: function(httpServer){
	            WebSocket.listen(httpServer);
	        },
	        
	        fileChanged: function(path){
	            
	            WatcherHandler.fileChanged(path);
	        },
	        
	        isWatching: function(file){
	            if (typeof file === 'string') 
	                file = new io.File(file);
	            
	            return WatcherHandler.isWatching(file);
	        }
	    };
	    
	}());
	
	// end:source ../src/Autoreload/autoreload.js
	
	if (exports.atma != null && typeof exports.atma === 'object') {
		
		obj_extend(exports.atma, server);
		return;
	}
	
	exports.atma = {
		server: server
	};
	
}));