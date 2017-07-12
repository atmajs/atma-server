"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    /**
     *	Format Path / location as in IncludeJS
     */
    format: function (location, path) {
        if (path.charCodeAt(0) === 47) {
            // /
            if (/\.\w{1,7}$/.test(path) === false) {
                path += '.mask';
            }
            return path;
        }
        var template = path.split('/'), route = location.split(/[\{\}]/g);
        path = route[0];
        for (var i = 1; i < route.length; i++) {
            if (i % 2 === 0) {
                path += route[i];
            }
            else {
                /** if template provides less "breadcrumbs" than needed -
                 * take always the last one for failed peaces */
                var index = parseFloat(route[i]);
                if (index > template.length - 1) {
                    index = template.length - 1;
                }
                path += template[index];
                if (i === route.length - 2) {
                    for (index++; index < template.length; index++) {
                        path += '/' + template[index];
                    }
                }
            }
        }
        return path;
    }
};
