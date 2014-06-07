var Static;
(function(){
	
	obj_lazyProperty(server, 'StaticContent', function(){
		return initialize();
	});

	var _staticContent;
	function initialize(){
		return (_staticContent = require('static-content'));
	}
	
	Autoreload.getWatcher().on('fileChange', function(path, f){
		if (_staticContent == null) 
			return;
		
		logger.log('fileChange', path, f);
		_staticContent.Cache.remove(f);
	})
}());