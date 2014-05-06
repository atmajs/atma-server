var path_isAbsolute;

(function(){
	
	path_isAbsolute = function(path){
		
		switch(path.substring(0, 5)){
			case 'file:':
			case 'http:':
			case 'https':
				return true;
		}
		return false;
	};
	
}());