(function(root, factory){
	"use strict";

	var _global, _exports;
	
	if (typeof exports !== 'undefined' && (root === exports || root == null || root === global)){
		// raw nodejs module
		_global = _exports = global;
	}
	
	if (_global == null) {
		_global = typeof window === 'undefined' ? global : window;
	}
	if (_exports == null) {
		_exports = root || _global;
	}
	
	
	factory(_global, _exports);
	
}(this, function(global, exports){
	"use strict";
	
	var server = {};
	
	var __app,
		__cfgDefaults;
	
	// import ../src/dependency.js
	// import ../src/util/obj.js
	// import ../src/util/fn.js
	// import ../src/util/arr.js
	// import ../src/util/cli.js
	
	// import ../src/HandlerFactory.js
	// import ../src/IHttpHandler.js
	
	// import ../src/Page/HttpPage.js
	// import ../src/Service/HttpService.js
	
	
	// import ../src/Application.js
	
	
	// import ../src/loader/coffee.js
	// import ../src/loader/less.js
	// import ../src/loader/yml.js
	// import ../src/Autoreload/autoreload.js
	
	__cfgDefaults = [
			// import cfg-defaults.json
		][0];
		
	if (exports.atma != null && typeof exports.atma === 'object') {
		
		obj_extend(exports.atma, server);
		return;
	}
	
	exports.atma = {
		server: server
	};
	
}));