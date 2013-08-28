include
    .cfg({
        loader: {
            less: {
                process: function(source, resource, callback) {
			
                   var filename = resource.path_getFile(),
						dir = resource.path_getDir(),
				
						less = require('less'),
						parser = new less.Parser({
							filename: filename,
							paths: [dir]
						});
						
					
					
					parser.parse(source, function(error, tree) {
						var response;
						
						if (error) {
							logger.error('<less:parse>',filename, error);
							return;
						} else {
						
							try {
								response = tree.toCSS();
							} catch (error) {
								logger.error('<less:toCss>', filename, error);
							}
						}
						
						
						callback(response);
					});
                }
            }
        }
    });