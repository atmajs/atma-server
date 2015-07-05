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
	
	var combine_ = Uri.combine;
	
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