include
    .cfg({
        loader: {
            coffee: {
                process: function(source, res) {
			
                    return require('coffee').compile(source);
                }
            }
        }
    });