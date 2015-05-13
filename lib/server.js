(function(root, factory){
	"use strict";
	
	factory(global, global);
	module.exports = global.atma.server;
	
}(this, function(global, exports){
	"use strict";
	
	var server = {};
	
	var __app,
		__cfgDefaults;
	
	// source /src/dependency.js
	var atma,
	    io,
	    net,
	    Class,
	    ruta,
	    mask,
	    jmask,
	    Compo,
	    include,
	    includeLib,
	    Routes,
	    Log,
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
	
	if (logger == null) 
	    logger = require('atma-logger')
	
	// io
	if (global.io && global.io.File) 
	    io = global.io;
	
	if (io == null) 
	    io = require('atma-io');
	
	
	net         = atma.net;
	Class       = atma.Class;
	ruta        = atma.ruta;
	mask        = atma.mask;
	jmask       = mask.jmask;
	Compo       = mask.Compo;
	include     = atma.include;
	includeLib  = atma.includeLib;
	Routes      = ruta.Collection;
	Log         = logger('atma-server');
	
	// end:source /src/dependency.js
	// source /src/vars.js
	var _Array_slice = Array.prototype.slice,
		LIB_DIR = new net.Uri('file://' + __dirname + '/')
		;
	// end:source /src/vars.js
	
	
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
			if (error instanceof HttpError === false) {
				error = HttpError.create(error);
			}
			send_Content(
				res
				, JSON.stringify(error)
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
			Base: Error,
			_error: null,
			_json: null,
			Construct: function(message, statusCode){
				
				if (this instanceof HttpError === false) 
					return new HttpError(message, statusCode);
				
				this._error = Error(message);
				this.message = String(message);
				
				if (statusCode != null) 
					this.statusCode = statusCode;
			},
			name: 'HttpError',
			statusCode: 500,
			get stack() {
				if (this._error == null) 
					return;
				
				var stack = this._error.stack.split('\n'),
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
			},
			toJSON: function(){
				if (this._json != null) 
					return this._json;
				
				return {
					name: this.name,
					error: this.message,
					code: this.statusCode
				};
			},
			Static: {
				create: function(mix, statusCode){
					if (is_String(mix)) 
						return HttpError(mix, statusCode);
					
					if (mix._error != null) /* instanceof HttpError (weakness of instanceof)*/ 
						return mix;
					
					if (mix instanceof Error) {
						var error = HttpError(mix.message, statusCode || 500);
						error._error = mix;
						return error;
					}
					
					if (is_Object(mix)) {
						if (mix.toString !== _obj_toString) {
							return HttpError(
								mix.toString() , statusCode || mix.statusCode || mix.status
							);
						}
						var msg = mix.message,
							code = statusCode || mix.statusCode || mix.status,
							error;
						
						error = HttpError(msg, code);
						error._json = mix;
						return error;
					}
					return RuntimeError('Invalid error object: ' + mix);
				}
			}
		});
		
		RequestError = createError('RequestError'	, 400);
		SecurityError = createError('SecurityError'	, 403);
		NotFoundError = createError('NotFoundError'	, 404);
		RuntimeError = createError('RuntimeError'	, 500);
		
		
		// PRIVATE
		
		var _obj_toString = Object.prototype.toString;
		
		function createError(id, code) {
			var Ctor = server[id] = Class({
				Base: HttpError,
				Construct: function(){
					
					if (this instanceof Ctor === false) {
						var arguments_ = [null].concat(_Array_slice.call(arguments));
						return new (Ctor.bind.apply(Ctor, arguments_));
					}
					
				},
				statusCode: code,
				name: id
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
				var socket = this.app.webSockets;
				if (is_String(handler)) {
					var path = handler_path(handler, handlerCfg);
					include
						.instance()
						.js(handler + '::Handler')
						.done(function(resp){
							
							socket.registerHandler(namespace, resp.Handler);
						});
					return;
				}
				socket.registerHandler(namespace, handler);
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
		
		// source ./page-utils.js
		var page_Create,
			page_rewriteDelegate,
			page_proccessRequest,
			page_proccessRequestDelegate,
			page_resolve,
			
			page_pathAddAlias,
			
			page_process,
			page_processPartial,
			
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
						.process(ctx.req, ctx.res, ctx.config)
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
				if ('redirect' in page.data) {
					page.ctx.redirect(page.data.redirect);
					return page;
				}
				if ('rewrite' in page.data) {
					req.url = page.data.rewrite;
					page.app.handlers.get(page.app, req, page_rewriteDelegate(page));
					return page;
				}
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
			
			page_process = function(page, nodes, onSuccess){
				mask
					.renderAsync(
						nodes,
						page.model,
						page.ctx,
						null,
						page
					)
					.done(function(html){
						if (page.ctx._rewrite != null) {
							__app
								.handlers
								.get(page.ctx._rewrite, page_rewriteDelegate(page));
							return;
						}
						onSuccess(html);
					})
					.fail(page.rejectDelegate());
			};
			(function(){
				page_processPartial = function(page, nodes, selectors){
					nodes = __getTemplate(page, nodes, selectors);
					
					__getResources(page, page.ctx.config, function(meta){
						
						if (meta.templates) {
							var node = jmask(':html').text(meta.templates);
							nodes.push(node);
						}
						
						page_process(page, nodes, function(html){
							var json = {
								type: 'partial',
								html: html,
								scripts: meta.scripts,
								styles: meta.styles
							};
							page_resolve(page
								, json
								, 'application/json'
								, 200
							);
						});
					});
				};
				function __getTemplate(page, nodes, selector){
					var arr = [],
						selectors = selector.split(';'),
						imax = selectors.length,
						i = -1,
						x;
					while(++i < imax){
						selector = selectors[i];
						if (selector === '') 
							continue;
						
						x = jmask(nodes).find(selector);
						if (x == null) {
							logger.warn('<HttpPage.partial> Not found `%s`', selectors[i]);
							continue;
						}
						arr.push(x);
					}
					return arr;
				}
				function __getResources(page, config, cb){
					if (Scripts == null) 
						Scripts = mask.getHandler('atma:scripts');
					
					if (Styles == null) 
						Styles = mask.getHandler('atma:styles');
					
					var styles = Styles.getModel(page, config, true)
					
					Scripts.getModel(page, config, true, function(scripts){
						cb({
							scripts: scripts.scripts,
							styles: styles
						});
					})
				}
				
				var Scripts, Styles;
			}());
			
			
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
		
		// end:source ./page-utils.js
		// source ./Resources.js	
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
		// end:source ./Resources.js	
		// source ./HttpContext.js
		
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
		};
		
		// end:source ./HttpContext.js
		// source ./HttpErrorPage.js
		var HttpErrorPage = server.HttpErrorPage = Class({
				
				Extends: [
					Class.Deferred,
					Resources
				],
				
				template: null,
				master: null,
				
				ctx: null,
				
				templatePath: null,
				masterPath: null,
				
				route: null,
				query: null,
				model: null,
				
				Construct: function(error, pageData, config){
					this._setPageData(pageData, config);
					this.model = error;
				},
				_setPageData: function(data, cfg){
					this.data = data;
					
					if (data.masterPath != null) 
						this.masterPath = data.masterPath;
					
					if (data.templatePath != null) 
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
				Static: {
					send: function(error, req, res, config){
						var pageCfg = config.page,
							errorPages = pageCfg.errors,
							genericPage = pageCfg.error
							;
							
						var pageData = (errorPages && errorPages[error.statusCode]) || genericPage;
						if (pageData == null) {
							pageData = {
								masterPath: '',
								templatePath:  LIB_DIR.combine('../pages/error/error.mask').toString()
							};
						}
						
						return new HttpErrorPage(error, pageData, config).process(req, res, config);
					}
				},
				process: function(req, res, config){
					this
						.done(pageError_sendDelegate(res, this.model))
						.fail(pageError_failDelegate(res, this.model))
						;
					page_proccessRequest(this, req, res, config);
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
						nodes = this.nodes || template
						;
					if (master == null && this.masterPath !== '') {
						this.reject(HttpError('Page: Masterpage not found'));
						return;
					}
					
					if (nodes == null) {
						this.reject(HttpError('Page: Template not found'));
						return;
					}
					
					if (master) 
						mask.render(mask.parse(master));
					
					page_process(
						this
						, nodes
						, fn_delegate(page_resolve, this)
					);
				}
			
			});
		// end:source ./HttpErrorPage.js
		
		var Page = Class({
			
			Extends: [
				Class.Deferred,
				Resources
			],
			
			template: null,
			master: null,
			
			app: null,
			ctx: null,
			middleware: null,
			
			templatePath: null,
			masterPath: null,
			compoPath: null,
			
			route: null,
			query: null,
			model: null,
			
			send: null,
			
			// Page information contianer (got from configuration)
			data: {
				id: null
			},
			
			Construct: function(mix, app){
				
				if (this instanceof Page === false) 
					return page_Create(mix);
				
				if (mix == null) 
					return this;
				
				var route = mix;
				if (route.value == null) {
					logger.error(
						'<HttpPage> Route value is undefined'
					);
					return this;
				}
				
				var cfg = app.config,
					data = route.value;
				
				this.app = app;
				this.route = cfg.page.route;
				this.query = route.current && route.current.params;
				this._setPageData(data, cfg);
				
				return this;
			},
			_setPageData: function(data, cfg){
				this.data = data;
				
				if (data.masterPath != null) 
					this.masterPath = data.masterPath;
				
				if (data.templatePath != null) 
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
			
			sendError: function(error, req, res, config){
				HttpErrorPage.send(error, req, res, config);
			},
			
			_load: function(){
				
				var env = this.data.env,
					env_server,
					env_both;
				if (env != null) {
					env_both = env.both;
					env_server = env.server;
				}
				var base = this.ctx.config.base,
					parent = this.app.resources;
				this.resource = include
					.instance(base, parent)
					.setBase(base)
					.load(
						page_pathAddAlias(this.masterPath, 'Master'),
						page_pathAddAlias(this.templatePath, 'Template'))
					.js(
						page_pathAddAlias(this.compoPath, 'Compo')
					)
					.js(env_both)
					.js(env_server)
					.done(fn_proxy(this._response, this));
				return this;
			},
			
			
			_response: function(resp){
				
				var master = resp.load.Master || this.master,
					template = resp.load.Template || this.template,
					Component = resp.Compo;
				
				if (master == null && this.masterPath !== '') {
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
				
				var nodes = this.nodes || template;
				if (this.query.partial) {
					page_processPartial(this, nodes, this.query.partial);
					return;
				}
				
				page_process(
					this
					, nodes
					, fn_delegate(page_resolve, this)
				);
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
	var WebSocket;
	(function(){
		
		WebSocket = function (app){
			var io, SocketListeners = {};
			
			return {
				listen: function(httpServer){
					this.listen = doNothing;
					logger.log('Web socket opened'.green.bold);
					
					io = io_create(httpServer, SocketListeners);
				},
				hasHandlers: function(){
					return Object.keys(SocketListeners).length !== 0
				},
				getHandler: function(namespace) {
					return SocketListeners[namespace];
				},
				registerHandler: function(namespace, Handler){
					SocketListeners[namespace] = Handler;
					
					if (io == null) {
						if (app != null && app._server) 
							this.listen(app._server);
						
						return;
					}
					io_listen(io, namespace, Handler);
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
				of: function(namespace){
					return io == null
						? null
						: io.of(namespace);
				},
				emit: function(namespace /* ..args */){
					var args = _Array_slice.call(arguments, 1),
						cb = args[args.length - 1];
					if (io == null) {
						console.error(
							'Emitting to the websockets (%s), but server is not started'
							, namespace
						);
						cb && cb({ message: 'Server is not started' });
						return;
					}
					if (SocketListeners[namespace] == null) {
						console.error(
							'No handlers are bound to the namespace', namespace
						);
						cb && cb({ message: 'No handlers' });
						return;
					}
					if (typeof cb === 'function') {
						args.pop();
						io_emitMany(this.clients(namespace), args, cb);
						return;
					}
					var nsp = io.of(namespace);
					nsp.emit.apply(nsp, args);
				}
			}
		};
		
		var io_create,
			io_handlerDelegate,
			io_listen,
			io_emitMany;
		(function(){
			io_create = function(httpServer, listeners) {
				var io = require('socket.io')(httpServer, {
					'log level': 2
				});
				for (var nsp in listeners) {
					io_listen(io, nsp, listeners[nsp]);
				}
				return io;
			};
			io_listen = function(io, namespace, Handler){
				io.of(namespace).on(
					'connection'
					, io_handlerDelegate(io, namespace, Handler)
				);
			};
			io_handlerDelegate = function(io, namespace, Handler) {
				return function(socket) {
					new Handler(socket, io);
				};
			};
			io_emitMany = function(clients, args, cb){
				var count = clients.length,
					results = [];
				if (count === 0) {
					cb(null, results);
					return;
				}
				var imax = count,
					i = -1,
					x;
				args.push(complete);
				while(++i < count){
					x = clients[i];
					x.emit.apply(x, args);
				}
				function complete(data){
					results.push(data);
					if (--count < 1) 
						cb(null, results);
				}
			};
		}());
		
		function doNothing(){}
	}());
	
	// end:source /src/WebSocket.js
	
	// source /src/HttpApplication/Application.js
	(function(){
		var _emitter = new Class.EventEmitter;
	
		// source ../Config/Config.js
		var Config;
		(function() {
			var PATH = 'server/config/**.yml',
				BUILD_PATH = 'public/build/stats.json';
		
			// source PathUtils.js
			var PathUtils;
			(function() {
				PathUtils = {
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
				
				/* Resolve CommonJS, Bower resource paths */
				(function(){
					configurate_BowerAndCommonJS = function(cfg, app){
						return new Class.Await(
							handleAllEnvironments(cfg, 'npm'),
							handleAllEnvironments(cfg, 'bower')
						);
					};
				
					var _types = {
						'bower': {
							'dir': 'bower_components',
							'package': 'bower.json',
							'alternate': 'component.json'
						},
						'npm': {
							'dir': 'node_modules',
							'package': 'package.json'
						}
					};
					var _resourceTypeExtensions = {
						'scripts': 'js',
						'styles': 'css'
					};
					var _extensionTypes = {
						'js': 'scripts',
						'css': 'styles'
					};
					
					function handleAllEnvironments(config, packageSystem){
						return new Class.Await(
							handleEnvironments(config, packageSystem, 'scripts'),
							handleEnvironments(config, packageSystem, 'styles')
						);
					}
					function handleEnvironments(config, packageSystem, resourceType) {
						return new Class.Await(
							handleEnvironment(config, packageSystem, resourceType, 'client'),
							handleEnvironment(config, packageSystem, resourceType, 'server'),
							handleEnvironment(config, packageSystem, resourceType, 'both')
						);
					}
					function handleEnvironment(config, packageSystem, resourceType, envType){
						var env = config.env[envType],
							resources = env[resourceType],
							paths = resources && resources[packageSystem];
						if (paths == null) 
							return null;
						
						var dfr = new Class.Deferred;
						resolvePaths(config, resourceType, packageSystem, paths, function(mappings){
							var arr = resources[packageSystem],
								imax = arr.length,
								i = -1, j = -1, x;
							while( ++i < imax ){
								x = mappings[arr[i]];
								if (is_String(x)) {
									arr[i] = x;
									continue;
								}
								if (is_Array(x)) {
									arr.splice.apply(arr, [i, 1].concat(x));
									i += x.length - 1;
									imax += x.length - 1;
									continue;
								}
								logger.error('Module path mapping is not defined', arr[i]);
							}
							dfr.resolve();
						});
						return dfr;
					}
					function resolvePaths(config, resourceType, packageSystem, arr, cb){
						var base = new net.Uri(config.base),
							paths = [],
							mappings = {};
						
						var data = _types[packageSystem];
						if (data == null) 
							throw Error('Support:' + Object.keys(_types) + ' Got:' + packageSystem);
						
						var await = new Class.Await;
						var dirName = data.dir,
							packageName = data.package;
						arr.forEach(function(name){
							if (name == null) {
								// could be when conditional configuration item is falsy
								return;
							}
							
							var map = name;
							var aliasIndex = name.indexOf('::'),
								alias = '';
							if (aliasIndex !== -1) {
								alias = name.substring(aliasIndex);
								name  = name.substring(0, aliasIndex);
							}
							
							if (name.indexOf('/') !== -1) {
								if (/\.\w+$/.test(name) === false) 
									name += '.' + _resourceTypeExtensions[resourceType];
								
								mappings[map] = '/'
									+ dirName
									+ '/'
									+ name
									+ alias
									;
								return;
							}
							
							var pckgPath = resolveModulePath(
								base, dirName + '/' + name + '/' + packageName
							);
							if (pckgPath == null) {
								if (data.alternate) {
									pckgPath = resolveModulePath(
										base, dirName + '/' + name + '/' + data.alternate
									);
								}
								if (pckgPath == null) {
									logger.error('<Module is not resolved>', name);
									return;
								}
							}
							io
								.File
								.readAsync(pckgPath)
								.done(function (pckg) {
									
									var base = '/' + dirName + '/' + name + '/',
										main = pckg.main;
									if (main == null) 
										main = 'index.js';
										
									if (is_String(main)) {
										mapPath(mappings, map, main, base, alias);
										return;
									}
									if (is_Array(main)) {
										mapPathMany(mappings, map, main, base, alias, resourceType);
										return;
									}
									logger.error('Main is not defined', pckgPath);
								})
								.fail(logger.error)
								.always(await.delegate(name, false))
								;
						});
						await.always(function(){
							cb(mappings);
						});
					}
					function mapPathMany(mappings, str, mainArr, base, alias, resourceType){
						var imax = mainArr.length,
							i = -1, ext,
							arr = [];
						while( ++i < imax ){
							ext = _file_getExt(mainArr[i]);
							if (_extensionTypes[ext] === resourceType) 
								arr.push(base + mainArr[i] + alias);
						}
						mappings[str] = arr;
					}
					function mapPath(mappings, str, main, base, alias){
						mappings[str] = base + main + alias;
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
							if (base.path === '' || base.path === '/') 
								return null;
						}
						return path;
					}
					function _file_getExt(path) {
						var i = path.lastIndexOf('.');
						return i === -1
							? ''
							: path.substring(i + 1)
							;
					}
					
				}());
				
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
			
						if (page.scripts != null) {
							scripts = scripts.concat(getResources(
								'page'
								, this.env
								, page.scripts
								, page.routes
							));
						}
						if (page.env != null) {
							scripts = scripts.concat(getResources(
								'scripts'
								, this.env
								, page.env
							));
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
							styles = styles.concat(getResources(
								'page'
								, cfg.env
								, page.styles
								, page.routes
							));
						}
						if (page.env) {
							styles = styles.concat(getResources(
								'styles'
								, cfg.env
								, page.env
							));
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
			
						if (!include.src) {
							console.error('[CLIENT CONFIGURATION ERROR]');
							console.error('- Include PATH is not specified in `env:client:include:src`');
						}
			
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
			
					register(env.client && env.client.routes);
					register(env.both   && env.both.routes);
					register(routes);
					
					switch (type) {
			
						case 'page':
							resolve(pckg);
							break;
			
						case 'debug':
							resolve(env.client.debug);
							break;
			
						case 'scripts':
						case 'styles':
							var obj = pckg || env;
							resolve(obj.client && obj.client[type]);
							resolve(obj.both   && obj.both[type]);
							break;
						default:
							logger.error('Unsupported type', type);
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
				
			Config = function(params, app, done, fail) {
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
						path: path_base + 'package.json',
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
						// fail(error)
						throw new Error('<app:configuration>', error);
					})
					.done(function() {
						var cfg = this;
						
						new Class.Await(
							configurate_Mask(cfg),
							configurate_Include(cfg),
							configurate_Pages(cfg, app),
							configurate_Plugins(cfg, app),
							configurate_BowerAndCommonJS(cfg, app)
						)
						.always(function(){
							process.nextTick(done);
						});
					});
			};
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
		            
		            prepairUrl(req, this);
		            
		            this.app_.process(req, res);
		        },
		        
		        /* execute raw request */
		        execute: function(req, res){
		            prepairUrl(req, this);
					respond_Raw(this.app_, req, res);
		        }
		    });
		
		    function prepairUrl(req, subapp){
		        req.url = req.url.replace(subapp.path_, '/');
		    }
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
				setHeader: function(){
					// do_Nothing
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
			
			// webSockets
			webSockets: null,
			
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
				this.webSockets = WebSocket(this);
				
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
				return this;
			},
			process: function(req, res, next){
				if (this._outerPipe == null) 
					this.processor();
				
				this._outerPipe.process(
					req
					, res
					, next || this._404
					, this.config
				);
			},
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
			autoreload: function(httpServer){
				this._server = this._server || httpServer;
				if (this._server == null) 
					return;
				
				Autoreload.enable(this);
			},
			listen: function(){
				var port, server;
				var i = arguments.length,
					mix;
				while (--i > -1){
					mix = arguments[i];
					if (mix == null) 
						continue;
					
					switch(typeof mix){
						case 'number':
						case 'string':
							port = mix;
							break;
						default:
							if (mix.listen) 
								server = mix;
							break;
					}
				}
				if (port == null) 
					port = this.config.$get('port');
				
				if (port == null) 
					throw Error('Port number is not defined');
				
				if (server == null)
					server = require('http').createServer();
				
				this._server = server
					.on('request', this.process)
					.listen(port)
					;
				
				if (this.webSockets.hasHandlers()) 
					this.webSockets.listen(this._server);
				
				if (app_isDebug()) 
					this.autoreload();
		
				_emitter.trigger('listen', this);
				return this._server;
			},
			getSubApp: function(path){
				var route = this.handlers.subapps.get(path);
				return route && route.value && route.value.app_;
			},
			
			Self: {
				_loadConfig: function(){
					
					var definition = this._baseConfig;
					
					this.config = Config(
						definition
						, this
						, cfg_doneDelegate(this)
						, function(error){
							logger
								.warn('Configuration Error')
								.error(error);
						})
						;
					return this;
				},
				
				_404: function(error, req, res){
					error = error == null
						? HttpError('Endpoint not found: ' + req.url, 404)
						: HttpError.create(error)
						;
					
					var accept = req.headers['accept'];
					if (accept == null || accept.indexOf('text/html') !== -1) {
						server.HttpErrorPage.send(error, req, res, this.config);
						return;
					}
					
					// send json	
					send_Error(res, error);
				}
			},
			Static: {
				on: _emitter.on.bind(_emitter),
				off: _emitter.off.bind(_emitter),
				once: _emitter.once.bind(_emitter),
				trigger: _emitter.trigger.bind(_emitter)
			}
		});
		
		
		function responder(app) {
			return function (req, res, next){
				
				if (Autoreload.enabled) 
					Autoreload.watch(req.url, app.config);
				
				var callback = app._innerPipe != null
					? middleware_processDelegate(app._innerPipe)
					: handler_process
					;
				
				if (next == null) 
					next = app._404;
				
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
				app
				, req
				, res
				, function(){
					res.writeHead(500);
					res.end('Not Found');
				}
				, handler_processRaw
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
					if (handler == null) {
						next();
						return;
					}
					resources_load(app, function(){
						callback(app, handler, req, res);
					});
				});
			
		}
		function handler_process(app, handler, req, res) {
			logger(95)
				.log('<request>', req.url);
			
			handler.process(req, res, app.config);
				
			if (handler.done == null)
				// Handler responds to the request itself
				return;
			
			handler
				.done(function(content, statusCode, mimeType, headers){
					var send = handler.send || send_Content;
					send(res, content, statusCode, mimeType, headers);
				})
				.fail(function(error, statusCode){
					error = HttpError.create(error, statusCode);
					if (handler.sendError) {
						handler.sendError(error, req, res, app.config);
						return;
					}
					send_Error(res, error);
				});
		}
		function handler_processRaw(app, handler, m_req, m_res) {
			if (handler instanceof server.HttpSubApplication) {
				handler.execute(m_req, m_res);
				return;
			}
			handler.process(m_req, m_res, app.config)
			if (handler.done == null) 
				return;
			handler.pipe(m_res);
		}
		function cfg_doneDelegate(app) {
			return function() {
				_emitter.trigger('configurate', app);
				
				initilizeEmbeddedComponents(app);
				var cfg = app.config;
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
					
					var projects = config.projects;
					if (projects) {
						for(var name in projects){
							var res = resp[name];
							if (res != null && typeof res.attach === 'function')
								res.attach(app);
						}
					}
					
					callback();
				});
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
	            app
					.webSockets
					.registerHandler('/browser', ConnectionSocket)
					;
	            
	            var configs = new io.Directory('server/config/');
	            if (configs.exists()) 
	                configs.watch(reloadConfigDelegate(app));
	            
				include.cfg('autoreload', this);
	            
				this.base = app.config.base;
	            return this;
	        },
	        
	        watch: function(requestedUrl, config){
				if (/\.[\w]+$/.test(requestedUrl) === false) {
					// no extension
					return;
				}
				
				var q = requestedUrl.indexOf('?');
				if (q !== -1) 
					requestedUrl = requestedUrl.substring(0, q);
				
				var root = config.static || config.base || '/',
					path = net.Uri.combine(root, requestedUrl),
	            	file = new io.File(path)
					;
	            file.requestedUrl = requestedUrl;
				
				this.watchFile(file);
			},
			watchFile: function(file){
				if (!(file.uri && file.uri.file))
					// virtual file?
					return;
				if (/\.map$/.test(file.uri.file))
					return;
				
				if (WatcherHandler.isWatching(file)) 
					return;
				
				if (io.File.prototype.exists.call(file) === false)
					return;
				
				WatcherHandler.watch(file);
			},
	        unwatch: function(path){
	            
	            WatcherHandler.unwatch(new io.File(path));
	        },
	        
	        fileChanged: function(path, sender){
	            
	            WatcherHandler.fileChanged(path, sender, null, this.base);
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
	                watcher = new FileWatcher(file);
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
	                fileChanged: function(path, sender, requestedUrl, base){
	                    if (sender === 'filewatcher') {
	                        var rel = requestedUrl || ('/' + path.replace(rootFolder, ''));
	                        
	                        if (include.getResource(rel) == null) 
	                            this.trigger('fileChange', rel, path);
	                        
	                        return;
	                    }
	                    if (this.isWatching(new io.File(path))) {
	                        return;
	                    }
	                    if (base) {
	                        base = new net.Uri(base).toLocalFile();
	                        path = path.replace(base, '');
	                    }
	                    
	                    this.trigger('fileChange', path);
	                    
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
	            Construct: function(file){
	                
	                this.active = false;
	                this.file = file;//-new io.File(path);
	            },
	            Self: {
	                fileChanged: function(path){
	                    logger.log('<watcher:changed>', path);
	                    
	                    this.trigger('fileChange', path, 'filewatcher', this.file.requestedUrl)
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
	    
	    var root = path_resolveSystemUrl('/');
	        
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
		}
		
		Static.config = function(config){
			return (responder = server.StaticContent.create(config));
		};
		
		var responder = null;
	}());
	// end:source ./static.js
	// end:source /src/middleware/middleware.js
	
	
	// source /src/compos/exports.js
	
	function initilizeEmbeddedComponents(app) {
		initilizeEmbeddedComponents = function(){};
		
		var DEBUG = app.config.$is('debug'),
			BUILD_DIR = '/public/build/'
			;
		// source resources/exports.js
		(function(){
			
			// source ./util.js
			var model_getScripts,
				model_getStyles;
			(function(){
				
				model_getStyles = function(page, config, partial){
					var pageId = _getPageId(page);
					if (DEBUG) {
						return partial !== true
							? config.$getStyles(pageId)
							: config.$getStylesForPageOnly(pageId)
							;
					}
					
					var array = partial !== true
						? [ _formatPagePath('styles.css', config) ]
						: []
						;
					var buildData = _getBuildData(pageId, config);
					if (buildData == null) 
						return array;
					
					if (buildData.styles) 
						array.push(_formatPagePath(pageId  + '/styles.css', config));
					
					return array;
				};
				
				model_getScripts = function(page, config, partial, cb){
					var pageId = _getPageId(page),
						model = {
							scripts: [],
							templates: '',
							include: {
								src: '',
								cfg: null,
								routes: null
							},
							buildVersion: config.buildVersion,
						};
					if (DEBUG) {
						// includejs information
						var includeMeta = config.$getInclude();
						if (includeMeta) 
							model.include = includeMeta;
							
						model.scripts = partial !== true
							? config.$getScripts(pageId)
							: config.$getScriptsForPageOnly(pageId)
							;
						cb && cb(model);
						return model;
					}
					
					var base = config.static || config.base,
						tmpls = [];
						
					if (partial !== true) {
						model.scripts.push(
							_formatPagePath('scripts.js', config)
						);
						tmpls.push(
							combine_(base, BUILD_DIR, 'load.html::App')
						);
					}
					var buildData = _getBuildData(pageId, config);
					if (buildData != null) {
						if (buildData.load === true) {
							tmpls.push(
								combine_(base, buildData, pageId, 'load.html::Page')
							);
						}
						if (buildData.scripts) {
							model.scripts.push(
								_formatPagePath(pageId + '/scripts.js', config)
							);
						}
					}
					
					include
						.instance()
						.load(tmpls)
						.done(function(resp){
							model.templates = (resp.load.App  || '') + (resp.load.Page || '');
							cb && cb(model);
						});
						
					return model;
				};
				
				var combine_ = net.Uri.combine;
				
				function _getPageId(page){
					var id = page.data && page.data.id;
					if (id == null) {
						logger.error('<page-resources> PageData and the ID is not defined');
					}
					return id;
				}
				function _getBuildData(pageId, config) {
					if (config.build == null) {
						logger
							.error('<Application is not built>')
							.warn('To execute the DEV version use `--debug` flag: `node index --debug`'.bold)
							.warn('To build the application run `atma custom node_modules/atma-server/tools/build`')
							;
						return null;
					}
					var buildData = config.build[pageId];
					if (buildData == null) {
						logger.error(
							'<page-resources> No page info'
							, pageId
							, 'Build could be faily'
						);
						return null;
					}
					
					return buildData;
				}
				function _formatPagePath(path, config){
					path = combine_(BUILD_DIR, path);
					if (config.buildVersion) {
						path += '?v=' + config.buildVersion;
					}
					return path;
				}
			}());
			// end:source ./util.js
			// source ./atma-styles.js
			var Styles = Compo({
				mode: 'server:all',
				nodes: mask.parse(
					"each (.) > link type='text/css' rel='stylesheet' href='~[.]';"
				),
				cache: DEBUG 
					? { byProperty: 'ctx.page.id' }
					: null
					,
				renderStart: function(model, ctx){
					this.model = model_getStyles(
						ctx.page, ctx.config, false
					);
				}
			});
			Styles.getModel = model_getStyles;
			
			mask.registerHandler('atma:styles', Styles);
			// end:source ./atma-styles.js
			// source ./atma-scripts.js
			(function(){
				
				// source ./compo-prod.js
				var Prod_Scripts = Compo({
					template:[
						// source:string tmpl-prod.mask
				"		if (templates) {\n\n			:html > '~[templates]'\n\n		}\n\n		\n\n		each(scripts){\n\n			script type='text/javascript' src='~[.]';\n\n		}\n\n		\n\n		script {	\n\n			include.allDone(function(){\n\n				window.app = Compo.bootstrap(document.body);\n\n			});\n\n		}"
						// end:source:string tmpl-prod.mask
					][0],
					mode: 'server:all',
					cache: {
						byProperty: 'ctx.page.id'
					},
					onRenderStart: function(model, ctx){
						var resume = Compo.pause(this, ctx),
							self = this;
							
						model_getScripts(
							ctx.page, ctx.config, false, function(model){
								self.model = model;
								resume();
							}
						);
					}
				});
				Prod_Scripts.getModel = model_getScripts;
				// end:source ./compo-prod.js
				// source ./compo-dev.js
				var Dev_Scripts = Compo({
					template:[
						// source:string tmpl-dev.mask
				"		\n\n		script type='text/javascript' src='~[include.src]';\n\n		\n\n		script type='text/javascript' > '''\n\n			window.DEBUG = true;\n\n			\n\n			include\n\n				.cfg(~[include.config])\n\n				.routes(~[include.routes])\n\n				.js(~[scripts])\n\n				.done(function(){\n\n					\n\n					var start = Date.now();\n\n					\n\n					window.app =  mask.Compo.bootstrap(document.body);\n\n					console.log('Render - ', Date.now() - start);\n\n				});\n\n			\n\n		'''"
						// end:source:string tmpl-dev.mask
					][0],
					meta: {
						mode: 'server',
					},
					onRenderStart: function(model, ctx){
						model = model_getScripts(
							ctx.page, ctx.config
						);
						
						this.model = {
							include: {
								src: model.include.src,
								routes: JSON.stringify(model.include.routes, null, 4),
								config: JSON.stringify(model.include.cfg, null, 4)
							},
							scripts: model.scripts
								.map(function(x){
									return "'" + x + "'";
								})
								.join(',\n')
						};
					}
				});
				Dev_Scripts.getModel = model_getScripts;
				// end:source ./compo-dev.js
				
				var Handler = app.config.$is('debug')
					? Dev_Scripts
					: Prod_Scripts
					;
				
				mask.registerHandler('atma:scripts', Handler);
			}());
			
			// end:source ./atma-scripts.js
			
		}());
		// end:source resources/exports.js
	}
	// end:source /src/compos/exports.js
	
	__cfgDefaults = [
		// source cfg-defaults.json
		"{\"env\":{\"both\":{\"include\":{\"cfg\":null},\"routes\":null,\"scripts\":null},\"client\":{\"include\":{\"cfg\":null},\"scripts\":null,\"styles\":null,\"routes\":null},\"server\":{\"routes\":null,\"scripts\":null}},\"handler\":{\"location\":\"/server/http/handler/{0}.js\"},\"handlers\":null,\"mask\":{\"compos\":{\":scripts\":{\"mode\":\"server:all\"},\":styles\":{\"mode\":\"server:all\"},\":template\":{\"mode\":\"server\"},\"layout:master\":{\"mode\":\"server\"},\"layout:view\":{\"mode\":\"server\"},\":animation\":{\"mode\":\"client\"}},\"attributes\":null},\"page\":{\"location\":{\"controller\":\"/server/http/page/{0}/{1}.js\",\"template\":\"/server/http/page/{0}/{1}.mask\",\"master\":\"/server/http/master/{0}.mask\",\"viewTemplate\":\"/public/view/{0}/{1}.mask\",\"viewController\":\"/public/view/{0}/{1}.js\",\"viewStyle\":\"/public/view/{0}/{1}.less\"},\"extension\":{\"javascript\":\"js\",\"style\":\"less\",\"template\":\"mask\"},\"index\":{\"template\":\"index\",\"master\":\"default\"},\"urls\":{\"login\":\"/login\"}},\"pages\":{\"/\":{\"id\":\"index\",\"title\":\"Default Title\"}},\"service\":{\"location\":\"/server/http/service/{0}.js\"},\"services\":null,\"view\":{\"location\":{\"template\":\"/public/view/{0}/{1}.mask\",\"controller\":\"/public/view/{0}/{1}.js\",\"style\":\"/public/view/{0}/{1}.less\"}},\"websocket\":{\"location\":\"/server/http/websocket/{0}.js\"},\"websockets\":null}"
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