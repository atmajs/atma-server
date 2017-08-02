import { Class } from '../dependency'

export const secure_canAccess = function(req, secureObj){
		
	if (secureObj == null) 
		return true;
	
	if (secureObj === true || secureObj.role == null) 
		return (req.session != null || req.user != null);
	
	var user = req.user,
		role = secureObj.role
		;
	return user != null && (role == null || user.isInRole(role));
};

export const service_validateArgs = function(body, args, isStrict?) {
	if (body == null) 
		return 'Message Body is not defined';
	
	return Class.validate(body, args, isStrict);
};

