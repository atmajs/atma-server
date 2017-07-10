var io,
    Class,
    ruta,
    mask,
    jmask,
    Compo,
    include,
    includeLib,
    Routes,
    Log,
    logger;

(function () {
    
    var pathes;
    (function () {
        pathes = {};
        add('atma-io'    , 'io');
        add('maskjs'     , 'mask');
        add('includejs'  , 'include');
        add('atma-class' , 'class');
        add('atma-logger', '', '/lib/logger-dev.js', '/lib/logger.js');
        
        var debug = false;
        function add(lib, name, dev, prod) {
            pathes[lib] = debug === true 
                ? (dev  || '/lib/' + name + '.js')
                : (prod || '/lib/' + name + '.min.js')
                ;
        }
    }());
    
    logger      = require('atma-logger');
    io          = global.io && global.io.File ? global.io : require('atma-io');
    Class       = require('atma-class');
    ruta        = global.ruta  || require('ruta');
    mask        = global.mask  || require('maskjs');
    jmask       = mask.jmask;
    Compo       = mask.Compo;
    Routes      = ruta.Collection;
    Log         = logger('atma-server');
    
    if (global.include == null) {
        require('includejs');
    }
    include     = global.include;
    includeLib  = global.includeLib;

}());