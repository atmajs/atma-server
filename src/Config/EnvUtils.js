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