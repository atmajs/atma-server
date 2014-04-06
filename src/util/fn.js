var fn_proxy,
    fn_delegate
    ;

(function(){
    fn_proxy = function(fn, ctx) {
        return function(){
            return fn.apply(ctx, arguments);  
        };
    };
    
    fn_delegate = function(fn /*args_1 ...*/) {
        var args = _Array_slice.call(arguments, 1);
        
        return function(/*args_2 ...*/){
            
            fn.apply(
                null,
                /* args_1 + args_2 */
                args.concat(_Array_slice.call(arguments))
            );
        }
    };
    
}());
