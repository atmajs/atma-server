(function (root, factory) {
    'use strict';


    factory(global, module, module.exports);

    const server = module.exports;

    if (global.atma == null) {
        global.atma = {}
    }
    if (global.atma.server) {
        Object.assign(global.atma.server, server);
    } else {
        global.atma.server = server;
    }
    
}(this, function (global, module, exports) {
    'use strict';

    /**MODULE**/

}));
