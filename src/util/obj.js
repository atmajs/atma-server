function obj_extend(target, source) {
    if (target == null) 
        target = {};
    
    if (source == null) 
        return target;
    
    
    for (var key in source) {
        target[key] = source[key];
    }
    
    return target;
}

function obj_defaults(target, defaults) {
    if (target == null) 
        target = {};
        
    if (defaults == null) 
        return target;
    
    for (var key in defaults) {
        if (target[key] == null) 
            target[key] = defaults[key];
    }
    
    return target;
}