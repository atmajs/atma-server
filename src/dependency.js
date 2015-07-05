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
        };
    });
    
    logger      = require('atma-logger');
    io          = require('atma-io');
    Class       = require('atma-class');
    ruta        = require('ruta').ruta;
    mask        = require('maskjs');
    jmask       = mask.jmask;
    Compo       = mask.Compo;
    Routes      = ruta.Collection;
    Log         = logger('atma-server');
    
    if (global.include == null) {
        require('includejs');
    }
    include     = global.include;
    includeLib  = global.includeLib;
    
    return;

    // logger
    if (global.logger)
        logger = global.logger;
    
    if (logger == null) 
        logger = require('atma-logger')
    
    // io
    if (global.io && global.io.File) 
        io = global.io;
    
    if (io == null) 
        io = require('atma-io');
    
    
    Class       = atma.Class;
    ruta        = atma.ruta;
    mask        = atma.mask;
    jmask       = mask.jmask;
    Compo       = mask.Compo;
    include     = atma.include;
    includeLib  = atma.includeLib;
    Routes      = ruta.Collection;
    Log         = logger('atma-server');

}());