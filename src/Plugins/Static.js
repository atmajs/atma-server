var Static;
(function(){
	
	obj_lazyProperty(server, 'StaticContent', function(){
		return initialize();
	});

	var _staticContent;
	function initialize(){
		_staticContent = require('static-content');
		
		if (app_isDebug()) {
			_staticContent.on('file', function(file){
				Autoreload.watchFile(file)
			});
		}
		return _staticContent;
	}
	Autoreload.getWatcher().on('fileChange', function(path, f){
		if (_staticContent == null) 
			return;
		
		_staticContent.Cache.remove(f);
	})
}());