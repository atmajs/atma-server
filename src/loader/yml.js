include
    .cfg({
        loader: {
            yml: {
                process: function(source, res) {
			
                    var YAML = require('yamljs')
        
                    source = source
                        .replace(/\t/g, '  ');
                        
        
                    try {
                        return YAML.parse(source);
                    } catch (error) {
                        logger.error('<yml parser>', error);
                        return null;
                    }
                }
            }
        }
    });