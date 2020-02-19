import HttpRewriter from '../../src/HttpRewrites/HttpRewriter'

UTest({
    'should rewrite beginning of the path' () {
        testRewriter({
            rule: {
                rule: `^/my-page/(.*) /index/pages/my-page/$1`
            },
            urls: [
                '/my-page/', 
                '/my-page/foo', 
                '/my-page/style.css?foo=bar'
            ],
            targets: [
                '/index/pages/my-page/',
                '/index/pages/my-page/foo',
                '/index/pages/my-page/style.css?foo=bar'
            ]
        });
    },    
    'should rewrite with args' () {
        testRewriter({
            rule: {
                rule: `^/post/(\\d+)/?$ /post.html?post=$1`
            },
            urls: ['/post/15', '/post/21/', '/post/bob' ],
            targets: ['/post.html?post=15', '/post.html?post=21', '/post/bob' ]
        });
    }
})

function testRewriter(testData: { rule?, rules?, urls?, targets?, url?, target? }) {
    var rewriter = new HttpRewriter;
    if (testData.rule) {
        rewriter.addRules([testData.rule]);
    }
    if (testData.rules) {
        rewriter.addRules(testData.rules);
    }
    if (testData.url) {
        check(testData.url, testData.target);
    }
    if (testData.urls) {
        testData.urls.forEach((url, index) => {
            check(url, testData.targets[index]);
        })
    }

    function check(url, target) {
        let req = { url };
        rewriter.rewrite(req as any);
        eq_(req.url, target);
    }
}