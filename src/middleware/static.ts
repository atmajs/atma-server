import StaticContent from '../Plugins/Static';

export default function Static(req, res, next, config) {
	if (responder == null) 
		responder = StaticContent.respond
	
	responder(req, res, next, config);
};
	
(<any>Static).config = function(config){
	return (responder = StaticContent.create(config));
};
	
let responder = null;
