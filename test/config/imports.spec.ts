import Config from '../../src/Config/Config';

UTest({
    'should resolve imports from `both`'() {
        var imports = {
            '/public': {
                'foo/baz': [
                    'a.js', 'b.mask'
                ]
            }
        };
        var config = Config({
            configs: null,
            config: { env: { both: { imports: imports }, client: {} } },
            disablePackageJson: true
        });

        var scripts = config.$getImports('client');
        deepEq_(scripts, [
            { path: '/public/foo/baz/a.js', type: 'script' },
            { path: '/public/foo/baz/b.mask', type: 'mask' },
        ]);
    },
    'should resolve imports from `both` and `server`'() {
        var both = {
            '/public': {
                'foo/baz': [
                    'a.js', 'b.mask'
                ]
            }
        };
        var server = {
            '/public': {
                'foo/qux': [
                    'a.es6', 'b.less'
                ]
            }
        };
        var config = Config({
            configs: null,
            config: { env: { both: { imports: both }, server: { imports: server } } },
            disablePackageJson: true
        });

        var scripts = config.$getImports('server');
        deepEq_(scripts, [
            { path: '/public/foo/baz/a.js', type: 'script' },
            { path: '/public/foo/baz/b.mask', type: 'mask' },
            { path: '/public/foo/qux/a.es6', type: 'script' },
            { path: '/public/foo/qux/b.less', type: 'style' },
        ]);
    }
})