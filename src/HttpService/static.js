
(function(){

    HttpService.parseClass = function(name, Ctor) {
        var keys = proto_getProperties(Ctor.prototype, {});
        
        return function(req, res, params, next){
            
            if (req.body == null) 
                return next('Body is not defined');
            
            for(var key in req.body){
                
                if (keys[key] === void 0) 
                    return next('Unexpected property ' + key);
            }
            
            req[name] = new Ctor(req.body);
            
            next(Class.validate(req[name]));
        };
    };
    
    
    
    function proto_getProperties(proto, out){
        for(var key in proto){
            
            if (typeof proto[key] !== 'function') 
                out[key] = 1;
        }
        
        if (proto.__proto__) 
            proto_getProperties(proto.__proto__, out);
        
        return out;
    }
}());
