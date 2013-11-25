function secure_canAccess(req, secureObj){
		
	if (secureObj == null) 
		return true;
	
	var user = req.user,
		role = secureObj.role
		;
	
	return user != null && (role == null || user.isInRole(role));
}