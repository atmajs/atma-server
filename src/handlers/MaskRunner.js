(function(){

	HandlerFactory.Handlers.MaskRunner = Class({
		Extends: server.IHttpHandler,

		app: null,

		Construct: function (route, app) {
			this.app = app;
			this.route = route;
		},

		process: function (req, res, config) {
			var url = req.url.replace(/\.\w+$/, '');
			//var path = server.StaticContent.utils.resolvePath(url, config);
			//if (typeof path !== 'string') {
			//	send_Error(res, HttpError('Endpoint not allowed: ' + req.url, 401))
			//	return;
			//}
			//if (io.File.exists(path) === false) {
			//	send_Error(res, HttpError('Endpoint not found: ' + req.url, 404))
			//	return;
			//}

			var route = {
				current: this.route.current,
				value: { template: url, master: null }
			};
			var page = new server.HttpPage(route, this.app);
			page
				.process(req, res, config)
				.pipe(this);

			return this;
		}
	});

}());