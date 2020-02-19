declare var atma;

UTest({
    $config: <any>{
        'http.eval': function () {

            var FooService = atma.server.HttpService({
                '$get /': {
                    meta: {
                        description: 'FooService'
                    },
                    process: function () { }
                },
                '$post /': {
                    meta: {
                        arguments: {
                            'username': 'string',
                            '?password': /^\d+$/
                        }
                    },
                    process: function () {
                        this.resolve('success');
                    }
                }
            });

            atma
                .server
                .app
                .handlers
                .registerService('/help-foo', FooService);
        }
    },

    'service help test': function (done) {
        UTest
            .server
            .request('/help-foo?help', function (error, array) {
                has_(array, [{
                    method: 'GET',
                    path: '/',
                    description: 'FooService'
                }, {
                    method: 'POST',
                    path: '/',
                    arguments: {
                        username: 'string',
                        '?password': '/^\\d+$/'
                    }
                }]);
                done();
            })
    },

    'service meta check - fail': function (done) {
        $
            .ajax({
                url: '/help-foo',
                contentType: 'application/json',
                data: JSON.stringify({
                    username: 23
                }),
                type: 'POST'
            })
            .done(assert.avoid(done))
            .fail(function (xhr) {
                has_(xhr.responseText, 'Property: username');
                has_(xhr.responseText, '"code":400');
                done();
            });
    }
})