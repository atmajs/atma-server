var path_hasProtocol,
	path_normalize,
	path_resolveSystemUrl;

(function(){
	path_hasProtocol = function(path){
		return /^(file|https?):/.test(path);
	};

	path_normalize = function(path) {
		return path
			.replace(/\\/g, '/')
			// remove double slashes, but not near protocol
			.replace(/([^:\/])\/{2,}/g, '$1/')
			;
	};
	path_resolveSystemUrl = function(path, base){
		path = path_normalize(path);
		if (path_hasProtocol(path))
			return path;

		if (path[0] === '.' && path[1] === '/')
			path = path.substring(2);

		if (hasSystemRoot(path))
			return 'file://' + path;

		if (base_ == null)
			ensureBase();

		return Uri.combine(base || base_, path);
	};

	var base_;
	function ensureBase() {
		base_ = 'file://' + path_normalize(process.cwd() + '/');
	}
	function hasSystemRoot(path) {
		if (path[0] === '/')
			return true;

		return /^[A-Za-z]:[\/\\]/.test(path);
	}
}());