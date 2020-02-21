import StaticContent from '../Plugins/Static';

export function StaticMidd(req, res, next, config) {
	if (responder == null) 
		responder = StaticContent.respond
	
	responder(req, res, next, config);
};
	
(<any>StaticMidd).config = function(config){
	return (responder = StaticContent.create(config));
};
	
let responder = null;
