var is_String,
    is_Function,
    is_Object,
    is_Array,
    
    is_Debug
    ;
    
(function(){
    
    is_String = function(str){
        return typeof str === 'string';
    };
    
    is_Function = function(fn){
        return typeof fn === 'function';
    };

    is_Object = function(obj){
        return obj !== void 0 && typeof obj === 'object';
    };

    is_Array = Array.isArray;
    
    is_Debug = (function(){
        
        var debug;
        return function(){
            if (debug == null) 
                debug = Boolean(__app.args.debug || __app.config.debug);
            
            return debug;
        };
    }());
    
}());
