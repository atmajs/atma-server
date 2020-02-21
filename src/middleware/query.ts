import { ruta } from '../dependency';

const deserialize = ruta.$utils.query.deserialize;

export function QueryMidd (req, res, next){
	
	var url = req.url,
		q = url.indexOf('?');
	
	req.query = q === -1
		? {}
		: deserialize(url.substring(q + 1));
		
	next();
};

