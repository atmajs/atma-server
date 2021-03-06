import Application from '../../src/HttpApplication/Application';

declare var mask;

UTest({
	'should render dev include' (done) {
		var app = Application.clean().create({
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
		app.done(() => {
			var html = mask.render('atma:scripts;', null, {
				config: app.config,
				page: { data: { id: 'index' }}
			});
			has_(html, ".mask('/public/foo.mask')");
			has_(html, ".js('/public/baz.js')");
			done();
		})
	}
})