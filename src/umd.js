(function (root, factory) {
    'use strict';


    factory(global, module, module.exports);

    const server = module.exports;

    if (global.atma == null) {
        global.atma = {}
    }
    if (global.atma.server == null) {
        global.atma.server = {};
    }
    // just-in-case, copy the lib to globals
    for (let key in server) {
        global.atma.server[key] = server[key];
    }

}(this, function (global, module, exports) {
    'use strict';

    /**MODULE**/

}));
