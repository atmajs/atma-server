"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = require("../dependency");
dependency_1.include
    .cfg({
    loader: {
        yml: {
            process: function (source, res) {
                var YAML = require('yamljs');
                source = source
                    .replace(/\t/g, '  ');
                try {
                    return YAML.parse(source);
                }
                catch (error) {
                    dependency_1.logger.error('<yml parser>', error);
                    return null;
                }
            }
        }
    }
});
