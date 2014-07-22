var page_Create,
	page_rewriteDelegate,
	page_proccessRequest,
	page_proccessRequestDelegate,
	page_resolve,
	
	page_pathAddAlias,
	
	page_getPartial,
	
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
	
	page_getPartial = function(nodes, selector, page){
		var arr = [],
			selectors = selector.split(';'),
			imax = selectors.length,
			i = -1,
			x;
		while(++i < imax){
			x = jmask(nodes).find(selectors[i]);
			if (x == null) {
				logger.warn('<HttpPage.partial> Not found `%s`', selectors[i]);
				continue;
			}
			arr.push(x);
		}
		arr.push(mask.parse('atma:styles partial'));
		arr.push(mask.parse('atma:scripts:partial'));
		
		return arr;
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
