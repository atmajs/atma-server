
include.exports = {
    process: function(config, done){
        
        var raw = app.config.raw,
            defaults = raw.defaults,
            actions = defaults.map(function(x){
                if (raw[x] == null) {
                    logger.error('Configuration not found', x);
                    return null;
                }
                return raw[x];
            })
        
        app
            .run(actions)
            .always(function(){
                
                publish(done);
            });
    }
};


function publish(done) {
    
    var file = new io.File('package.json'),
        pckg = file.read();
    
    
    
    pckg.version = increaseVersion(pckg.version);
    
    if (pckg.version == null) {
        logger.log('Invalid package', pckg);
        done('Invalid version');
        return;
    }
    
    file.write(pckg);
    

    app
        .findAction('shell')
        .done(function(handler){
            handler.process({
                command: 'npm publish'
            }, done);
        });
}

function increaseVersion(version) {
    if (typeof version !== 'string') 
        return null;
    
    
    var parts = version
        .split('.')
        .map(function(x){ return x << 0});
        
    if (parts.length !== 3) {
        logger.log('Invalid ver. pattern', version);
        return null;
    }
        
    if (++parts[2] > 100) {
        if (++parts[1] > 100) {
            ++parts[0];
            parts[1] = 0;
        }
        parts[2] = 0;
    }
    
    return parts.join('.');
}