var atma,
    io,
    logger;

// <assign first>

// atma libs
if (global.include && global.net && global.net.URI) {
    atma = global;
}
if (atma == null && global.atma) {
    atma = global.atma;
}
if (atma == null) {
    require('atma-libs/globals');
    atma = global;
}

// logger
if (global.logger) {
    logger = global.logger;
}
if (logger == null) {
    require('atma-logger');
    logger = global.logger;
}

// io
if (global.io && global.io.File) {
    io = global.io;
}
if (io == null) {
    require('atma-io');
    io = global.io;
}



var net = atma.net,
    Class = atma.Class,
    ruta = atma.ruta,
    Routes = ruta.Collection,
    logger = global.logger;
    
    
var server = {};
    
