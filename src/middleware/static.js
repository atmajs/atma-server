(function(){
	server.middleware['static'] = Static;
	
	function Static(req, res, next){
		if (responder == null) 
			responder = server.StaticContent.respond
		
		responder(req, res, next);
	};
	
	Static.config = function(config){
		return (responder = server.StaticContent.create(config));
	}
	
	var responder;
}());