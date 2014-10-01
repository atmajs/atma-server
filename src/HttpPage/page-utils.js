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
		var html = mask.render(
			nodes,
			page.model,
			page.ctx,
			null,
			page
		);
		
		if (page.ctx._rewrite != null) {
			__app
				.handlers
				.get(page.ctx._rewrite, page_rewriteDelegate(page));
			return;
		}
		
		if (page.ctx.async) {
			page
				.ctx
				.done(onSuccess)
				.fail(page.rejectDelegate());
			return;
		}
		
		onSuccess(html)
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
