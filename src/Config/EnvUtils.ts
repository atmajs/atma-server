import { io, Class, logger, include, mask, Uri, includeLib } from '../dependency'

export default {

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
		return Uri.combine(this.base, path);
	},
	$getMaster: function(pageData) {
		var master = pageData.master || this.page.index.master,
			location = this.page.location.master,
			path = this.$formatPath(location, master)
			;
		return Uri.combine(this.base, path);
	},
	$getController: function(pageData) {
		var controller = pageData.controller || this.page.index.controller;
		if (controller == null)
			return null;

		var location = this.page.location.controller,
			path = this.$formatPath(location, controller)
			;
		return Uri.combine(this.base, path);
	},
	$getCompo: function(pageData) {
		var compo = pageData.compo;
		if (compo == null)
			return null;

		var location = this.page.location.compo || this.page.location.controller,
			path = this.$formatPath(location, compo)
			;
		return Uri.combine(this.base, path);
	},
	$getImports: function(targetEnv){
		var both = this.env.both.imports,
			target = this.env[targetEnv].imports;

		var types = {
			'mask': ' mask ',
			'script': ' js es6 jsx ',
			'style': ' css less sass scss '
		};
		function getType(path) {
			var ext = /\w+$/.exec(path);
			if (ext == null) {
				logger.error('Not parsable extension', path);
				return 'unknown';
			}
			for(var type in types) {
				if (types[type].indexOf(ext) > -1) {
					return type;
				}
			}
			logger.error('Unknown extension', path);
			return 'uknown';
		}

		return _flatternResources(both).concat(_flatternResources(target))
			.map(function(path) {
				return {
					path: path,
					type: getType(path)
				};
			});
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

function obj_extend(target, source, dismissKey = null) {

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

var _flatternResources;
(function(){
	_flatternResources = function(mix, base) {
		if (mix == null) {
			return [];
		}
		if (typeof mix === 'string') {
			return _combinePath(base, mix);
		}
		if (mask.is.Array(mix)) {
			return _fromArray(mix, base);
		}
		if (mask.is.Object(mix)) {
			return _fromObj(mix, base);
		}
	};
	function _fromObj(json, base) {
		var arr = [];
		for (var key in json) {
			arr = arr.concat(_flatternResources(json[key], _combinePath(base, key)));
		}
		return arr;
	}
	function _fromArray(arr, base) {
		var out = [],
			imax = arr.length,
			i = -1;
		while( ++i < imax ) {
			out = out.concat(_flatternResources(arr[i], base));
		}
		return out;
	}

	function _combinePath(a, b){
		if (a == null || b == null) {
			return a || b;
		}
		return Uri.combine(a, b);
	}
}());