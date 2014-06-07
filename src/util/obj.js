var obj_extend,
    obj_defaults,
    obj_lazyProperty
    ;

(function(){

    obj_extend = function(target, source) {
        if (target == null) 
            target = {};
        
        if (source == null) 
            return target;
        
        for (var key in source) {
            target[key] = source[key];
        }
        return target;
    };
    
    obj_defaults = function(target, defaults) {
        if (target == null) 
            target = {};
            
        if (defaults == null) 
            return target;
        
        for (var key in defaults) {
            if (target[key] == null) 
                target[key] = defaults[key];
        }
        return target;
    };
    
    obj_lazyProperty = function(obj, xpath, init){
        var arr = xpath.split('.'),
            imax = arr.length - 1,
            i = -1, key;
        while(++i < imax){
            key = arr[i];
            if (obj[key] == null) 
                obj[key] = {};
            
            obj = obj[key];
        }
		key = arr[imax];
        Object.defineProperty(obj, key, {
			enumerable: true,
			configurable: true,
			get: function(){
				
				var val = init();
				Object.defineProperty(obj, key, {
					enumerable: true,
					writable: true,
					value: val
				})
                return val;
            }
        })
    };
    
}());
