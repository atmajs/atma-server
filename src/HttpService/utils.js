var secure_canAccess,
	service_validateArgs
	;
(function(){
	
	secure_canAccess = function(req, secureObj){
			
		if (secureObj == null) 
			return true;
		
		var user = req.user,
			role = secureObj.role
			;
		
		return user != null && (role == null || user.isInRole(role));
	};
	
	service_validateArgs = function(req, args) {
		var body = req.body;
		if (body == null) 
			return 'Message Body is not defined';
		
		return checkObject(body, args);
	};
	
	// private
	// a** - payload
	// b** - expect
	
	function checkObject(a, b) {
		var error,
			optional,
			key, aVal;
		for(key in b){
			// ? (optional)
			optional = key.charCodeAt(0) === 63;
			if (optional) {
				aVal = a[key.substring(1)]
				if (aVal == null) 
					continue;
				
				error = checkProperty(a, b, aVal, b[key]);
				
				if (error) 
					return error + ': ' + key;
				
				continue;
			}
				
			aVal = a[key];
			if (aVal == null) 
				return 'Argument expected: ' + key;
			
			error = checkProperty(a, b, aVal, b[key]);
			if (error != null) 
				return error + ': ' + key;
		}
	}
	
	function checkProperty(a, b, aVal, bVal) {
		if (bVal == null) 
			return null;
		
		if (typeof bVal === 'string') {
			switch(bVal) {
				case 'string':
					return typeof aVal !== 'string' || aVal.length === 0
						? 'String expected'
						: null;
				case 'number':
					return typeof aVal !== 'number'
						? 'Number expected'
						: null;
			}
		}
		
		if (bVal instanceof RegExp) {
			return bVal.test(aVal) === false
				? 'Invalid argument'
				: null;
		}
		
		if (Array.isArray(bVal)) {
			if (Array.isArray(aVal) === false) 
				return 'Array expected';
			
			var i = -1,
				imax = aVal.length,
				error;
			while ( ++i < imax ){
				error = checkObject(aVal[i], bVal[0])
				
				if (error) 
					return 'Invalid item <' + i + '> ' + error;
			}
			
			return null;
		}
		
		if (typeof aVal !== typeof bVal) 
			return 'Type missmatch';
		
		
		if (typeof aVal === 'object') 
			return checkObject(aVal, bVal);
		
		
		return null;
	}
}())
