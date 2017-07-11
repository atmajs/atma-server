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

	// end:source /src/dependency.js

	// source /src/util/

	// end:source /src/util/

	// source /src/vars.js
	var _Array_slice = Array.prototype.slice,
		LIB_DIR = new Uri('file://' + __dirname + '/')
		;
	// end:source /src/vars.js
	// source /src/const/mime.js

	// end:source /src/const/mime.js


	// source /src/Business/Middleware.js

	// end:source /src/Business/Middleware.js
	// source /src/HttpError/HttpError.js

	// end:source /src/HttpError/HttpError.js

	// source /src/HandlerFactory.js

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
				if (page.pattern) {
					var query = ruta
						.parse(page.pattern, req.url)
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
	
				// Generate default template path
				if (this.template == null && this.compoPath == null && this.templatePath == null) {
					this.templatePath = cfg.$getTemplate(data);
				}
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
	
				if (master == null && this.masterPath) {
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
					if (info.path[0] === '$') {
						info.path = info.path.substring(info.path.indexOf(' ') + 1);
					}
	
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
					return this.reject(SecurityError('Access Denied'));
				}
	
				var path = req.url.substring(this.rootCharCount),
					entry = this.routes.get(path, req.method);
	
				if (entry == null && req.method === 'OPTIONS') {
					var headers = this.getOptions(path, req, res);
					if (headers) {
						res.writeHead(200, headers);
						res.end();
						// Return nothing back to application
						return void 0;
					}
				}
	
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
			},
	
			getOptions: (function(){
				var METHODS = ['GET','POST', 'PUT', 'PATCH', 'HEAD', 'DELETE'];
				return function(path, req, res){
	
					var headers = null,
						allowedMethods = [];
					var i = METHODS.length;
					while(--i > -1) {
						var method = METHODS[i];
						var endpoint = this.routes.get(path, method);
						if (endpoint != null) {
							allowedMethods.push(method)
							if (endpoint.meta && endpoint.meta.headers) {
								headers = obj_extend(headers, endpoint.meta.headers);
							}
						}
					}
					if (allowedMethods.length === 0) {
						return null;
					}
					if (this.meta && this.meta.headers) {
						headers = obj_extend(headers, this.meta.headers);
					}
					var methods = allowedMethods.join(',');
					headers['Allow'] = methods;
					headers['Access-Control-Allow-Methods'] = methods;
					if (headers['Content-Type'] === void 0) {
						headers['Content-Type'] = 'application/json;charset=utf-8'
					}
					return headers;
				}
			}())
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

	// end:source /src/compos/exports.js
	// source /src/handlers/exports.js
	// source ./MaskRunner.js
	
	// end:source ./MaskRunner.js
	// end:source /src/handlers/exports.js

	__cfgDefaults = [
		// source cfg-defaults.json
		"{\"env\":{\"both\":{\"include\":{\"cfg\":null},\"routes\":null,\"scripts\":null},\"client\":{\"include\":{\"cfg\":null,\"src\":\"/bower_components/includejs/lib/include.js\"},\"mask\":{\"cfg\":null,\"src\":null},\"scripts\":null,\"styles\":null,\"routes\":null},\"server\":{\"routes\":null,\"scripts\":null}},\"handler\":{\"location\":\"/server/http/handler/{0}.js\"},\"handlers\":{\"(\\\\.mr$|\\\\.mr\\\\?.+)\":\"/{self}.MaskRunner\"},\"mask\":{\"compos\":{\":scripts\":{\"mode\":\"server:all\"},\":styles\":{\"mode\":\"server:all\"},\":template\":{\"mode\":\"server\"},\"layout:master\":{\"mode\":\"server\"},\"layout:view\":{\"mode\":\"server\"},\":animation\":{\"mode\":\"client\"}},\"attributes\":null},\"page\":{\"location\":{\"controller\":\"/server/http/page/{0}/{1}.js\",\"template\":\"/server/http/page/{0}/{1}.mask\",\"master\":\"/server/http/master/{0}.mask\",\"viewTemplate\":\"/public/view/{0}/{1}.mask\",\"viewController\":\"/public/view/{0}/{1}.js\",\"viewStyle\":\"/public/view/{0}/{1}.less\",\"pageFiles\":\"/public/pages/\"},\"extension\":{\"javascript\":\"js\",\"style\":\"less\",\"template\":\"mask\"},\"index\":{\"template\":\"index\",\"master\":\"default\"},\"urls\":{\"login\":\"/login\"},\"pattern\":\"/:view/:category/:section\"},\"pages\":{\"/\":{\"id\":\"index\",\"title\":\"Default Title\"}},\"service\":{\"location\":\"/server/http/service/{0}.js\"},\"services\":null,\"view\":{\"location\":{\"template\":\"/public/view/{0}/{1}.mask\",\"controller\":\"/public/view/{0}/{1}.js\",\"style\":\"/public/view/{0}/{1}.less\"}},\"websocket\":{\"location\":\"/server/http/websocket/{0}.js\"},\"websockets\":null}"
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