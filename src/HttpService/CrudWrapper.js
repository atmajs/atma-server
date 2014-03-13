
(function(){
	
	server.HttpCrudEndpoints = {
		Single: function(name, Ctor){
			var proto = {},
				property = name,
				bodyParser = server.HttpService.parseClass(name, Ctor)
				;
			
			proto['$get /' + name + '/:id'] = function(req, res, params){
				
				await(
					this,
					Ctor.fetch({ _id: params.id })
				);
			
			};
			
			proto['$put /' + name + '/:id'] = [
				bodyParser,
				function(req){
					
					await(this, req[property].save());
				}
			];
			
			proto['$post /' + name] = [
				bodyParser,
				function(req){
					await(this, req[property].save());
				}
			];
			
			proto['$delete /' + name + '/:id'] = function(req, res, params) {
				var instance = new Ctor({_id: params.id }).delete();
				
				await(this, instance);
			};
			
			proto['$patch /' + name + '/:id'] = [
				bodyParser,
				function (req) {
					var json = req[property].toJSON(),
						instance = new Ctor({id: _id}).patch(json)
						;
					await(this, instance);
				}
			];
			
			return proto;
		},
		Collection: function(name, Ctor){
			
			var proto = {},
				property = name,
				bodyParser = server.HttpService.parseClass(property, Ctor)
				;
			
			proto['$get /'] = function(){
				await(this, Ctor.fetch({}));
			};
			
			proto['$post /'] = [
				bodyParser,
				function(req) {
					await(this, req[property].save());
				}
			];
			
			proto['$put /'] = [
				bodyParser,
				function(req) {
					await(this, req[property].save());
				}
			];
			
			proto['$delete /'] = [
				bodyParser,
				function(req) {
					await(this, req[property].delete());
				}
			];
			
			proto['$patch /'] = function(){
				this.reject(HttError('`PATCH` is not supported for collections'));
			};
			
			return proto;
		}
	};
	
	
	function await_instance(service, instance){
		instance
			.done(service.resolveDelegate())
			.fail(service.rejectDelegate())
			;
	}
	
}());