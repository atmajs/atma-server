
var ConfigUtils = (function(resp){

	
	var __cfg;
	
	// import PathUtils.js
	// import PageUtils.js
	// import IncludeUtils.js
	
	var Utils = {
		page: PageUtils,
		formatPath: PathUtils.format
	};
	
	
	function cfg_attach(target, source) {
		if (target == null) 
			return;
		
		for (var key in source) {
			
			if (typeof source[key] === 'object') {
				cfg_attach(target[key], source[key]);
				continue;
			}
			
			if (typeof source[key] === 'function') {
				target[key] = source[key];
				continue;
			}
			
		}
	}
	
	return {
		attach: function(cfg) {
			__cfg = cfg;
			
			cfg_attach(cfg, Utils);
		},
		prepairIncludes: IncludeUtils.prepair
	};
	
}());
