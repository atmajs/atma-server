import { Class, ruta, logger, obj_extend, is_Function, is_Array, is_Object, obj_extendDefaults } from '../dependency'
import { NotFoundError, SecurityError, RequestError } from '../HttpError/HttpError'
import { secure_canAccess, service_validateArgs } from './utils'
import { Barricade } from './Barricade'
import { class_Dfr } from 'atma-utils';
import { HttpResponse } from '../IHttpHandler';

let HttpServiceProto = Class({
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
			return this.reject(new SecurityError('Access Denied'));
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
				.reject(new NotFoundError(name
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
				.reject(new SecurityError('Access Denied'));
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
				return this.reject(new RequestError(error));

		}

		let result = endpoint
			.process
			.call(this, req, res, entry.current.params);

        let dfr = result || this;
        let promise = new class_Dfr();

        dfr.then((mix, statusCode, mimeType, headers) => {
            var content = null;
            if (mix instanceof HttpResponse) {
                content = mix.content;
                statusCode = mix.statucCode;
                mimeType = mix.mimeType;
                headers = mix.headers;
            }
            else {
                content = mix;
            }
            if (meta != null && meta.origins) {
                let corsHeaders = this.getOptions(path, req, res);
                headers = headers == null ? corsHeaders : obj_extend(headers, corsHeaders);
            }

            promise.resolve(content, statusCode, mimeType, headers);
        }, error => promise.reject(error))
        
        return promise;
	},

	getOptions: (function(){
        const METHODS = ['GET','POST', 'PUT', 'PATCH', 'HEAD', 'DELETE'];
        const HEADER_ALLOW_ORIGIN = 'Access-Control-Allow-Origin';
		return function(path, req){

			let headers = {},
                allowedMethods = [],
                allowedOrigins = '',
                i = METHODS.length;
            
            if (this.meta) {
                if  (this.meta.headers != null) {
                    headers = obj_extend(headers, this.meta.headers);
                }
                if (this.meta.origins != null) {
                    allowedOrigins = this.meta.origins;
                }
            }
			while(--i > -1) {
				let method = METHODS[i];
				let route = this.routes.get(path, method);
				if (route != null) {
					allowedMethods.push(method)
                    var endpoint = route.value;
					if (endpoint.meta) {
                        if (endpoint.meta.headers != null) {
						    headers = obj_extend(headers, endpoint.meta.headers);
                        }
                        if (endpoint.meta.origins != null) {
                            allowedOrigins = endpoint.meta.origins;
                        }
                    }
				}
			}
			if (allowedMethods.length === 0) {
				return null;
			}
			
            let methods = allowedMethods.join(',');
            if (methods.indexOf('OPTIONS') === -1) {
                methods += ',OPTIONS';
            }
            
            let cors = {
                'Content-Type': 'application/json;charset=utf-8',
                'Allow': methods,
                'Access-Control-Allow-Methods': methods,
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Headers': req.headers['access-control-request-headers'] || 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
                'Access-Control-Allow-Origin': allowedOrigins
            };
			
            obj_extendDefaults(headers, cors);
            rewriteAllowedOrigins(req, headers);
            return headers;
        };

        function rewriteAllowedOrigins(req, headers) {
            let current: string = req.headers['host'];
            if (!current) {
                return;
            }
            let origin = headers[HEADER_ALLOW_ORIGIN];
            if (!origin || origin === '*') {
                return;
            }
            let hosts = origin.split(' ');
            for (let i = 0; i < hosts.length; i++) {
                let host = hosts[i];
                let globIndex = host.indexOf('*');
                if (globIndex > -1) {
                    host = host.substring(globIndex + 2);
                }
                let index = current.toLowerCase().indexOf(host.toLowerCase());
                if (index + host.length === current.length) {
                    headers[HEADER_ALLOW_ORIGIN] = host;
                    return;
                }
            }
        }
        
	}())
});


export default function HttpService(mix, ...params){
	var name, args;

	if (typeof mix === 'string') {
		name = mix;
		args = params;
	} else {
		args = [mix, ...params];
	}

	var proto = endpoints_merge(args);

	var routes = new ruta.Collection,
		defs = proto.ruta || proto.routes || proto,
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
				process: Barricade(x)
			}
		}

		if (responder == null && is_Object(x)) {
			responder = x;
		}

		if (responder != null && is_Array(responder.process))
			responder.process = Barricade(responder.process);

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

(<any>HttpService).Barricade = Barricade;


function endpoints_merge(array) {
	if (array.length === 1)
		return array[0];

	var proto = array[0],
		ruta = proto.ruta || proto.routes || proto;

	var imax = array.length,
		i = 0,
		x,
		xruta;
	while ( ++i < imax ){
		x = array[i];
		xruta = x.ruta || x.routes || x;

		for(var key in xruta){
			if (xruta[key] != null) {
                ruta[key] = xruta[key];
            }
		}

		if (x.ruta == null || x.routes) {
			continue;
        }
		for(var key in x){
			if (key === 'ruta' || key === 'routes') {
                continue;
            }

			if (x[key] != null) {
                proto[key] = x[key];
            }
		}
	}

	return proto;
}