var PageUtils = (function() {


	var PageUtils = {
		getScripts: function(pageID) {
			var cfg = app.config,
				scripts = getResources('scripts', cfg.env)
					.slice();

			var page = cfg.pages[pageID];

			if (page == null) {
				if (pageID)
					console.error('[404] Page is not defined', pageID);

				return scripts;
			}

			if (page.scripts) {
				var self = getResources('page', cfg.env, page.scripts, page.routes);

				Array
					.prototype
					.push
					.apply(scripts, self);
			}

			return scripts;
		},
		getScriptsForPageOnly: function(pageID) {
			var cfg = app.config,
				page = cfg.pages[pageID],
				scripts = [];

			if (page == null)
				return scripts;


			var _scripts = page.scripts;
			if (_scripts) {

				scripts = getResources('page', cfg.env, _scripts, page.routes)
					.slice();
			}

			return scripts;
		},

		getStyles: function(pageID) {
			var cfg = app.config,
				styles = getResources('styles', cfg.env)
					.slice();

			var page = cfg.pages[pageID];

			if (page == null) {
				if (pageID)
					console.error('[404] Page is not defined', pageID);

				return styles;
			}

			if (page.styles) {
				var self = getResources('page', cfg.env, page.styles, page.routes);

				Array
					.prototype
					.push
					.apply(styles, self);
			}

			return styles;
		},

		getStylesForPageOnly: function(pageID) {
			var cfg = app.config,
				page = cfg.pages[pageID];

			if (page && page.styles) {

				return getResources('page', cfg.env, page.styles, page.routes)
					.slice();
			}

			return [];
		},

		getInclude: function() {
			var env = app.config.env,
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
			var page = app.config.pages[pageID],
				include = {};

			return page && page.include ? incl_extend(include, page.include) : include;
		},

		getTemplate: function(pageData) {
			var template = pageData.template || this.index.template;

			return app
				.config
				.formatPath(this.location.template, template);
		},
		getMaster: function(pageData) {
			var master = pageData.master || this.index.master;

			return app
				.config
				.formatPath(this.location.master, master);
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

		if (type === 'page') {
			register(routes);
			resolve(pckg);
			return array;
		}

		resolve(env.client[type]);
		resolve(env.both[type]);

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