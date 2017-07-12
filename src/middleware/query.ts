import { ruta } from '../dependency';

export default function(req, res, next){
	
	var url = req.url,
		q = url.indexOf('?');
	
	req.query = q === -1
		? {}
		: deserialize(url.substring(q + 1));
		
	next();
};

var deserialize = ruta.$utils.query.deserialize;
