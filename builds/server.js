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
	
	var io = {};
	
	// import ../src/dependency.js
	// import ../src/util/obj.js
	// import ../src/util/arr.js
	// import ../src/util/cli.js
	
	// import ../src/Application.js

	
	if (exports.atma != null && typeof exports.atma === 'object') {
		
		obj_extend(exports.atma, atma);
		return;
	}
	
	exports.atma = atma;
	
}));