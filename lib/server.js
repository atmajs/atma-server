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
	
	var __app,
		__cfgDefaults;
	
	// source ../src/dependency.js
	var atma,
	    io,
	    net,
	    Class,
	    ruta,
	    mask,
	    include,
	    Routes,
	    logger;
	
	// <assign first>
	
	// atma libs
	if (global.include && global.net && global.net.Uri) 
	    atma = global;
	
	if (atma == null && global.atma) 
	    atma = global.atma;
	
	if (atma == null) {
	    require('atma-libs/globals-dev');
	    atma = global;
	}
	
	// logger
	if (global.logger)
	    logger = global.logger;
	
	if (logger == null) {
	    require('atma-logger');
	    logger = global.logger;
	}
	
	// io
	if (global.io && global.io.File) 
	    io = global.io;
	
	if (io == null) {
	    require('atma-io');
	    io = global.io;
	}
	
	
	
	net     = atma.net;
	Class   = atma.Class;
	ruta    = atma.ruta;
	mask    = atma.mask;
	include = atma.include;
	Routes  = ruta.Collection;
	logger  = global.logger;
	    
	    
	    
	
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
			
		
		var fns_RESPONDERS = [
			'handlers',
			'services',
			'pages'
		];
		
		var HandlerFactory = Class({
			
			Construct: function(){
				this.handlers = new Routes();
				this.services = new Routes();
				this.pages = new Routes();
			},
			
			registerPages: function(pages){
				var page, key;
				
				for (key in pages) {
					
					page = pages[key];
					
					if (page.controller != null) {
						page.controller = __app
							.config
							.page
							.getController(page)
							;
					} else {
						
						page.controller = server.HttpPage;
					}
					
					this.pages.add(key, page);
				}
				
				
				
				return this;
			},
			
			registerHandlers: function(routes, config){
				
				for (var key in routes) {
					this
						.handlers
						.add(key, {
							controller: handler_path(routes[key], config)
						});
				}
				
				return this;
			},
			
			registerServices: function(routes, config){
				var route,
					key,
					path
				for (var key in routes) {
					
					
					route = typeof routes[key] === 'string'
						? { controller: routes[key] }
						: routes[key]
						;
						
					path = route.controller;
					if (!path) 
						logger.error('<handler factory> service path not defined', routes[key]);
					
					route.controller = 	handler_path(path, config);
					
					this
						.services
						.add(key, route);
				}
				
				return this;
			},
			
			get: function(req, callback){
				
				var url = req.url,
					method = req.method,
					route;
					
				if (method === 'POST' && req.body && req.body._method) {
					method = req.body._method;
				}
				
				for (var i = 0, x, imax = fns_RESPONDERS.length; i < imax; i++){
					x = fns_RESPONDERS[i];
					
					if (processor_tryGet(this[x], url, method, callback)) 
						return;
				}
				
				callback(null);
			}
		});
		
	
		function processor_tryGet(collection, url, method, callback){
			var route = collection.get(url, method),
				processor;
			
			if (route == null) 
				return false;
			
			
			var controller = route.value.controller;
			if (typeof controller === 'string') {
				
				processor_loadAndInit(controller, route, callback);
				return true;
			}
			
			callback(new controller(route));
			return true;
		}
		
		function processor_loadAndInit(url, route, callback){
			
			include
				.instance()
				.js(url + '::Handler')
				.done(function(resp){
					
					if (resp.Handler == null) {
						logger.error('<handler> invalid route', url);
						
						return callback(new ErrorHandler());
					}
					
					if (typeof resp.Handler.prototype.process !== 'function') {
						logger.error('<handler> invalid interface - process function not implemented');
						
						return callback(new ErrorHandler());
					}
					
					
					callback(new resp.Handler(route));
				});
		}
		
		function get_service(factory, path) {
			var services = factory.services,
				route = services.get(path);
			
			return route;
		}
		
		function get_handler(factory, path) {
			
			return factory
				.handlers
				.get(path)
				;
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
	
		
		
		var ErrorHandler = Class({
			Base: Class.Deferred,
			process: function(){
				this.reject('Invalid Routing');
				return this;
			}
		});
		
		
		
		return HandlerFactory;
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
		// source HttpContext.js
		
		function HttpContext(page, req, res){
			this.page = page;
			this.req = req;
			this.res = res;
			
			this._rewrite = null;
			this._redirect = null;
		}
		
		HttpContext.prototype = {
			redirect: function(url, code){
				if (code == null) 
					code = 302;
					
				this.res.statusCode = code;
				this.res.setHeader('Location', url);
				this.res.setHeader('Content-Length', '0');
				this.res.end();
				
				this._redirect = url;
			},
			
			rewrite: function(url){
				
				this._rewrite = url;
			}
		}
		
		// end:source HttpContext.js
		
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
			 *
			 *	@TODO pass current route params
			 */
			Construct: function(mix){
				
				if (this instanceof Page === false) {
					return page_Create(mix);
				}
				
				var cfg = __app.config.page;
				
				/**
				 * Page can also have path url definition like '/?:pageName/?:section/?:anchor'
				 * and then get it like ctx.page.query.pageName;
				 */
				this.route = cfg.route;
				
				var route = mix;
				if (!(route && route.value)) {
					logger
						.error('<httppage> current route value is unedefined');
					
					return;
				}
				
				
				this.data = route.value;
				this.query = route.current && route.current.params;
				
				
				this.master = cfg.getMaster(this.data) + '::Master';
				
				if (this.data.template) 
					this.template = cfg.getTemplate(this.data) + '::Template';
				
				
				if (this.data.compo) 
					this.compo = cfg.getCompo(this.data) + '::Compo';
				
				if (this.compo == null && this.template == null) 
					this.template = cfg.getTemplate(this.data) + '::Template';
			},
			
			process: function(req, res){
				
				if (this.route) {
					var query = ruta
						.parse(this.route, req.url)
						.params;
	
					for(var key in query){
						if (this.query[key] == null)
							this.query[key] = query[key];
					}
				}
				
				this.ctx = new HttpContext(this, req, res);
				
				if ('secure' in this.data) {
					
					var user = req.user,
						secure = this.data.secure,
						role = secure && secure.role
						;
						
					if (user == null || (role && user.isInRole(role)) === false) {
						this.ctx.redirect(__app.config.page.urls.login);
						return this;
					}
				}
				
				this.load();
				return this;
			},
			
			load: function(){
				
				this.resource = include
					.instance()
					.load(this.master, this.template)
					.js(this.compo)
					.done(fn_proxy(this.response, this));
			},
			
			
			response: function(resp){
				
				var master = resp.load.Master,
					template = resp.load.Template,
					Component = resp.Compo;
					
				
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
				
				
				if (master) 
					mask.render(mask.parse(master));
				
				if (Component != null) {
					
					if (template && Component.template == null) 
						Component.template = template;
						
					if (Component.mode == null) 
						Component.mode = 'server';
					
					this.nodes = new mask
						.Dom
						.Component('', null, Component)
						;
					
				}
				
				if (this.onRenderStart) {
					this.onRenderStart(this.model, this.ctx);
				}
				
				var html = mask.render(this.nodes || template, this.model, this.ctx);
				
				if (this.ctx._rewrite != null) {
					__app
						.handlers
						.get(this.ctx._rewrite, page_rewriteDelegate(this));
					return;
				}
				
				if (this.ctx.async) {
					
					this
						.ctx
						.done(fn_proxy(this.doResolve, this))
						.fail(fn_proxy(this.fail, this));
						
					return;
				}
				
				this.doResolve(html);
			},
			
			doResolve: function(html){
				if (this.ctx._redirect != null) {
					// response was already flushed
					return;
				}
				
				this.resolve(html);
			}
		
		});
		
		
		function page_Create(classProto) {
			
			if (classProto.Base == null) {
				classProto.Base = Page;
			} else if (classProto.Extends == null) {
				classProto.Extends = Page;
			} else if (Array.isArray(classProto)) {
				classProto.Extends.push(Page);
			} else {
				classProto.Extends = [Page, classProto.Extends];
			}
			
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
		
		var HttpServiceProto = Class({
			Extends: Class.Deferred,
			secure: null,
			
			Construct: function(route){
				
				var i = 0,
					imax = route.parts.length,
					count = 0;
				for (; i < imax; i++){
					if (typeof route.parts[i] !== 'string') 
						break;
					
					count += route.parts[i].length + 1;
				}
				
				this.rootCharCount = count;
				
				if ('secure' in route.value) {
					this.secure = route.value.secure || {};	
				}
				
			},
			process: function(req, res){
				
				if (secure_canAccess(req, this.secure) === false) {
					
					return this
						.reject({ error: 'Access Denied' }, 401);
				}
				
				var path = req.url.substring(this.rootCharCount),
					entry = this.routes.get(path, req.method);
				
				
				if (entry == null) 
					return this
						.reject('Service method not Found: ' + path, 404);
					
				
				entry
					.value
					.call(this, req, res, entry.current.params);
					
				return this;
			}
		});
		
		
		return function HttpService(proto){
			
			var routes = new ruta.Collection;
			
			var defs = proto.ruta || proto;
			for (var key in defs) {
				
				routes.add(key, defs[key]);
			}
			proto.routes = routes;
			
			
			if (proto.Extends == null) {
				
				proto.Extends = HttpServiceProto;
				
			} else if (Array.isArray(proto.Extends)) {
				
				proto.Extends.push(HttpServiceProto);
			} else {
				
				proto.Extends = [HttpServiceProto, proto.Extends];
			}
			
			return Class(proto);
		}
		
		
		function secure_canAccess(req, secureObj){
			
			if (secureObj == null) 
				return true;
			
			var user = req.user,
				role = secureObj.role
				;
			
			return user != null && (role == null || user.isInRole(role));
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
							
							if (page.compo) {
								var path = this.getCompo(page),
									resource = include.getResource(path);
								if (resource != null) {
									
									for (var i = 0, x, imax = resource.includes.length; i < imax; i++){
										x = resource.includes[i];
										
										
										if (x.resource.type === 'css') {
											
											styles.push(x.resource.url);
										}
									}
									
								} else {
									
									logger
										.error('<page:styles> compo resource is undefined', path);
								}
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
				
							return page && page.include
								? incl_extend(include, page.include)
								: include
								;
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
						},
						
						getCompo: function(pageData){
							var compo = pageData.compo,
								location = this.location.compo || this.location.controller;
							
							return compo ?
								__app
									.config
									.formatPath(location, compo)
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
			
			var cfg_attachUtils = ConfigUtils.attach,
				_cfgDir = new io.Directory('server/config/'),
				
				_buildPath = 'public/build/',
				_configsPath = 'server/config/';
				
			function Config(params, callback) {
				
				if (params.buildDirectory) 
					_buildPath = params.buildDirectory;
				
				if (params.configs) 
					_configsPath = params.configs;
				
				
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
				
				return cfg_load(cfg, Config.getList(_configsPath), callback);
				
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
				
				_cfgDir = new io.Directory(net.Uri.combine(process.cwd(), path));
				
				var configs = _cfgDir
					.readFiles('**.yml')
					.files
					.map(function(file){
						
						return file
							.uri
							.toRelativeString(_cfgDir.uri)
							.replace('.yml', '')
							;
					});
				
				if (configs.length === 0)
					logger.error('<server> No configuration files in', _cfgDir.uri.toString());
				
				
				return configs;
			};
			
			
			
			/**
			 *	- configs - Array - ['name']
			 */
			function cfg_load(cfg, configs, callback) {
				if (Array.isArray(configs) === false){
					process.nextTick(function(){
						callback('<server.config> should be an array of filenames');
					});
					return cfg;
				}
				
				configs = configs.map(function(config){
					return _cfgDir
						.uri
						.combine(config + '.yml')
						.toString()
						+ '::'
						+ config.replace(/\//g, '.');
				});
				
				// build data
				var buildFile = new io.File(net.Uri.combine(_buildPath, 'stats.json'));
				
				if (buildFile.exists()) {
					configs
						.push(buildFile.uri.toString() + '::build');
				} else {
					
					if (!__app.args.degub)
						logger
							.warn('<config> %s/stats.json . App is not built', _buildPath);
					
				}
				
				
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
		// source connect/Middleware.js
		
		var MiddlewareRunner = Class.Collection(Function, {
			Construct: function(array){
				for (var i = 0, imax = array.length; i < imax; i++){
					this[this.length++] = array[i];
				}
			},
			
			callback: null,
			
			process: function(req, res, callback){
				
				this.callback = callback;
				this.index = 0;
				
				next(this, req, res, 0)
			}
			
		});
		
		
		function next(runner, req, res, index){
			if (index >= runner.length) {
				runner.callback(req, res);
				runner.callback = null;
				return;
			}
			
			var fn = runner[index];
			
			fn(req, res, nextDelegate(runner, req, res, index));
		}
		
		
		function nextDelegate(runner, req, res, index){
			
			return function(error){
				
				if (error) {
					logger.error(error);
				}
				
				next(runner, req, res, ++index);
			}
		}
		// end:source connect/Middleware.js
	
	
		server.Application = Class({
			Extends: Class.Deferred,
			
			middleware: null,
			
			Construct: function(proto){
				if (proto == null) 
					proto = {};
				
				if (this instanceof server.Application === false) {
					return new server.Application(proto);
				}
				
				__app = this;
				
				this.handlers = new HandlerFactory();
				this.args = obj_extend(proto.args, cli_arguments());
				this.config = this._loadConfig();
				
			
				if (this.args.debug !== true) 
					logger.cfg('color', 'none');
					
				return this;
			},
			
			
			responder: function(data){
				if (data){
					this.middleware = data.middleware;
				}
				
				return responder(this);
			},
			
			
			autoreload: function(httpServer){
				this.autoreloadEnabled = true;
				Autoreload.listen(httpServer);
				Autoreload.listenDirectory('server/config/', this._loadConfig);
				
				include.cfg('autoreload', Autoreload);
			},
			autoreloadEnabled: false,
			
			Self: {
				_loadConfig: function(){
					this.config = Config({
							buildDirectory : proto.buildDirectory,
							configs: proto.configs
						},
						cfg_doneDelegate(this)
					);
				}
			}
		});
		
		
		function responder(app) {
			return function (req, res, next){
				
				if (app.autoreloadEnabled) 
					Autoreload.watch(req.url);
				
				var callback = app.middleware
					? middleware_processDelegate(app.middleware)
					: handler_process
					;
				
				handler_resolve(app, req, res, next, callback);
			}
		}
		
		function middleware_processDelegate(middleware){
			
			return function(handler, req, res){
				
				new MiddlewareRunner(middleware)
					.process(req, res, function(){
					
						handler_process(handler, req, res);
					});
			};
		}
		
		function handler_resolve(app, req, res, next, callback){
			resources_load(app, function(){
				app
					.handlers
					.get(req, function(handler){
						
						if (handler == null) 
							return next();
						
						callback(handler, req, res);
					});
			});
		}
		
		
		
		function handler_process(handler, req, res) {
			logger(95)
				.log('<request>', req.url);
			
			handler
				.process(req, res)
				.done(function(content, statusCode, mimeType, headers){
					
					response_end(res, content, statusCode, mimeType, headers);
				})
				.fail(function(message, statusCode){
					res.statusCode = statusCode || 500;
					
					response_end(res, message, statusCode || 500, 'text/plain');
				});
		}
		
		
		
		function cfg_doneDelegate(app) {
			return function(error) {
				if (error)
					logger.error(error);
					
				var cfg = app.config;
				
				
				logger(90)
					.log('<app.config>', cfg);
				
				app
					.handlers
					.registerHandlers(cfg.handlers, cfg.handler)
					.registerServices(cfg.services, cfg.service)
					.registerPages(cfg.pages)
					;
					
				
				if (app.args.debug) {
					
					app.resolve(app);
					return;
				}
				
				
				resources_load(app, function(){
					
					resource_load = resource_loadEmpty;
					app.resolve(app);
				});
			}
		}
		
		function resources_load(app, callback) {
			return include
					.instance()
					.js(app.config.env.server.scripts)
					.js(app.config.env.both.scripts)
					.done(callback);
		}
		
		function resource_loadEmpty(app, callback){
			callback();
		}
		
		function response_end(res, content, statusCode, mimeType, headers) {
			
			if (typeof content !== 'string' && content instanceof Buffer === false) {
				try {
					
					mimeType = 'application/json';
					content = JSON.stringify(content);
					
				}catch(error){
					
					logger.error('<responder> invalid json object', error);
					content = '{ error: "JSON stringify failed" }';
				}
			}
			
			if (headers) {
				for (var key in headers) {
					res.setHeader(key, headers[key]);
				}
			}
			
			res.setHeader('Content-Type', mimeType || 'text/html');
			res.statusCode = statusCode || 200;
			
			res.end(content);
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
	                    
	                    if (sender === 'filewatcher') {
	                        // @TODO
	                        path = '/' + path.replace(rootFolder, '');
	                        
	                        if (include.getResource(path) == null) {
	                            this.trigger('fileChange', path);
	                        }
	                        
	                        return;
	                    }
	                    
	                    this.trigger('fileChange', path);
	                    
	                    //// --
	                    ////if (sender === 'include') {
	                    ////    this.trigger('fileChange', path);
	                    ////    return;
	                    ////}
	                    ////
	                    ////path = path.replace(rootFolder, '');
	                    ////
	                    ////////////////if (sender === 'filewatcher' && include.getResource(path)) {
	                    ////////////////    /**
	                    ////////////////     *  include.autoreload feature also listens for file changes
	                    ////////////////     *  and if the file is in includejs cache, then this function
	                    ////////////////     *  will be called by includejs immediately. This happens
	                    ////////////////     *  while Application enables autoreload via
	                    ////////////////     *   include.cfg('autoreload', {
	                    ////////////////     *      fileChanged: function(path) {
	                    ////////////////     *          Autoreload.fileChanged(path)
	                    ////////////////     *      }
	                    ////////////////     *   });
	                    ////////////////     */
	                    ////////////////    return;
	                    ////////////////}
	                    ////
	                    ////
	                    ////var that = this;
	                    ////include.bin_tryReload(path, function(){
	                    ////    that.trigger('fileChange', path);
	                    ////});
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
	        
	        fileChanged: function(path, sender){
	            
	            WatcherHandler.fileChanged(path, sender);
	        },
	        
	        isWatching: function(file){
	            if (typeof file === 'string') 
	                file = new io.File(file);
	            
	            return WatcherHandler.isWatching(file);
	        },
	        
	        listenDirectory: function(dir, callback){
	            //logger.warn('<autoreload> config watcher not implemented yet.');
	            //var that = this;
	            //
	            new io
	                .Directory(dir)
	                .watch(callback)
	                ;
	        }
	    };
	    
	}());
	
	// end:source ../src/Autoreload/autoreload.js
	
	__cfgDefaults = [
			// source cfg-defaults.json
			{
			    "handler": {
			        "location": "/server/http/handler/{0}.js"
			    },
			    "mask": {
			        "compos": {
			            ":scripts": {
			                "mode": "server:all"
			            },
			            ":styles": {
			                "mode": "server:all"
			            },
			            ":template": {
			                "mode": "server"
			            },
			            "layout:master": {
			                "mode": "server"
			            },
			            "layout:view": {
			                "mode": "server"
			            },
			            ":animation": {
			                "mode": "client"
			            }
			        },
			        "attributes": null
			    },
			    "page": {
			        "location": {
			            "controller": "/server/http/page/{0}/{1}.js",
			            "template": "/server/http/page/{0}/{1}.mask",
			            "master": "/server/http/master/{0}.mask",
			            "viewTemplate": "/public/view/{0}/{1}.mask",
			            "viewController": "/public/view/{0}/{1}.js",
			            "viewStyle": "/public/view/{0}/{1}.less"
			        },
			        "extension": {
			            "javascript": "js",
			            "style": "less",
			            "template": "mask"
			        },
			        "index": {
			            "template": "index",
			            "master": "default"
			        },
			        "urls": {
			            "login": "/login"
			        }
			    },
			    "pages": {
			        "/": {
			            "id": "index",
			            "title": "Default Title"
			        }
			    },
			    "service": {
			        "location": "/server/http/service/{0}.js"
			    },
			    "view": {
			        "location": {
			            "template": "/public/view/{0}/{1}.mask",
			            "controller": "/public/view/{0}/{1}.js",
			            "style": "/public/view/{0}/{1}.less"
			        }
			    }
			}
			// end:source cfg-defaults.json
		][0];
		
	if (exports.atma != null && typeof exports.atma === 'object') {
		
		obj_extend(exports.atma, server);
		return;
	}
	
	exports.atma = {
		server: server
	};
	
}));