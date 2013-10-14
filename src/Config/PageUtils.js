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