atma.server.IHttpHandler = Class({
	Extends: Class.Deferred,
	
	process: function(req, res){
		
		this.reject('Not Implemented', 500);
	}
})