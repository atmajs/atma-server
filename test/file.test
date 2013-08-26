


include
    .inject('/lib/io.js')
    .done(function(){
        
        var path_File = 'test/file.test',
            path_Copy = 'test/copied.js';
            
        
        function init(path) {
            return new io.File(path);
        }
        
        var file = init(path_File);
        
        
        
        eq(file.exists(), true);
        
        if (init(path_Copy).exists()) {
            init(path_Copy).remove();
            
            eq(init(path_Copy).exists(), false);
        }
        
        assert(file
            .read()
            .indexOf('.inject') > -1);
        
        file.copyTo(path_Copy);
        
        eq(init(path_Copy).exists(), true);
    });