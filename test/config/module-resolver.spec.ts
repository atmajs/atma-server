import Application from '../../src/HttpApplication/Application'
import { File } from 'atma-io'

UTest({
    'should load commonjs module'(done) {
        Application.clean().create({
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
        })
            .done(app => {
                var scripts = app.config.env.server.scripts.npm;

                has_(scripts, [
                    '/node_modules/appcfg/lib/config.js'
                ]);
                is_(app.lib.config, 'Function');
                done();
            })
    },
    'should load commonjs module with alias'(done) {
        Application.create({
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
        })
            .done(app => {
                var scripts = app.config.env.server.scripts.npm;

                has_(scripts, [
                    '/node_modules/appcfg/lib/config.js::Foo'
                ]);
                is_(app.lib.Foo, 'Function');
                done();
            })
    },
    'should support array as `main` property': {
        $before() {
            this.path = {
                package: /body-parser\/package\.json$/
            };
            this.package = class extends File {
                exists = () => true
                content = <any>{
                    main: [
                        'foo.js',
                        'baz.js',
                        'quux.css'
                    ]
                }
            };
            this.file = class extends File {
                exists = () => true
                content = 'Foo'
            };
            File.getFactory().registerHandler(
                this.path.package, this.package
            );
        },
        $after() {
            File.getFactory().unregisterHandler(this.path.package, null);
        },
        'javascripts and styles'(done) {
            Application.create({
                configs: null,
                config: {
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
            })
                .done(app => {
                    var scripts = app.config.env.server.scripts.npm,
                        styles = app.config.env.client.styles.npm

                    has_(scripts, [
                        '/node_modules/body-parser/foo.js',
                        '/node_modules/body-parser/baz.js',
                    ]);
                    has_(styles, [
                        '/node_modules/body-parser/quux.css'
                    ]);
                    done();
                })
        }
    }

})