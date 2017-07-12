import Application from './HttpApplication/Application'
import HttpSubApplication from './HttpApplication/SubApp'
import HttpPage from './HttpPage/HttpPage'
import IHttpHandler from './IHttpHandler'
import { mask, include, logger, Class, Uri, Routes, is_String, is_Function, is_Object } from './dependency'
import { page_flatternPageViewRoutes } from './util/page'
import { path_hasProtocol } from './util/path'
import { app_isDebug } from './util/app'


var fns_RESPONDERS = [
	'subapps',
	'handlers',
	'services',
	'pages'
];

export default class HandlerFactory {
	subapps: any
	handlers: any
	services: any
	pages: any

	constructor (public app: Application){

		this.subapps = new Routes();		
		this.handlers = new Routes();
		this.services = new Routes();
		this.pages = new Routes();
	}

	registerPages (pages_, pageCfg){
		var pages = page_flatternPageViewRoutes(pages_, pageCfg),
			id, page;
		for (id in pages) {

			page = pages[id];
			
			if (page.controller == null) {
				page.controller = HttpPage;
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
	}

	registerHandlers (routes, handlerCfg){
		for (var key in routes) {
			this.registerHandler(key, routes[key], handlerCfg);
		}
		return this;
	}

	registerHandler (path, handler, handlerCfg) {
		if (is_String(handler)) {
			handler = {
				controller: handler_path(handler, handlerCfg)
			};
		}

		this
			.handlers
			.add(path, handler)
			;
	}

	registerSubApps (routes, subAppCfg){
		for(var key in routes){
			this.registerSubApp(key, routes[key], subAppCfg);
		}
		return this;
	}

	registerSubApp (name, data, subAppCfg){
		var route = name;

		if (route[0] !== '^') {
			if (route[0] !== '/')
				route = '/' + route;

			route = '^' + route;
		}

		this
			.subapps
			.add(route, new HttpSubApplication(name, data, this.app))
			;
	}

	registerServices (routes, serviceCfg){

		for (var key in routes) {
			this.registerService(key, routes[key], serviceCfg);
		}

		return this;
	}

	registerService (path, service, serviceCfg){
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
	}

	registerWebsockets (routes){
		for(var namespace in routes){
			this.registerWebsocket(namespace, routes[namespace]);
		}
		return this;
	}

	registerWebsocket (namespace, handler, handlerCfg = null){
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
	}

	get (app, req, callback){
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

		if (this.app !== Application.current) {
			// check handlers of the root application
			var factory = Application.current.handlers,
				cfg = Application.current.config;

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
	}

	has (url, method){

		var imax = fns_RESPONDERS.length,
			i = -1
			;
		while( ++i < imax ){

			if (this[fns_RESPONDERS[i]].get(url, method) != null)
				return true;
		}

		return false;
	}

	static Handlers: { 
		[name: string]: new (...args) => IHttpHandler<any>
	} = {}
};

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
			: Uri.combine(base, controller)
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
	if (memory_canResolve(url)) {
		memory_resolve(factory, url, route, callback);
		return;
	}

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

var memory_canResolve,
	memory_resolve;
(function(){
	var rgx = /\/\{(self|global)\}.?/;
	memory_canResolve = function (url) {
		return rgx.test(url);
	};
	memory_resolve = function (factory, url, route, callback) {
		var match = rgx.exec(url),
			str = match[0],
			type = match[1],
			path = url.substring(match.index + match[0].length),
			memory = getContext(type),
			Handler = mask.obj.get(memory, path);

		if (Handler == null) {
			logger.error('<handler> invalid route', url);
			callback(new ErrorHandler('Invalid route: ' + url));
			return;
		}
		if (is_Object(Handler)) {
			callback(Handler);
			return;
		}
		//is_Function
		callback(new Handler(route, factory.app));
	};

	function getContext(type) {
		switch (type.toLowerCase()) {
			case 'self':
				return HandlerFactory.Handlers;
			case 'global':
				return global;
		}
		return null;
	}
}());

//function get_service(factory, path) {
//	var services = factory.services,
//		route = services.get(path);
//
//	return route;
//}
//
//function get_handler(factory, path) {
//
//	return factory
//		.handlers
//		.get(path)
//		;
//}


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
