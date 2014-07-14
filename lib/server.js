(function(root, factory){
	"use strict";
	
	factory(global, global);
	module.exports = global.atma.server;
	
}(this, function(global, exports){
	"use strict";
	
	var server = {};
	
	var __app,
		__cfgDefaults;
	
	// source /src/vars.js
	var _Array_slice = Array.prototype.slice;
	// end:source /src/vars.js
	// source /src/dependency.js
	var atma,
	    io,
	    net,
	    Class,
	    ruta,
	    mask,
	    include,
	    includeLib,
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
	
	
	
	net         = atma.net;
	Class       = atma.Class;
	ruta        = atma.ruta;
	mask        = atma.mask;
	include     = atma.include;
	includeLib  = atma.includeLib;
	Routes      = ruta.Collection;
	logger      = global.logger;
	    
	    
	    
	
	// end:source /src/dependency.js
	
	// source /src/const/mime.js
	
	var mime_JSON,
		mime_HTML,
		mime_PLAIN
		;
	
	(function(){
		var utf8 = ';charset=utf-8';
	
		mime_JSON = 'application/json' + utf8;
		mime_HTML = 'text/html' + utf8;
		mime_PLAIN = 'text/plain' + utf8;
		
	}());
	// end:source /src/const/mime.js
	
	// source /src/util/is.js
	var is_String,
	    is_Function,
	    is_Object,
	    is_Array,
	    
	    is_Debug
	    ;
	    
	(function(){
	    
	    is_String = function(str){
	        return typeof str === 'string';
	    };
	    
	    is_Function = function(fn){
	        return typeof fn === 'function';
	    };
	
	    is_Object = function(obj){
	        return obj !== void 0 && typeof obj === 'object';
	    };
	
	    is_Array = Array.isArray;
	    
	    is_Debug = (function(){
	        
	        var debug;
	        return function(){
	            logger.warn('@obsolete: is_Debug for app_isDebug');
	            if (debug == null) 
	                debug = Boolean(__app.args.debug || __app.config.debug);
	            
	            return debug;
	        };
	    }());
	    
	}());
	
	// end:source /src/util/is.js
	// source /src/util/obj.js
	var obj_extend,
	    obj_defaults,
	    obj_lazyProperty
	    ;
	
	(function(){
	
	    obj_extend = function(target, source) {
	        if (target == null) 
	            target = {};
	        
	        if (source == null) 
	            return target;
	        
	        for (var key in source) {
	            target[key] = source[key];
	        }
	        return target;
	    };
	    
	    obj_defaults = function(target, defaults) {
	        if (target == null) 
	            target = {};
	            
	        if (defaults == null) 
	            return target;
	        
	        for (var key in defaults) {
	            if (target[key] == null) 
	                target[key] = defaults[key];
	        }
	        return target;
	    };
	    
	    obj_lazyProperty = function(obj, xpath, init){
	        var arr = xpath.split('.'),
	            imax = arr.length - 1,
	            i = -1, key;
	        while(++i < imax){
	            key = arr[i];
	            if (obj[key] == null) 
	                obj[key] = {};
	            
	            obj = obj[key];
	        }
			key = arr[imax];
	        Object.defineProperty(obj, key, {
				enumerable: true,
				configurable: true,
				get: function(){
					
					var val = init();
					Object.defineProperty(obj, key, {
						enumerable: true,
						writable: true,
						value: val
					})
	                return val;
	            },
	            set: function(val){
	                Object.defineProperty(obj, key, {
						enumerable: true,
						writable: true,
						value: val
					});
	            }
	        })
	    };
	    
	}());
	
	// end:source /src/util/obj.js
	// source /src/util/fn.js
	var fn_proxy,
	    fn_delegate
	    ;
	
	(function(){
	    fn_proxy = function(fn, ctx) {
	        return function(){
	            return fn.apply(ctx, arguments);  
	        };
	    };
	    
	    fn_delegate = function(fn /*args_1 ...*/) {
	        var args = _Array_slice.call(arguments, 1);
	        
	        return function(/*args_2 ...*/){
	            
	            fn.apply(
	                null,
	                /* args_1 + args_2 */
	                args.concat(_Array_slice.call(arguments))
	            );
	        }
	    };
	    
	}());
	
	// end:source /src/util/fn.js
	// source /src/util/arr.js
	
	function arr_isArray(array) {
	    return Array.isArray(array);
	}
	// end:source /src/util/arr.js
	// source /src/util/path.js
	var path_hasProtocol,
		path_normalize,
		path_resolveSystemUrl;
	
	(function(){
		path_hasProtocol = function(path){
			return /^(file|https?):/.test(path);
		};
		
		path_normalize = function(path) {
			return path
				.replace(/\\/g, '/')
				// remove double slashes, but not near protocol
				.replace(/([^:\/])\/{2,}/g, '$1/')
				;
		};
		path_resolveSystemUrl = function(path){
			path = path_normalize(path);
			if (path_hasProtocol(path)) 
				return path;
			
			if (path[0] === '.' && path[1] === '/') 
				path = path.substring(2);
			
			if (hasSystemRoot(path)) 
				return 'file://' + path;
			
			if (base_ == null) 
				ensureBase();
				
			return net.Uri.combine(base_, path);
		};
		
		var base_;
		function ensureBase() {
			base_ = 'file://' + path_normalize(process.cwd() + '/');
		}
		function hasSystemRoot(path) {
			if (path[0] === '/') 
				return true;
			
			return /^[A-Za-z]:[\/\\]/.test(path);
		}
	}());
	// end:source /src/util/path.js
	// source /src/util/cli.js
	
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
	
	// end:source /src/util/cli.js
	// source /src/util/app.js
	var app_isDebug;
	(function(){
		
		app_isDebug = function(){
			if (__app == null) 
				return false;
			
			var debug = Boolean(__app.args.debug || __app.config.debug);
			if (debug !== true) {
				var env = process.env.NODE_ENV || process.env.ENV;
				if (env) {
					debug = /^(test|debug)$/i.test(env);
				}
			}
			app_isDebug = function(){
				return debug;
			};
			return debug;
		};
		
	}());
	// end:source /src/util/app.js
	// source /src/util/send.js
	var send_JSON,
		send_Error,
		send_Content
		;
		
	(function(){
		
		var obj_toString = Object.prototype.toString;
		
		send_JSON = function(res, json, statusCode, headers){
			
			var text;
			try {
				text = JSON.stringify(json);
			}catch(error){
				return send_Error(res, RuntimeError('Json Serialization'));
			}
			
			send_Content(res, text, statusCode || 200, mime_JSON, headers);
		};
		
		send_Error = function(res, error, headers){
			
			var body;
			if (typeof error === 'string') {
				body = {
					error: error,
					code: 500
				};
			}
			
			else if (error.toString === obj_toString) {
				body = error;
			}
			
			else {
				body = {
					error: error.toString(),
					code: error.statusCode || 500
				};
			}
			
			send_Content(
				res
				, JSON.stringify(body)
				, error.statusCode || 500
				, mime_JSON
				, headers
			);
		};
		
		
		
		send_Content = function(res, content, statusCode, mimeType, headers) {
			
			if (typeof content !== 'string' && content instanceof Buffer === false) {
				
				if (is_Object(content)) {
					send_JSON(res, content, statusCode, headers);
					return;
				}
				
				if (content instanceof Error) {
					send_Error(res, content, headers);
					return;
				}
				
				send_Error(res, RuntimeError('Unexpected content response'));
				return;
			}
			
			
			res.setHeader('Content-Type', mimeType || mime_HTML);
			res.statusCode = statusCode || 200;
			
			if (headers != null) {
				for (var key in headers) {
					res.setHeader(key, headers[key]);
				}
			}
			
			res.end(content);
		};
		
		
	}());
	// end:source /src/util/send.js
	// source /src/util/serialization.js
	RegExp.prototype.toJSON = RegExp.prototype.toString;
	// end:source /src/util/serialization.js
	
	// source /src/Business/Middleware.js
	var MiddlewareRunner;
	
	(function(){
	
		MiddlewareRunner = Class({
			Construct: function(arr){
				this.arr = arr;
			},
			process: function(req, res, callback, config){
				
				next(this, req, res, callback, config, 0);
			},
			add: function(mix){
				if (mix == null) 
					return this;
				
				if (typeof mix === 'function') {
					this.arr.push(mix);
					return this;
				}
				if (is_Array(mix)) {
					this.arr = this.arr.concat(mix);
					return this;
				}
				return this;
			},
			Static: {
				create: function(arr){
					if (arr == null) 
						return null;
					
					return new MiddlewareRunner(arr);
				}
			}
			
		});
		
		// private
		
		function next(runner, req, res, callback, config, index){
			if (index >= runner.arr.length) 
				return callback(null, req, res);
		
			var middleware = runner.arr[index];
			if (middleware == null) 
				return next(runner, req, res, callback, config, ++index);
		
			middleware(
				req,
				res,
				nextDelegate(runner, req, res, callback, config, index),
				config
			);
		}
		
		
		function nextDelegate(runner, req, res, callback, config, index){
			
			return function(error){
				if (error) {
					logger
						.debug('<app:middleware:nextDelegate>'.red, error);
					callback(error, req, res);
					return;
				}
				
				next(runner, req, res, callback, config, ++index);
			};
		}	
		
	}());
	
	// end:source /src/Business/Middleware.js
	// source /src/HttpError/HttpError.js
	
	var HttpError,
		
		NotFoundError,
		RequestError,
		
		SecurityError,
		
		RuntimeError
		;
		
	
	(function(){
		
		server.HttpError = HttpError = Class({
			Construct: function(message, statusCode){
				
				if (this instanceof HttpError === false) 
					return new HttpError(message, statusCode);
				
				this.error_ = new Error;
				this.message = message;
				
				if (statusCode != null) 
					this.statusCode = statusCode;
			},
			name: 'HttpError',
			statusCode: 500,
			get stack() {
				var stack = this.error_.stack.split('\n'),
					imax = stack.length,
					start = 1,
					end = 1;
				
				var rgx = /\[as \w+Error\]/;
				
				while (++end < imax) {
					if (rgx.test(stack[end])) 
						break;
				}
				
				stack.splice(1, end - start + 1);
				
				return stack.join('\n');
			},
			
			toString: function(){
				
				return this.message
					? this.name + ': ' + this.message
					: this.name
					;
			}
		});
		
		RequestError = createError('RequestError', 'Bad Request', 400);
		SecurityError = createError('SecurityError', 'Forbidden', 403);
		NotFoundError = createError('NotFoundError', 'Not Found', 404);
		RuntimeError = createError('RuntimeError', 'Internal Server Error', 500);
		
		
		// PRIVATE
		function createError(id, name, code) {
			var Ctor = server[id] = Class({
				Base: HttpError,
				Construct: function(){
					
					if (this instanceof Ctor === false) {
						var arguments_ = [null].concat(_Array_slice.call(arguments));
						return new (Ctor.bind.apply(Ctor, arguments_));
					}
					
				},
				statusCode: code,
				name: name
			});
			
			return Ctor;
		}
		
	}());
	// end:source /src/HttpError/HttpError.js
	
	// source /src/HandlerFactory.js
	
	var HandlerFactory = (function(){
			
		
		var fns_RESPONDERS = [
			'subapps',
			'handlers',
			'services',
			'pages'
		];
		
		var HandlerFactory = Class({
			
			Construct: function(app){
				this.app = app;
				
				var i = fns_RESPONDERS.length;
				while(--i > -1){
					this[fns_RESPONDERS[i]] = new Routes();
				}
			},
			
			registerPages: function(pages){
				var page, id;
				
				for (id in pages) {
					
					page = pages[id];
					
					if (page.controller == null) {
						page.controller = server.HttpPage;
					}
					else if (is_String(page.controller)) {
						page.controller = this
							.app
							.config
							.$getController(page)
							;
					}
					this.pages.add(page.route, page);
				}
				return this;
			},
			
			registerHandlers: function(routes, handlerCfg){
				for (var key in routes) {
					this.registerHandler(key, routes[key], handlerCfg);
				}
				return this;
			},
			registerHandler: function(path, handler, handlerCfg) {
				if (is_String(handler)) {
					handler = {
						controller: handler_path(handler, handlerCfg)
					};
				}
				
				this
					.handlers
					.add(path, handler)
					;
			},
			
			registerSubApps: function(routes, subAppCfg){
				for(var key in routes){
					this.registerSubApp(key, routes[key], subAppCfg);
				}
				return this;
			},
			registerSubApp: function(name, data, subAppCfg){
				var route = name;
				
				if (route[0] !== '^') {
					if (route[0] !== '/') 
						route = '/' + route;
					
					route = '^' + route;
				}
				
				this
					.subapps
					.add(route, new server.HttpSubApplication(name, data, this.app))
					;
			},
			
			registerServices: function(routes, serviceCfg){
				
				for (var key in routes) {
					this.registerService(key, routes[key], serviceCfg);
				}
				
				return this;
			},
			registerService: function(path, service, serviceCfg){
				if (is_Function(service)) {
					service = {
						controller: service
					};
				}
				
				else if (is_String(service)) {
					service = {
						controller: service
					};
				}
				
				if (is_String(service.controller)) 
					service.controller = handler_path(service.controller, serviceCfg);
				
				
				this
					.services
					.add(path, service)
					;
			},
			
			registerWebsockets: function(routes){
				for(var namespace in routes){
					this.registerWebsocket(namespace, routes[namespace]);
				}
				return this;
			},
			registerWebsocket: function(namespace, handler, handlerCfg){
				
				if (is_String(handler)) {
					var path = handler_path(handler, handlerCfg);
					include
						.instance()
						.js(Handler + '::Handler')
						.done(function(resp){
							
							WebSocket.registerHandler(namespace, resp.Handler);
						});
					return;
				}
				WebSocket.registerHandler(namespace, handler);
			},
			
			get: function(app, req, callback){
				
				var url = req.url,
					method = req.method,
					base = app.config.base,
					route;
					
				if (method === 'POST' && req.body && req.body._method) {
					method = req.body._method;
				}
				
				var imax = fns_RESPONDERS.length,
					i = -1,
					x
					;
				
				while( ++i < imax ){
				
					x = fns_RESPONDERS[i];
					if (processor_tryGet(this, this[x], url, method, base, callback)) 
						return;
				}
				
				if (this.app !== __app) {
					// check handlers of the root application
					var factory = __app.handlers,
						cfg = __app.config;
						
					var hasHandler = processor_tryGet(
							factory,
							factory.handlers,
							url,
							method,
							cfg.base || base,
							callback
						);
					
					if (hasHandler) 
						return;
				}
				
				callback(null);
			},
			
			has: function(url, method){
				
				var imax = fns_RESPONDERS.length,
					i = -1
					;
				while( ++i < imax ){
					
					if (this[fns_RESPONDERS[i]].get(url, method) != null) 
						return true;
				}
				
				return false;
			}
		});
	
		function processor_tryGet(factory, collection, url, method, base, callback){
			
			var route = collection.get(url, method),
				processor;
			
			if (route == null) 
				return false;
			
			var controller = route.value.controller || route.value;
			
			if (controller == null) {
				logger.error('<routing> no controller', url);
				return false;
			}
			
			if (is_Function(controller)) {
				callback(new controller(route, factory.app));
				return true;
			}
			
			if (is_String(controller)) {
				var path = path_hasProtocol(controller)
					? controller
					: net.Uri.combine(base, controller)
					;
				
				processor_loadAndInit(factory, path, route, callback);
				return true;
			}
		
			if (is_Function(controller.process)) {
				callback(controller);
				return true;
			}
			
			logger.error('<routing> invalid controller', controller);
			return false;
			
		}
		
		function processor_loadAndInit(factory, url, route, callback){
			
			factory
				.app
				.resources
				.js(url + '::Handler')
				.done(function(resp){
					
					var Handler = resp.Handler;
					if (Handler == null) {
						logger.error('<handler> invalid route', url);
						callback(new ErrorHandler('Invalid route: ' + url));
						return;
					}
					if (!is_Function(Handler.prototype.process)) {
						logger.error('<handler> invalid interface - process function not implemented');
						callback(new ErrorHandler('Invalid interface'));
						return;
					}
					if (app_isDebug() === false) 
						route.value.controller = Handler;
					
					if (is_Object(Handler) && is_Function(Handler.process)) {
						callback(Handler);
						return;
					}
					callback(new Handler(route, factory.app));
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
			if (path.indexOf('://') !== -1) {
				return path;
			}
			
			var location = config && config.location;
			if (location == null) {
				logger
					.error('<Handler> Path is relative but no location. Set handler: {location: X} in config')
					.error(path, config)
					;
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
				return this.reject('Invalid Routing');
			}
		});
		
		
		
		return HandlerFactory;
	}());
	// end:source /src/HandlerFactory.js
	// source /src/IHttpHandler.js
	server.IHttpHandler = Class({
		Extends: Class.Deferred,
		
		process: function(req, res){
			
			this.reject('Not Implemented', 500);
		}
	});
	// end:source /src/IHttpHandler.js
	
	// source /src/HttpPage/HttpPage.js
	server.HttpPage = (function(){
		
		// source page-utils.js
		var page_Create,
			page_rewriteDelegate,
			page_proccessRequest,
			page_proccessRequestDelegate,
			page_resolve,
			
			page_pathAddAlias,
			
			pageError_sendDelegate,
			pageError_failDelegate
			;
		
		(function(){
		
			page_Create = function(classProto) {
					
				if (classProto.middleware) {
					classProto.middleware = new MiddlewareRunner(
						classProto.middleware
					);
				}
				
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
			};
			
			
			page_rewriteDelegate = function(page) {
				var ctx = page.ctx;
				
				if (ctx.rewriteCount == null) 
					ctx.rewriteCount = 1;
				
				if (++ctx.rewriteCount > 5) {
					page.reject('Too much rewrites, last path: ' + ctx._rewrite);
					return;
				}
				
				
				return function(rewrittenHandler){
					if (rewrittenHandler == null) {
						page.reject('Rewritten Path is not valid: ' + ctx._rewrite);
						return;
					}
					
					rewrittenHandler
						.process(ctx.req, ctx.res)
						.done(page.resolveDelegate())
						.fail(page.rejectDelegate())
						;
				}
			};
			
			page_proccessRequestDelegate = function(page, req, res, config){
				return function(error){
					if (error) {
						page.reject(error);
						return;
					}
					page_proccessRequest(page, req, res, config);
				};
			};
			
			page_proccessRequest = function(page, req, res, config) {
				if (page.route) {
					var query = ruta
						.parse(page.route, req.url)
						.params;
			
					for(var key in query){
						if (page.query[key] == null)
							page.query[key] = query[key];
					}
				}
				
				page.ctx = new HttpContext(page, config, req, res);
				
				if ('secure' in page.data) {
					
					var user = req.user,
						secure = page.data.secure,
						role = secure && secure.role
						;
						
					if (user == null || (role && user.isInRole(role)) === false) {
						page.ctx.redirect(__app.config.page.urls.login);
						return page;
					}
				}
				return page._load();
			};
			
			page_resolve = function(page, data){
				if (page.ctx._redirect != null) {
					// response was already flushed
					return;
				}
				
				page.resolve(data);
			};
			
			page_pathAddAlias = function(path, alias){
				if (path == null || path === '') 
					return null;
				
				var i = path.indexOf('::');
				if (i !== -1) 
					path = path.slice(0, -i);
				
				return path + '::' + alias;
			};
			
			pageError_sendDelegate = function(res, error){
				
				return function(html) {
					send_Content(res, html, error.statusCode || 500, mime_HTML);
				};
			};
			
			pageError_failDelegate = function(res, error){
				return function(internalError){
					var str = is_Object(internalError)
						? JSON.stringify(internalError)
						: internalError
						;
						
					str += '\nError: ' + error.message
					
					send_Content(res, 'ErrorPage Failed: ' + str, 500, mime_PLAIN);
				}
			};
			
		}());
		
		// end:source page-utils.js
		// source Resources.js	
		var Resources = (function(){
			
			
			
			var Resources = {
				getScripts: function(config){
					return config.$getScripts(this.data.id);
				},
				
				getStyles: function(config){
					return config.$getStyles(this.data.id);
				}
			};
			
			
			return Resources;
		}());
		// end:source Resources.js	
		// source HttpContext.js
		
		function HttpContext(page, config, req, res){
			this.config = config;
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
			
			ctx: null,
			middleware: null,
			
			templatePath: null,
			masterPath: null,
			compoPath: null,
			
			route: null,
			model: null,
			
			send: null,
		
			Construct: function(route, app){
				
				if (this instanceof Page === false) {
					return page_Create(route, app);
				}
				
				var cfg = app.config;
				
				/**
				 * Page can also have path url definition like '/?:pageName/?:section/?:anchor'
				 * and then get it like ctx.page.query.pageName;
				 */
				this.route = cfg.page.route;
				if (!(route && route.value)) {
					logger
						.error('<httppage> current route value is unedefined');
					
					return;
				}
				
				
				var data = this.data = route.value;
				this.query = route.current && route.current.params;
				
				if (data.masterPath) 
					this.masterPath = data.masterPath;
				
				if (data.templatePath) 
					this.templatePath = data.templatePath;
				
				if (data.master) 
					this.masterPath = cfg.$getMaster(data);
				
				if (data.template) 
					this.templatePath = cfg.$getTemplate(data);
				
				if (data.compo) 
					this.compoPath = cfg.$getCompo(data);
				
				
				if (this.template == null && this.compoPath == null && this.templatePath == null)
					this.templatePath = cfg.$getTemplate(data);
				
				if (this.master == null && this.masterPath == null)
					this.masterPath = cfg.$getMaster(data);
					
			},
			
			process: function(req, res, config){
				
				if (this.middleware == null) 
					return page_proccessRequest(this, req, res, config);
				
				this.middleware.process(
					req,
					res,
					page_proccessRequestDelegate(this, req, res, config),
					config
				);
				return this;
			},
			
			sendError: function(res, mix, statusCode, config){
				var pageCfg = config.page,
					errorPages = pageCfg.errors,
					genericPage = pageCfg.error
					;
				
				var error;
				if (mix instanceof Error) {
					error = mix;
				}
				else if (is_String(mix)) {
					error = new HttpError(mix, statusCode);
				}
				else if (is_Object(mix)) {
					error = new HttpError(JSON.stringify(mix), statusCode);
				}
				
				var pageData = (errorPages && errorPages[error.statusCode]) || genericPage,
					page;
					
				
				if (pageData == null) {
					pageError_failDelegate
						(res, error)
						('No Error Page in Configuration')
						;
					return;
				}
				
				this.masterPath = config.$getMaster(pageData) + '::Master';
				this.templatePath = pageData.template + '::Template';
				this.compoPath = null;
				this.model = error;
				this
					.defer()
					.done(pageError_sendDelegate(res, error))
					.fail(pageError_failDelegate(res, error))
					._load()
					;
				
			},
			
			_load: function(){
				
				this.resource = include
					.instance()
					.load(
						page_pathAddAlias(this.masterPath, 'Master'),
						page_pathAddAlias(this.templatePath, 'Template'))
					.js(
						page_pathAddAlias(this.compoPath, 'Compo')
					)
					.done(fn_proxy(this._response, this));
				return this;
			},
			
			
			_response: function(resp){
				
				var master = resp.load.Master || this.master,
					template = resp.load.Template || this.template,
					Component = resp.Compo;
				
				if (master == null) {
					this.reject(HttpError('Page: Masterpage not found'));
					return;
				}
				
				if (template == null && Component == null) {
					this.reject(HttpError('Page: Template not found'));
					return;
				}
				
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
				
				if (is_Function(this.onRenderStart)) 
					this.onRenderStart(this.model, this.ctx);
				
				
				var html = mask.render(
					this.nodes || template,
					this.model,
					this.ctx,
					null,
					this
				);
				
				if (this.ctx._rewrite != null) {
					__app
						.handlers
						.get(this.ctx._rewrite, page_rewriteDelegate(this));
					return;
				}
				
				if (this.ctx.async) {
					this
						.ctx
						.done(fn_delegate(page_resolve, this))
						.fail(this.rejectDelegate());
					return;
				}
				
				page_resolve(this, html)
			}
		
		});
		
		
		return Page;	
	}());
	
	// end:source /src/HttpPage/HttpPage.js
	// source /src/HttpService/HttpService.js
	
	server.HttpService = (function(){
		
		// source utils.js
		var secure_canAccess,
			service_validateArgs
			;
		(function(){
			
			secure_canAccess = function(req, secureObj){
					
				if (secureObj == null) 
					return true;
				
				if (secureObj === true || secureObj.role == null) 
					return (req.session != null || req.user != null);
				
				var user = req.user,
					role = secureObj.role
					;
				return user != null && (role == null || user.isInRole(role));
			};
			
			service_validateArgs = function(body, args, isStrict) {
				if (body == null) 
					return 'Message Body is not defined';
				
				return Class.validate(body, args, isStrict);
			};
			
		}())
		
		// end:source utils.js
		// source Barricade.js
		var Barricade = (function(){
			
			var Runner = Class.Collection(Function, {
				Base: Class.Serializable,
				process: function(service, req, res, params){
					
					next(this, service, req, res, params, 0)
				}
				
			});
				
			function next(runner, service, req, res, params, index){
				if (index >= runner.length) 
					return;
			
				var fn = runner[index],
					error;
					
				error = fn.call(
					service,
					req,
					res,
					params,
					nextDelegate(runner, service, req, res, params, index)
				);
				
				if (error) 
					reject(service, error);
				
			}
			
			
			function nextDelegate(runner, service, req, res, params, index){
				
				return function(error){
					
					if (error) 
						return reject(service, error)
					
					next(
						runner,
						service,
						req,
						res,
						params,
						++index
					);
				};
			}
			
			function reject(service, error){
				if (typeof error === 'string') 
					error = HttpError(error);
				
				service.reject(error);
			}
			
			return function(middlewares){
				
				var barricade = new Runner(middlewares),
					service;
				
				return function(req, res, params){
					service = this;
					barricade.process(service, req, res, params);
				};
			};
			
		}());
		// end:source Barricade.js
		// source CrudWrapper.js
		
		(function(){
			
			server.HttpCrudEndpoints = {
				Single: function(name, Ctor){
					
					var proto = {},
						property = name,
						bodyParser = server.HttpService.classParser(name, Ctor),
						bodyPatchParser = server.HttpService.classPatchParser(name, Ctor),
						
						properties = Class.properties(Ctor)
						;
					
					Object
						.keys(properties)
						.forEach(function(key){
							properties['?' + key] = properties[key];
							delete properties[key];
						})
						;
					
					
					proto['$get /' + name + '/:id'] = {
						meta: {
							response: properties
						},
						process: function(req, res, params){
						
							await(
								this,
								Ctor.fetch({ _id: params.id })
							);
						}
					};
					
					proto['$put /' + name + '/:id'] = {
						meta: {
							description: 'Update existed entity',
							arguments: properties,
							response: properties
						},
						process: [
							bodyParser,
							function(req, res, params){
								var x = req[properties];
								x._id = params.id;
								
								await(this, x.save());
							}
						]
					};
					
					proto['$post /' + name] = {
						meta: {
							description: 'Create new entity',
							arguments: properties,
							response: properties,
						},
						process: [
							bodyParser,
							function(req){
								var x = req[property];
								delete x._id;
								await(this, x.save());
							}
						]
					};
					
					proto['$delete /' + name + '/:id'] = {
						meta: {
							description: 'Remove entity'
						},
						process: function(req, res, params) {
							var x = new Ctor({ _id: params.id });
							await(this, x.del());
						}
					}
					
					proto['$patch /' + name + '/:id'] = {
						meta: {
							description: 'Modify existed entity. `patch object` syntax is similar to MongoDB\'s'
						},
						process: [
							bodyPatchParser,
							function (req, res, params) {
								
								var json = req.body,
									instance = new Ctor({_id: params.id}).patch(json)
									;
								
								await(this, instance);
							}
						]
					};
					
					
					return proto;
				},
				Collection: function(name, Ctor){
					
					var proto = {},
						property = name,
						bodyParser = server.HttpService.collectionParser(property, Ctor),
						properties = Class.properties(Ctor.prototype._ctor)
						;
					
					proto['$get /' + name] = {
						meta: {
							response: [ properties ]
						},
						process: function(){
							await(this, Ctor.fetch({}));
						}
					};
					
					var upsert = {
						meta: {
							description: 'Create or update(if _id is present) entries',
							arguments: [ properties ]
						},
						process: [
							bodyParser,
							function(req) {
								await(this, req[property].save());
							}
						]
					};
					
					proto['$put /' + name] = upsert;
					proto['$post /' + name] = upsert;
					proto['$delete /' + name] = {
						meta: {
							arguments: [ {_id: 'string'} ]
						},
						process: [
							function(req, res,params, next){
								if (Array.isArray(req.body) === false) {
									next('Invalid arguments. Array expected');
									return;
								}
								
								var imax = req.body.length,
									i = -1;
								while ( ++i < imax ){
									if (req.body[i]._id)
										continue;
									
									next('`_id` property expected at ' + i);
									return;
								}
								
								req[property] = new Ctor(req.body);
							},
							function(req) {
								await(this, req[property].del());
							}
						]
					};
					
					proto['$patch /' + name] = {
						meta: {
							description: '<is not supported>'
						},
						process: function(){
							this.reject(HttpError('`PATCH` is not supported for collections'));
						}
					};
					
					return proto;
				}
			};
			
			//////function ensureSerializable(Ctor, name){
			//////	if (Ctor.prototype.serialize && Ctor.prototype.deserialize) 
			//////		return;
			//////	
			//////	throw new Error('Class Constructor should implement `serialize/deserialize` interfaces ('
			//////		+ name
			//////		+ ')'
			//////	);
			//////}
			//////
			function await(service, instance){
				instance
					.done(service.resolveDelegate())
					.fail(service.rejectDelegate())
					;
			}
			
		}());
		// end:source CrudWrapper.js
		// source static.js
		(function() {
			var error_TITLE = '<service> Model deserialization: ';
			
			HttpService.classParser = function(name, Ctor) {
				var keys = Class.properties(Ctor);
		
				return function(req, res, params, next) {
		
					if (req.body == null){
						next('Body is not defined');
						return;
					}
					
					var error = checkProperties(req.body, keys);
					if (error != null) {
						next(error_TITLE + error);
						return;
					}
					
					
					req[name] = new Ctor(req.body);
					error = Class.validate(req[name]);
					
					if (error != null) 
						error = error_TITLE + error;
					
					next(error);
				};
			};
			
			HttpService.collectionParser = function(name, CollCtor){
				var keys = Class.properties(CollCtor.prototype._ctor);
				
				return function(req, res, params, next){
					if (Array.isArray(req.body) === false) {
						next('Array expected');
						return;
					}
					var error,
						imax = req.body.length,
						error,
						i = -1;
					while( ++i < imax ){
						
						error = checkProperties(req.body[i], keys);
						if (error != null) {
							next(error_TITLE + error);
							return;
						}
					}
					
					req[name] = new CollCtor(req.body);
					i = -1;
					while ( ++i < imax ){
						error = Class.validate(req[name][i]);
						if (error != null) {
							next(error_TITLE + error);
							return;
						}
					}
					next();
				}
			};
		
			HttpService.classPatchParser = function(name, Ctor) {
				var keys = Class.properties(Ctor);
		
				return function(req, res, params, next) {
					if (req.body == null)
						return next('Body is not defined');
		
					var $set = req.body.$set;
					if ($set) {
		
						var type,
							key,
							dot;
						for (key in $set) {
							
							dot = key.indexOf('.');
							if (dot !== -1) 
								key = key.substring(0, dot);
							
							if (keys[key] === void 0)
								return next('Unexpected property ' + key);
		
							type = typeof req.body[key];
							if (type !== 'undefined' && type !== keys[key])
									return next('Type mismatch ' + type + '/' + keys[key]);
							
						}
					}
					
					next();
				};
			}
		
			function checkProperties(obj, keys){
				var type,
					key;
				for (key in obj) {
		
					if (keys[key] === void 0)
						return 'Unexpected property ' + key;
					
		
					type = typeof obj[key];
					if (type !== 'undefined' && type !== keys[key]){
						return 'Type mismatch ' + type + '/' + keys[key];
					}
				}
				
				return null;
			}
		}());
		// end:source static.js
		
		var HttpServiceProto = Class({
			Extends: Class.Deferred,
			secure: null,
			
			Construct: function(route){
				
				if (route == null) 
					return;
				
				var pathParts = route.path,
					i = 0,
					imax = pathParts.length,
					count = 0;
				for (; i < imax; i++){
					if (typeof pathParts[i] !== 'string') 
						break;
					
					count += pathParts[i].length + 1;
				}
				
				this.rootCharCount = count;
				
				if ('secure' in route.value) {
					this.secure = route.value.secure || {};	
				}
				
			},
			help: function(){
				var routes = this.routes.routes,
					endpoints = []
					;
				
				
				var i = -1,
					imax = routes.length,
					endpoint, info, meta;
				while ( ++i < imax ){
					endpoint = routes[i];
					info = {
						method: endpoint.method || '*',
						path: endpoint.definition
					};
					
					meta = endpoint.value.meta;
					if (meta) {
						info.description = meta.description;
						info.arguments = meta.arguments;
						info.response = meta.response;
						
						if ('secure' in endpoint.value) 
							info.secure = endpoint.value.secure || true;
					}
					
					endpoints.push(info);
				}
				
				return endpoints;
			},
			process: function(req, res){
				
				var iQuery = req.url.indexOf('?');
				if (iQuery !== -1
					&& /\bhelp\b/.test(req.url.substring(iQuery))) {
					
					return this.resolve(this.help());
				}
				
				if (secure_canAccess(req, this.secure) === false) {
					return this
						.reject(SecurityError('Access Denied'));
				}
				
				var path = req.url.substring(this.rootCharCount),
					entry = this.routes.get(path, req.method);
				
				
				if (entry == null) {
					var name = this.name || '<service>',
						url = path || '/';
					return this
						.reject(NotFoundError(name
							+ ': endpoint not Found: <'
							+ req.method
							+ '> '
							+ url));
				}
					
				var endpoint = entry.value,
					meta = endpoint.meta,
					args = meta && meta.arguments
					;
				
				if (meta != null && secure_canAccess(req, meta.secure) === false) {
					return this
						.reject(SecurityError('Access Denied'));
				}
				
				if (args != null) {
					var isGet = req.method === 'GET',
						isStrict = isGet === false && meta.strict,
						body = isGet
							? entry.current.params
							: req.body
							;
					
					var error = service_validateArgs(body, args, isStrict);
					if (error) 
						return this.reject(RequestError(error));
					
				}
				
				endpoint
					.process
					.call(this, req, res, entry.current.params);
					
				return this;
			}
		});
		
		
		function HttpService(mix){
			var name, args;
			
			if (typeof mix === 'string') {
				name = mix;
				args = _Array_slice.call(arguments, 1);
			} else {
				args = _Array_slice.call(arguments);
			}
			
			var proto = endpoints_merge(args);
			
			var routes = new ruta.Collection,
				defs = proto.ruta || proto,
				path, responder, x
				;
			for (path in defs) {
				x = defs[path];
				responder = null;
				
				if (is_Function(x)) {
					responder = {
						process: x
					};
				}
				
				if (responder == null && is_Array(x)) {
					responder = {
						process: new Barricade(x)
					}
				}
				
				if (responder == null && is_Object(x)) {
					responder = x;
				}
				
				if (responder != null && is_Array(responder.process)) 
					responder.process = new Barricade(responder.process);
				
				if (responder == null || is_Function(responder.process) === false) {
					logger.warn('<HttpService> `process` is not a function'
								+ path 
								+ (typeof responder.process));
					continue;
				}
				
				routes.add(path, responder);
			}
			
			proto.routes = routes;
			if (name != null) 
				proto.name = name;
				
			if (proto.Extends == null) {
				proto.Extends = HttpServiceProto;
			} else if (Array.isArray(proto.Extends)) {
				proto.Extends.push(HttpServiceProto);
			} else {
				proto.Extends = [HttpServiceProto, proto.Extends];
			}
			
			return Class(proto);
		}
		
		HttpService.Barricade = Barricade;
		
		
		function endpoints_merge(array) {
			if (array.length === 1) 
				return array[0];
			
			var proto = array[0],
				ruta = proto.ruta || proto;
			
			var imax = array.length,
				i = 0,
				x,
				xruta;
			while ( ++i < imax ){
				x = array[i];
				xruta = x.ruta || x;
				
				for(var key in xruta){
					if (xruta[key] != null) 
						ruta[key] = xruta[key];
				}
				
				if (x.ruta == null) 
					continue;
				
				for(var key in x){
					if (key === 'ruta') 
						continue;
					
					if (x[key] != null) 
						proto[key] = x[key];
				}
			}
			
			return proto;
		}
		
		return HttpService;
	}());
	// end:source /src/HttpService/HttpService.js
	// source /src/WebSocket.js
	
	var WebSocket = (function(){
		
		var SocketListeners = {},
			doNothing = function(){}
			;
		var io;
		
		var WebSocket = {
			listen: function(httpServer) {
				this.listen = doNothing;
				
				logger.log('Web socket opened'.green.bold);
				io = require('socket.io')(httpServer, {
					'log level': 2
				});
				
				for (var key in SocketListeners) {
					io
						.of(key)
						.on('connection', createHandler(key, SocketListeners[key]));
				}
			},
			hasHandlers: function(){
				return Object.keys(SocketListeners).length !== 0;
			},
			getHandler: function(namespace) {
				return SocketListeners[namespace];
			},
			registerHandler: function(namespace, Handler){
				SocketListeners[namespace] = Handler;
				
				if (io == null) {
					if (__app != null && __app._server) {
						WebSocket.listen(__app._server);
						return;
					}
					return;
				}
				io
					.of(namespace)
					.on('connection', createHandler(namespace, Handler))
					;
			},
			of: function(namespace){
				if (io == null) 
					return null;
				
				return io.of(namespace);
			},
			clients: function(namespace){
				if (io == null) 
					return [];
				
				var nsp = io.of(namespace),
					clients = []
					;
				for(var id in nsp.connected){
					clients.push(nsp.connected[id]);
				}
				return clients;
			},
			emit: function(namespace /* ..args */){
				if (io == null) {
					console.error(
						'Emitting to the websockets (%s), but server is not started'
						, namesace
					);
					return;
				}
				var args = _Array_slice.call(arguments, 1),
					nsp = io.of(namespace);
				nsp.emit.apply(nsp, args);
			}
		};
		
		function createHandler(namespace, Handler) {
			return function(socket) {
				new Handler(socket, io);
			};
		}
		
		return WebSocket;
	}());
	
	// end:source /src/WebSocket.js
	
	// source /src/HttpApplication/Application.js
	
	(function(){
	
		// source ../Config/Config.js
		var Config = (function() {
		
			var PATH = 'server/config/**.yml',
				BUILD_PATH = 'public/build/stats.json';
		
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
			// source ConfigUtils.js
			var ConfigUtils = {
				$formatPath: PathUtils.format
			};
			
			// private
			var cfg_prepair,
				configurate_Include,
				configurate_Mask,
				configurate_Pages,
				configurate_Plugins
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
				}
				
			}());
			
			// end:source ConfigUtils.js
			// source EnvUtils.js
			var EnvUtils = (function() {
			
			
				var EnvUtils = {
			
					$getScripts: Class.Fn.memoize(function(pageID) {
						var scripts = getResources('scripts', this.env).slice();
						if (pageID)
							scripts = scripts.concat(this.$getScriptsForPageOnly(pageID));
			
						return scripts;
					}),
					
					$getScriptsForPageOnly: Class.Fn.memoize(function(pageID) {
						var page = this.pages[pageID],
							scripts = [];
			
						if (page == null) {
							logger.error('<page:scripts> Page not defined', pageID);
							return null;
						}
			
						if (page.scripts) {
							scripts = scripts.concat(getResources(
								'page',
								this.env,
								page.scripts,
								page.routes)
							);
						}
			
			
						if (page.view && page.view.controller) {
							var path = this.$formatPath(
								this.page.location.viewController,
								page.view.controller
							);
			
							scripts.push(path);
						}
			
			
						return scripts;
					}),
			
					$getStyles: function(pageID) {
			
						var cfg = this,
							styles = getResources('styles', cfg.env).slice();
			
						if (pageID)
							styles = styles.concat(this.$getStylesForPageOnly(pageID));
			
						return styles;
					},
			
					$getStylesForPageOnly: function(pageID) {
						var cfg = this,
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
							var path = this.$getCompo(page),
								resource = include.getResource(path);
							if (resource != null) {
								
								resource.includes.forEach(function(x){
									if (x.resource.type === 'css')
										styles.push(x.resource.url);
								});
							}
							
							else {
								logger
									.error('<page:styles> compo resource is undefined', path);
							}
						}
			
			
						if (page.view && page.view.style) {
							var path = this.$formatPath(
								this.page.location.viewStyle,
								page.view.style);
			
							styles.push(path);
						}
			
			
						return styles;
					},
			
					$getInclude: function() {
						var env = this.env,
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
			
					$getIncludeForPageOnly: function(pageID) {
						var page = this.pages[pageID],
							include = {};
			
						return page && page.include ? incl_extend(include, page.include) : include;
					},
			
					$getTemplate: function(pageData) {
						var template = pageData.template || this.page.index.template,
							location = this.page.location.template,
							path = this.$formatPath(location, template)
							;
						return net.Uri.combine(this.base, path);
					},
					$getMaster: function(pageData) {
						var master = pageData.master || this.page.index.master,
							location = this.page.location.master,
							path = this.$formatPath(location, master)
							;
						return net.Uri.combine(this.base, path);
					},
					$getController: function(pageData) {
						var controller = pageData.controller || this.page.index.controller;
						if (controller == null) 
							return null;
						
						var location = this.page.location.controller,
							path = this.$formatPath(location, controller)
							;
						return net.Uri.combine(this.base, path);
					},
					$getCompo: function(pageData) {
						var compo = pageData.compo;
						if (compo == null) 
							return null;
						
						var location = this.page.location.compo || this.page.location.controller,
							path = this.$formatPath(location, compo)
							;
						return net.Uri.combine(this.base, path);
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
			
			
				return EnvUtils;
			}());
			// end:source EnvUtils.js
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
				
			function Config(params, app) {
				params = params || {};
				
				var path_base = params.base,
					configs = params.configs,
					path_Build,
					appConfig;
				
				path_base = path_base == null
					? 'file://' + path_normalize(process.cwd()) + '/'
					: path_resolveSystemUrl(path_base + '/')
					;
				
				configs = cfg_prepair(path_base, configs, PATH);
				
				if (configs)
					// if `configs` null, do not load also build values
					path_Build = path_base + (params.buildDirectory || BUILD_PATH);
				
				if (params.config) 
					appConfig = { config: params.config };
				
				
				var $sources = [
					{
						config: JSON.parse(__cfgDefaults)
					},
					path_Build
						? {
							path: path_Build,
							optional: true
						}
						: null,
					{
						config: ConfigUtils
					},
					{
						path: 'package.json',
						getterProperty: 'atma',
						optional: true
					},
					{
						config: EnvUtils
					},
					appConfig
				];
				
				if (configs) {
					$sources = $sources.concat(configs);
				}
				
				if (Array.isArray(params.sources)) 
					$sources = $sources.concat(params.sources);
				
				// do not allow to override `base` option in configuration.
				$sources.push({
					config: {
						base: path_base
					}
				});
				
				return require('appcfg')
					.fetch($sources)
					.fail(function(error){
						throw new Error('<app:configuration>', error);
					})
					.done(function() {
					
					var cfg = this;
					cfg.defer();
					
					new Class.Await(
						configurate_Mask(cfg),
						configurate_Include(cfg),
						configurate_Pages(cfg, app),
						configurate_Plugins(cfg, app)
					)
					.always(function(){
						cfg.resolve();
					});
				});
			}
		
			return Config;
		}());
		// end:source ../Config/Config.js
		// source SubApp.js
		server.HttpSubApplication = (function(){
		    
		    var status_initial = '',
		        status_loading = 'loading',
		        status_loaded = 'loaded',
		        status_errored = 'error'
		        ;
		    
		    return Class({
		        status: status_initial,
		        app_: null,
		        Construct: function(path, data, parentApp){
		            
		            if (path[0] !== '/') 
		                path = '/' + path;
		            
		            if (path[path.length - 1] !== '/') 
		                path += '/';
		            
		            this.path_ = path;
		            this.dfr = new Class.Deferred;
		            
		            if (data instanceof server.Application) {
		                this.app_ = data;
		                this.status = status_loaded;
		                return;
		            }
		            
		            var controller = data.controller || data,
		                that = this;
		                
		            if (is_String(controller)) {
		                this.status = status_loading;
		                
		                var base = parentApp.config.base || parentApp.base || '/';
		                include
		                    .instance(base)
		                    .setBase(base)
		                    .js(controller + '::App')
		                    .done(function(resp){
		                        
		                        if (resp.App instanceof server.Application) {
		                            
		                            resp
		                                .App
		                                .done(function(app){
		                                    that.app_ = app;
		                                    that.process = that.pipe;
		                                    that.status = status_loaded;
		                                    that.dfr.resolve();
		                                });
		                            
		                            return;
		                        }
		                        that.status = status_errored;
		                    });
		                    
		                return;
		            }
		            
		            var configs = data.configs,
		                config = data.config
		                ;
		            
		            if (config == null && configs == null) 
		                configs = path;
		            
		            this.status = status_loading;
		            server
		                .Application({
		                    configs: configs,
		                    config: config
		                })
		                .done(function(app){
		                    that.app_ = app;
		                    that.process = that.pipe
		                    that.status = status_loaded;
		                    that.dfr.resolve();
		                });
		        },
		        
		        process: function(req, res){
		            if (this.status === status_loading) {
		                this
		                    .dfr
		                    .done(this.pipe.bind(this, req, res));
		                return;
		            }
		            
		            if (this.status === status_loaded) {
		                this.pipe(req, res);
		                return;
		            }
		            
		            res.writeHead(500, {
		                'Content-Type': 'text/plain'
		            });
		            res.end('<Sub Application Errored> ' + this.path_);
		        },
		        
		        pipe: function(req, res){
		            
		            if (req.url.length < this.path_.length) {
		                
		                res.writeHead(301, {
		                    'Location': this.path_
		                });
		                res.end();
		                return;
		            }
		            
		            req.url = req.url.replace(this.path_, '/');
		            
		            this.app_.process(req, res);
		        }
		    });
		
		}());
		// end:source SubApp.js
		// source Message.js
		var Message = {};
		(function(){
			
			/*
			 * Very basic implementation of ClientRequest and -Response.
			 * Is used when not the socket but direct request is made
			 *
			 * app
			 * 	.execute('service/user/foo', 'get')
			 * 	.done(function(obj:Any))
			 * 	.fail(function(err))
			 */
			
			Message.Request = Class({
				Construct: function(url, method, body, headers){
					this.url = url;
					this.method = (method || 'GET').toUpperCase();
					this.body = body;
					this.headers = headers;
				}
			});
			
			Message.Response = Class({
				Extends: [
					Class.EventEmitter,			
					Class.Deferred
				],
				writable: true,
				finished: false,
				statusCode: null,
				Construct: function(){
					this.body = '';
					this.headers = {};
				},
				Override: {
					resolve: function(body, code, mimeType, headers){
						this.super(
							body || this.body,
							code || this.statusCode || 200,
							mimeType,
							headers || this.headers
						);
					},
					reject: function(error, code){
						this.super(
							error || this.body,
							code || error.statusCode || this.statusCode || 500
						);
					}
				},
				writeHead: function(code){
					if (this.writable === false) 
						return;
					
					var reason, headers;
					if (3 === arguments.length) {
						reason = arguments[1];
						headers = arguments[2];
					}
					if (2 === arguments.length) {
						headers = arguments[1];
					}
					
					this.statusCode = code;
					obj_extend(this.headers, headers);
				},
				end: function(content){
					if (this.finished === true) 
						return;
					
					this.write(content);
					this.finished = true;
					this.writable = false;
					this.resolve(this.body, this.statusCode, null, this.headers)
				},
				/*
				 * support String|Buffer|Object
				 */
				write: function(content){
					if (this.writable === false) 
						return;
					if (content == null) 
						return;
					if (this.body == null) {
						this.body = content;
						return;
					}
					
					if (is_Function(this.body.concat)) {
						this.body = this.body.concat(content);
						return;
					}
					
					this.body = [ this.body, content];
				}
			});
			
		}());
		// end:source Message.js
	
		server.Application = Class({
			Extends: Class.Deferred,
			
			// <Boolean>, if instance is the root application, and not one of the subapps
			isRoot: false,
			
			// <HandlerFactory>, stores all endpoints of this application
			handlers: null,
			
			// <http.Server> , in case `listen` was called.
			_server: null,
			
			// run this middlewares when the endpoint is found. (Runs before the endpoint handler)
			_innerPipe: null,
			
			// run this middlewares by all requests. Conains also endpoint resolver
			_outerPipe: null,
			
			//@obsolete
			_responder: null,
			_responders: null,
			middleware: null,
			
			// Loaded server scripts from `config.env.scripts` and `config.env.both`
			resources: null,
			
			// Stores all exports from `resources`
			lib: null,
			
			Construct: function(proto){
				if (proto == null) 
					proto = {};
				
				if (this instanceof server.Application === false) 
					return new server.Application(proto);
				
				
				// if a root application
				if (__app == null) 
					__app = this;
				
				this.isRoot = this === __app;
				this.handlers = new HandlerFactory(this);
				this.args = obj_extend(proto.args, cli_arguments());
				
				this._baseConfig = proto;
				this._loadConfig();
				
				if (this.isRoot && app_isDebug() !== true) 
					logger.cfg('color', 'none');
				
				this.process = this.process.bind(this);
				return this;
			},
			
			//@obsolete
			respond: function(req, res, next){
				this.process(req, res, next);
			},
			//@obsolete
			responder: function(data){
				this._innerPipe = MiddlewareRunner.create(data && data.middleware);
				return responder(this);
			},
			
			//> Generic HttpServer scenario, responder should be also used in the middleware
			//@obsolete
			responders: function(array){
				this._outerPipe = new MiddlewareRunner(array);
			},
			
			/**
			 * :before - Array|Function - Middleware fns in OUTER pipe, before main responder
			 * :middleware - Arrat|Function - Middleware fns in INNER pipe, before the Handler
			 * :after - Array|Function - Middlewarefns in OUTER pipe, after the Handler
			 */
			processor: function(data){
				data = data || {};
				
				var before = data.before,
					after = data.after,
					middleware = data.middleware;
					
				this._outerPipe = MiddlewareRunner.create(before || []);
				this._innerPipe = MiddlewareRunner.create(middleware);
				
				this._outerPipe.add(responder(this));
				this._outerPipe.add(after);
				
				return this.process;
			},
			process: function(req, res, next){
				if (this._outerPipe == null) 
					this.processor();
				
				this._outerPipe.process(
					req
					, res
					, next || response_notProcessed
					, this.config
				);
			},
			//process: function(req, res, next){
			//	
			//	if (this._responders == null) {
			//		this.responders([
			//			this.responder()
			//		]);
			//	}
			//	
			//	this._responders.process(
			//		req,
			//		res,
			//		next || response_notProcessed,
			//		this.config
			//	);
			//},
			execute: function(url, method, body, headers){
				var req = new Message.Request(url, method, body, headers),
					res = new Message.Response;
				
				// @TODO ? middleware pipeline in RAW requests
				//this._responders.process(
				//	req,
				//	res,
				//	respond,
				//	this.config
				//);
				//function respond() {
				//	responder_Raw(req, res);
				//}
				respond_Raw(this, req, res);
				return res;
			},
			webSockets: WebSocket,
			autoreload: function(httpServer){
				this._server = this._server || httpServer;
				return Autoreload.enable(this);
			},
			listen: function(){
				var port, server;
				var i = arguments.length,
					mix;
				while (--i > -1){
					mix = arguments[i];
					if (typeof mix === 'number') {
						port = mix;
						continue;
					}
					if (mix != null && mix.listen) {
						server = mix;
						continue;
					}
				}
				if (port == null) 
					port = this.config.$get('port');
				
				if (server == null)
					server = require('http').createServer();
				
				this._server = server
					.on('request', this.process)
					.listen(port)
					;
				
				if (WebSocket.hasHandlers()) 
					WebSocket.listen(this._server);
				
				return this._server;
			},
			getSubApp: function(path){
				var route = this.handlers.subapps.get(path);
				
				return route && route.value && route.value.app_;
			},
			
			Self: {
				_loadConfig: function(){
					
					var proto = this._baseConfig;
					
					this.config = Config(proto, this);
					this
						.config
						.done(cfg_doneDelegate(this))
						.fail(function(error){
							
							logger
								.warn('Configuration Error')
								.error(error);
						})
						;
					return this;
				}
			}
		});
		
		
		function responder(app) {
			return function (req, res, next){
				
				if (Autoreload.enabled) 
					Autoreload.watch(req.url);
				
				var callback = app._innerPipe != null
					? middleware_processDelegate(app._innerPipe)
					: handler_process
					;
				
				if (next == null) 
					next = fn_delegate(response_notProcessed, null, req, res);
				
				handler_resolve(
					app,
					req,
					res,
					next,
					callback
				);
			}
		}
		function respond_Raw(app, req, res) {
			handler_resolve(
				app, req, res, null, handler_processRaw
			);
		}
		function middleware_processDelegate(middlewareRunner){
			return function(app, handler, req, res){
				
				middlewareRunner.process(req, res, done, app.config);
				function done(error){
					if (error) {
						send_Error(res, error);
						return;
					}
					handler_process(app, handler, req, res);
				}
			};
		}
		
		function handler_resolve(app, req, res, next, callback){
			//++ moved resource loading into inner function
			app
				.handlers
				.get(app, req, function(handler){
					
					if (handler == null) 
						return next();
					
					resources_load(app, function(){
						callback(app, handler, req, res);
					});
				});
			
		}
		function handler_process(app, handler, req, res) {
			logger(95)
				.log('<request>', req.url);
			
			var config = app.config;
			handler
				.process(req, res, config);
				
			if (handler.done == null)
				// Handler responds to the request itself
				return;
			
			handler
				.done(function(content, statusCode, mimeType, headers){
					var send = handler.send || send_Content;
					send(res, content, statusCode, mimeType, headers);
				})
				.fail(function(error, statusCode){
					var send = handler.sendError || send_Error;
					send(res, error, statusCode || 500, config);
				});
		}
		function handler_processRaw(app, handler, m_req, m_res) {
			handler
				.process(m_req, m_res, app.config)
			if (handler.done == null) 
				return;
			handler.pipe(m_res);
		}
		
		
		
		function cfg_doneDelegate(app) {
			return function() {
				
				var cfg = app.config;	
				logger(90)
					.log('<app.config>', cfg);
				
				initilizeEmbeddedComponents(app);
				
				app
					.handlers
					.registerPages(cfg.pages, cfg.page)
					.registerSubApps(cfg.subapps, cfg.subapp)
					.registerHandlers(cfg.handlers, cfg.handler)
					.registerServices(cfg.services, cfg.service)
					.registerWebsockets(cfg.websockets, cfg.websocket)
					;
					
				if (app_isDebug()) 
					include.cfg('autoreload', true);
				
				resources_load(app, function(){
					app.resolve(app);
				});
			}
		}
		
		function resources_load(app, callback) {
			if (app_isDebug() !== true && app.resources != null) {
				callback();
				return;
			}
			
			var config = app.config,
				base = config.base,
				env = config.env
				;
			
			app.resources = include
				.instance(base)
				.setBase(base)
				.js(env.server.scripts)
				.js(env.both.scripts)
				;
			app
				.resources
				.done(function(resp){
					app.lib = resp;
					
					if (config.projects) {
						config
							.projects
							.forEach(function(name){
								var res = resp[name];
								if (res != null && typeof res.attach === 'function')
									res.attach(app);
							});
					}
					
					callback();
				});
		}
		
		//@deprecate
		function resource_loadEmpty(app, callback){
			callback();
		}
		
		function response_notProcessed(error, req, res){
			if (error == null)
				error = HttpError('Request not handled: ' + req.url, 404);
			
			send_Error(res, error);
		}
		
	}());
	// end:source /src/HttpApplication/Application.js
	
	// source /src/loader/coffee.js
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
	// end:source /src/loader/coffee.js
	// source /src/loader/less.js
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
	// end:source /src/loader/less.js
	// source /src/loader/yml.js
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
	// end:source /src/loader/yml.js
	
	// source /src/Autoreload/autoreload.js
	var Autoreload;
	(function(){
	    Autoreload = {
			enabled: false,
			enable: function(app){
	            this.enabled = true;
	            WebSocket.registerHandler('/browser', ConnectionSocket);
	            
	            var configs = new io.Directory('server/config/');
	            if (configs.exists()) 
	                configs.watch(reloadConfigDelegate(app));
	            
				include.cfg('autoreload', this);
	            
	            return this;
	        },
	        
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
	            
				if (/\.[\w]+$/.test(requestedUrl) === false) {
					// no extension
					return;
				}
	            
	            var uri = rootUri.combine(requestedUrl),
	                file = new io.File(uri);
	            
	           this.watchFile(file);
			},
			watchFile: function(file){
				if (!(file.uri && file.uri.file))
					// virtual file?
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
	        
	        fileChanged: function(path, sender){
	            
	            WatcherHandler.fileChanged(path, sender);
	        },
	        
	        isWatching: function(file){
	            if (typeof file === 'string') 
	                file = new io.File(file);
	            
	            return WatcherHandler.isWatching(file);
	        },
	        
	        listenDirectory: function(dir, callback){
	            new io
	                .Directory(dir)
	                .watch(callback)
	                ;
	        },
	        
	        getWatcher: function(){
	            return WatcherHandler;
	        }
	    };
	
	    // source WatcherHandler.js
	    var WatcherHandler;
	    (function(){
	        
	        WatcherHandler = new (Class({
	            Base: Class.EventEmitter,
	            
	            watch: function(file){
	                var path = file.uri.toString();
	                
	                if (_watchers[path] != null) 
	                    return;
	                
	                var watcher
	                watcher = new FileWatcher(path);
	                watcher.bind(this.fileChanged);
	                
	                _watchers[path] = watcher;
	            },
	            unwatch: function(file, callback){
	                var path = file.uri.toString();
	                
	                if (_watchers[path] == null) {
	                    logger.log('<watcher> No watchers', path);
	                    return
	                }
	                
	                _watchers[path].unbind(callback);
	                
	                delete _watchers[path];
	            },
	            
	            isWatching: function(file){
	                var path = file.uri.toString();
	                
	                return _watchers[path] != null;
	            },
	            Self: {
	                fileChanged: function(path, sender){
	                    
	                    if (sender === 'filewatcher') {
	                        var rel = '/' + path.replace(rootFolder, '');
	                        
	                        if (include.getResource(rel) == null) 
	                            this.trigger('fileChange', rel, path);
	                        
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
	                
	                return this
	                    .on('fileChange', callback);
	            },
	            unbind: function(callback){
	                
	                return this
	                    .off('fileChange', callback);
	            }
	        }));
	        
	        var rootFolder = path_normalize(process.cwd() + '/');
	        
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
	                    .watcher
	                    .watch(this.file.uri.toLocalFile(), this.fileChanged);
	                    
	                this.active = true;
	            },
	            unbind: function(callback) {
	                this.off('fileChange', callback);
	                
	                if (this._listeners.length === 0) {
	                    io
	                        .watcher
	                        .unwatch(this.file.uri.toLocalFile());
	                }
	            }
	        });
	        
	       
	        
	        var _watchers = {};
	       
	        
	    }());
	    // end:source WatcherHandler.js
	    // source Connection.js
	    
	    
	    var ConnectionSocket = Class({
	        Construct: function(socket) {
	            
	            logger.log('<autoreload> Socket connected');
	            this.socket = socket;
	    
	            socket.on('disconnect', this.disconnected);
	    
	            WatcherHandler.on('fileChange', this.fileChanged);
	        },
	        Self: {
	            fileChanged: function(path) {
	                var socket = this.socket;
	                setTimeout(function(){
	                    logger.log('<autoreload sockets> path', path);
	                    socket.emit('filechange', path);
	                }, 50);   
	            },
	            disconnected: function() {
	                WatcherHandler.off('fileChange', this.fileChanged);
	            }
	        }
	    });
	    
	    // end:source Connection.js
	    
	    var rootUri = new net.Uri(process.cwd() + '/');
	        
	    function reloadConfigDelegate(app){
	        
	        return function(path){
	            app
	                .defer()
	                ._loadConfig()
	                .done(function(){
	                    
	                    Autoreload.fileChanged(path);
	                })
	                ;
	        };
	    }
	    
	    
	}());
	
	// end:source /src/Autoreload/autoreload.js
	// source /src/Plugins/exports.js
	var Plugins = {};
	(function(){
		
		// source Static.js
		var Static;
		(function(){
			
			obj_lazyProperty(server, 'StaticContent', function(){
				return initialize();
			});
		
			var _staticContent;
			function initialize(){
				_staticContent = require('static-content');
				
				if (app_isDebug()) {
					_staticContent.on('file', function(file){
						Autoreload.watchFile(file)
					});
				}
				return _staticContent;
			}
			Autoreload.getWatcher().on('fileChange', function(path, f){
				if (_staticContent == null) 
					return;
				
				_staticContent.Cache.remove(f);
			})
		}());
		// end:source Static.js
		
	}());
	// end:source /src/Plugins/exports.js
	// source /src/middleware/middleware.js
	server.middleware = {};
	
	// source ./query.js
	(function(){
		
		server.middleware['query'] = function(req, res, next){
			
			var url = req.url,
				q = url.indexOf('?');
			
			req.query = q === -1
				? {}
				: deserialize(url.substring(q + 1));
				
			next();
		};
		
		var deserialize = ruta.$utils.query.deserialize;
	}());
	// end:source ./query.js
	// source ./static.js
	(function(){
		server.middleware['static'] = Static;
		
		function Static(req, res, next, config){
			if (responder == null) 
				responder = server.StaticContent.respond
			
			responder(req, res, next, config);
		};
		
		Static.config = function(config){
			return (responder = server.StaticContent.create(config));
		}
		
		var responder;
	}());
	// end:source ./static.js
	// end:source /src/middleware/middleware.js
	
	
	// source /src/compos/exports.js
	
	function initilizeEmbeddedComponents(app) {
		initilizeEmbeddedComponents = function(){};
		
		// source styles/styles.js
		
		(function(){
			var	DEBUG = app.config.debug || app.config.$get('app.debug'),
				template = "each (.) > link type='text/css' rel='stylesheet' href='~[.]';"
				;
				
			mask.registerHandler('atma:styles', Class({
				mode: 'server:all',
				nodes: mask.parse(template),
				cache: {
					byProperty: DEBUG && 'ctx.page.id'
				},
				renderStart: function(model, ctx){
					
					this.model = DEBUG
						? ctx.config.$getStyles(ctx.page.data.id)
						: getStyles(app, ctx)
						;
				}
			}));
			
			
			function getStyles(app, ctx) {
				if (ctx.config.build == null) {
					logger
						.error('<Application is not built>')
						.warn('To execute the DEV version use `--debug` flag: `node index --debug`'.bold)
						.warn('To build the application run `atma custom node_modules/atma-server/tools/build`')
						;
						
					return;
				}
				
				var array = ['/public/build/styles.css'];
				
				var pageData = ctx.page.data,
					id = pageData.id,
					data = ctx.config.build[id];
					
							
				if (data.styles) 
					array
						.push('/public/build/' + id  + '/styles.css');
				
				return array;
			}
			
		}());
		// end:source styles/styles.js
		// source scripts/scripts.js	
		
		(function(){
			
			// source prod.js
			var Prod_Sctipts;
			(function(){
				
				var build_DIR = '/public/build/',
					Template = [
						// source:string prod.mask
			"			\n\n			if (load) >\n\n				:html > '~[load]'\n\n			\n\n					\n\n					\n\n			script\n\n				src='/public/build/scripts.js?v=~[buildVersion]'\n\n				type='text/javascript'\n\n				;\n\n			\n\n			if (pageId) >\n\n				script\n\n					src='/public/build/~[pageId]/scripts.js?v=~[buildVersion]'\n\n					type='text/javascript'\n\n					;\n\n			\n\n			\n\n			\n\n			script type='text/javascript' > :html > '''\n\n				\n\n					include\n\n						.allDone(function(){\n\n							var App = Compo({ compos: {} });\n\n								\n\n							window.app = new App;\n\n							\n\n							mask.Compo.bootstrap(document.body, app);\n\n						})\n\n						;\n\n			'''"
						// end:source:string prod.mask
					][0];
				
			
				Prod_Sctipts = Compo({
					mode: 'server:all',
					template: Template,
					cache: {
						byProperty: 'ctx.page.id'
					},
					onRenderStart: function(model, ctx){
						
						if (ctx.config.build == null) {
							logger
								.error('<Application is not built>')
								.warn('To execute the DEV version use `--debug` flag: `node index --debug`'.bold)
								.warn('To build the application run `atma custom node_modules/atma-server/tools/build`')
								;
								
							return;
						}
						
						var pageData = ctx.page.data,
							id = pageData.id,
							data = ctx.config.build[id],
							that = this;
						
						this.model = {
							buildVersion: ctx.config.buildVersion
						};
						
						if (data == null) {
							logger.error('<atma:scripts> No page info',
								id,
								'Build could be faily'
							);
							return;
						}
						
						Compo.pause(this, ctx);
						
						var base = ctx.config.base,
							load = [net.Uri.combine(base, build_DIR, 'load.html::app')];
						if (id && data.load)
							load.push(net.Uri.combine(base, build_DIR, id, 'load.html::page'));
						
						
						include
							.instance()
							.load(load)
							.done(function(resp){
								
								var loadedData = resp.load.app;
								if (resp.load.page) 
									loadedData += resp.load.page;
								
								that.model.load = loadedData;
								Compo.resume(that, ctx);
							});
						
					}
				});		
			}());
			
			// end:source prod.js
			// source dev.js
			
			var Dev_Scripts;
			(function(){
				
				var Template = [
					// source:string dev.html
			"		\n\n		<script type='text/javascript' src='%INCLUDE%'></script>\n\n		<script type='text/javascript'>\n\n			window.DEBUG = true;\n\n			\n\n			include\n\n				.cfg(%CFG%)\n\n				.routes(%ROUTES%)\n\n				.js(%SCRIPTS%)\n\n				.done(function(){\n\n					\n\n					var start = new Date(),\n\n						App = Compo({\n\n							compos: {}\n\n						});\n\n						\n\n						\n\n					window.app = new App;\n\n					\n\n					\n\n					mask.Compo.bootstrap(document.body, app);\n\n					\n\n					console.log('Render - ', new Date() - start);\n\n				});\n\n			\n\n		</script>"
					// end:source:string dev.html
				][0];
				
				Dev_Scripts = Compo({
					mode: 'server:all',
					
					scripts: null,
					renderStart: function(model, ctx){
						
						this.include = ctx
							.config
							.$getInclude();
						
						this.scripts = ctx
							.config
							.$getScripts(ctx.page.data.id)
							.map(function(x, index){
								return "'" + x + "'";
							})
							.join(',\n');
							
					},
					toHtml: function(){
						return Template
							.replace('%CFG%', JSON.stringify(this.include.cfg, null, 4))
							.replace('%ROUTES%', JSON.stringify(this.include.routes, null, 4))
							.replace('%INCLUDE%', this.include.src)
							.replace('%SCRIPTS%', this.scripts)
							;
					}
				});
			}());
			// end:source dev.js
			
			
			
			var Handler = app.config.debug || app.config.$get('app.debug')
				? Dev_Scripts
				: Prod_Sctipts
				;
			mask.registerHandler('atma:scripts', Handler);
		}());
		
		// end:source scripts/scripts.js	
	}
	// end:source /src/compos/exports.js
	
	__cfgDefaults = [
		// source cfg-defaults.json
		"{\"env\":{\"both\":{\"include\":{\"cfg\":null		},\"routes\":{\"public\":\"/public/script/{0}.js\",\"public_compo\":\"/public/compo/{0}/{1}.js\",\"atma\":\"/.reference/atma/{0}/lib/{1}.js\",\"atma_compo\":\"/.reference/atma/compos/{0}/lib/{1}.js\",\"view\":\"/public/view/{0}/{1}.js\"},\"scripts\":null		},\"client\":{\"include\":{\"src\":\"/.reference/atma/include/lib/include.js\"},\"scripts\":null		,\"styles\":null		,\"routes\":null		},\"server\":{\"routes\":{\"server\":\"/server/{0}.js\",\"server_lib\":\"/server/lib/{0}.js\",\"server_compo\":\"/server/compo/{0}/{1}.js\"},\"scripts\":null		}},\"handler\":{\"location\":\"/server/http/handler/{0}.js\"},\"handlers\":null		,\"mask\":{\"compos\":{\":scripts\":{\"mode\":\"server:all\"},\":styles\":{\"mode\":\"server:all\"},\":template\":{\"mode\":\"server\"},\"layout:master\":{\"mode\":\"server\"},\"layout:view\":{\"mode\":\"server\"},\":animation\":{\"mode\":\"client\"}},\"attributes\":null		},\"page\":{\"location\":{\"controller\":\"/server/http/page/{0}/{1}.js\",\"template\":\"/server/http/page/{0}/{1}.mask\",\"master\":\"/server/http/master/{0}.mask\",\"viewTemplate\":\"/public/view/{0}/{1}.mask\",\"viewController\":\"/public/view/{0}/{1}.js\",\"viewStyle\":\"/public/view/{0}/{1}.less\"},\"extension\":{\"javascript\":\"js\",\"style\":\"less\",\"template\":\"mask\"},\"index\":{\"template\":\"index\",\"master\":\"default\"},\"urls\":{\"login\":\"/login\"}},\"pages\":{\"/\":{\"id\":\"index\",\"title\":\"Default Title\"}},\"service\":{\"location\":\"/server/http/service/{0}.js\"},\"services\":null		,\"view\":{\"location\":{\"template\":\"/public/view/{0}/{1}.mask\",\"controller\":\"/public/view/{0}/{1}.js\",\"style\":\"/public/view/{0}/{1}.less\"}},\"websocket\":{\"location\":\"/server/http/websocket/{0}.js\"},\"websockets\":null		}"
		// end:source cfg-defaults.json
	][0];
	
	
	if (exports.atma != null && typeof exports.atma === 'object') {
		if (exports.atma.server) {
			obj_extend(exports.atma.server, server);
			return;
		}
		exports.atma.server = server;
		return;
	}
	
	
	exports.atma = {
		server: server
	};
	
}));