import Config from '../../src/Config/Config';

UTest({
    '//should resolve pages and its rewrites from folder'() {
        var imports = {
            '/public': {
                'foo/baz': [
                    'a.js', 'b.mask'
                ]
            }
        };
        var config = new Config({
            base: './examples/',
            configs: null,
            config: {
                debug: true,
                env: {
                    both: {
                        imports: imports
                    },
                    client: {}
                },
                page: {
                    location: {
                        pageFiles: 'pages/'
                    }
                }
            },
            disablePackageJson: true
        });


        return config.then(config => {
            console.log('OK');
        })
    }
})