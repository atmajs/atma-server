function fn_proxy(fn, ctx) {
    return function(){
        return fn.apply(ctx, arguments);  
    }
}