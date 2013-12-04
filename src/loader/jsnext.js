include
    .cfg({
        loader: {
            jsnext: {
                process: function(source, resource, callback) {
					
					var Traceur = require('traceur');

					var file = new Traceur
							.syntax
							.SourceFile(resource.url, content),
							
						reporter = new Traceur
							.util
							.ErrorReporter(),
							
						tree = Traceur
							.codegeneration
							.Compiler
							.compileFile(reporter, file),
					
						jscode = Traceur
							.outputgeneration
							.TreeWriter
							.write(tree)
						;

					return jscode;
				}
            }
        }
    });