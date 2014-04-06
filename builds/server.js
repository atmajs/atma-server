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
	
	// import ../src/vars.js
	// import ../src/dependency.js
	
	// import ../src/const/mime.js
	
	// import ../src/util/is.js
	// import ../src/util/obj.js
	// import ../src/util/fn.js
	// import ../src/util/arr.js
	// import ../src/util/cli.js
	// import ../src/util/send.js
	// import ../src/util/serialization.js
	
	// import ../src/HttpError/HttpError.js
	
	// import ../src/HandlerFactory.js
	// import ../src/IHttpHandler.js
	
	// import ../src/HttpPage/HttpPage.js
	// import ../src/HttpService/HttpService.js
	// import ../src/WebSocket.js
	
	// import ../src/HttpApplication/Application.js
	
	
	// import ../src/loader/coffee.js
	// import ../src/loader/less.js
	// import ../src/loader/yml.js
	// import ../src/loader/jsnext.js

	// import ../src/Autoreload/autoreload.js
	
	// import /src/compos/exports.js
	
	__cfgDefaults = [
		// import cfg-defaults.json
	][0];
	
	
	if (exports.atma != null && typeof exports.atma === 'object') {
		if (exports.atma.server) {
			obj_extend(exports.atma.server, server);
			return;
		}
		exports.atma.server = server;
		return;
	}
	
	
	exports.atma = {
		server: server
	};
	
}));