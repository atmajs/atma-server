import Application from '../../src/HttpApplication/Application';

declare let mask;

UTest({
    async 'should render dev include'() {
        let app = await Application.clean().create({
            configs: null,
            debug: true,
            config: {
                debug: true,
                env: {
                    client: {
                        imports: {
                            '/public': [
                                'foo.mask',
                                'baz.js'
                            ]
                        }
                    }
                }
            }
        });

        let html = mask.render('atma:scripts;', null, {
            config: app.config,
            page: { data: { id: 'index' } }
        });
        has_(html, ".mask('/public/foo.mask')");
        has_(html, ".js('/public/baz.js')");
    }
})
