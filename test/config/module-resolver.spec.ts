import Application from '../../src/HttpApplication/Application'
import { File } from 'atma-io'

UTest({
    async 'should load commonjs module'() {
        let app = await Application.clean().create({
            configs: null,
            config: {
                env: {
                    server: {
                        scripts: {
                            npm: [
                                'appcfg'
                            ]
                        }
                    }
                }
            }
        });

        let scripts = app.config.env.server.scripts.npm;
        has_(scripts, [
            '/node_modules/appcfg/lib/umd/node/appcfg.js'
        ]);

        is_(app.lib.appcfg, 'Function');
    },
    async 'should load commonjs module with alias'(done) {
        let app = await Application.create({
            configs: null,
            config: {
                env: {
                    server: {
                        scripts: {
                            npm: [
                                'appcfg::Foo'
                            ]
                        }
                    }
                }
            }
        });
        let scripts = app.config.env.server.scripts.npm;

        has_(scripts, [
            '/node_modules/appcfg/lib/umd/node/appcfg.js::Foo'
        ]);
        is_(app.lib.Foo, 'Function');
    },
    'should support array as `main` property': {
        $before() {
            this.path = {
                package: /body-parser\/package\.json$/
            };

            this.package = class PackageFile extends File {
                exists = () => true
                content = <any>{
                    main: [
                        'foo.js',
                        'baz.js',
                        'quux.css'
                    ]
                }
            };


            this.file = class FileFoo extends File {
                exists = () => true
                content = 'Foo'
            };

            const factory = File.getFactory();
            factory.registerHandler(
                this.path.package, this.package
            );

            factory.registerHandler(
                /body-parser\/foo\.js$/, class BpFoo extends File {
                    exists = () => true
                    content = 'var foo = 1';
                }
            );
            factory.registerHandler(
                /body-parser\/baz\.js$/, class BpBaz extends File {
                    exists = () => true
                    content = 'var baz = 1';
                }
            );
            factory.registerHandler(
                /body-parser\/quux\.css$/, class BpQuux extends File {
                    exists = () => true
                    content = 'body {}';
                }
            );
        },
        $after() {
            File.getFactory().unregisterHandler(this.path.package, null);
        },
        async 'javascripts and styles'() {
            let app = await Application.create({
                debug: false,
                configs: null,
                config: {
                    debug: false,
                    env: {
                        server: {
                            scripts: {
                                npm: [
                                    'body-parser'
                                ]
                            }
                        },
                        client: {
                            styles: {
                                npm: [
                                    'body-parser'
                                ]
                            }
                        }
                    }
                }
            });

            let scripts = app.config.env.server.scripts.npm,
                styles = app.config.env.client.styles.npm

            has_(scripts, [
                '/node_modules/body-parser/foo.js',
                '/node_modules/body-parser/baz.js',
            ]);
            has_(styles, [
                '/node_modules/body-parser/quux.css'
            ]);
        }
    }

})
