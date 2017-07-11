export const fn_proxy = function(fn, ctx) {
    return function(){
        return fn.apply(ctx, arguments);  
    };
};

export const fn_delegate = function(fn, ...args) {
    return function(...args2){        
        fn.apply(
            null,
            /* args_1 + args_2 */
            args.concat(args2)
        );
    }
};
