var atma,
    io,
    net,
    Class,
    ruta,
    mask,
    include,
    Routes,
    logger;

// <assign first>

// atma libs
if (global.include && global.net && global.net.Uri) 
    atma = global;

if (atma == null && global.atma) 
    atma = global.atma;

if (atma == null) {
    require('atma-libs/globals-dev');
    atma = global;
}

// logger
if (global.logger)
    logger = global.logger;

if (logger == null) {
    require('atma-logger');
    logger = global.logger;
}

// io
if (global.io && global.io.File) 
    io = global.io;

if (io == null) {
    require('atma-io');
    io = global.io;
}



net     = atma.net;
Class   = atma.Class;
ruta    = atma.ruta;
mask    = atma.mask;
include = atma.include;
Routes  = ruta.Collection;
logger  = global.logger;
    
    
    
