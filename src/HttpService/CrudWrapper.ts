import HttpServiceStatics from './static'
import { HttpError } from '../HttpError/HttpError'

export default {
	Single: function(name, Ctor){
		
		var proto = {},
			property = name,
			bodyParser = HttpServiceStatics.classParser(name, Ctor),
			bodyPatchParser = HttpServiceStatics.classPatchParser(name, Ctor),
			
			properties = Class.properties(Ctor)
			;
		
		Object
			.keys(properties)
			.forEach(function(key){
				properties['?' + key] = properties[key];
				delete properties[key];
			})
			;
		
		
		proto['$get /' + name + '/:id'] = {
			meta: {
				response: properties
			},
			process: function(req, res, params){
			
				await(
					this,
					Ctor.fetch({ _id: params.id })
				);
			}
		};
		
		proto['$put /' + name + '/:id'] = {
			meta: {
				description: 'Update existed entity',
				arguments: properties,
				response: properties
			},
			process: [
				bodyParser,
				function(req, res, params){
					var x = req[property];
					x._id = params.id;
					
					await(this, x.save());
				}
			]
		};
		
		proto['$post /' + name] = {
			meta: {
				description: 'Create new entity',
				arguments: properties,
				response: properties,
			},
			process: [
				bodyParser,
				function(req){
					var x = req[property];
					delete x._id;
					await(this, x.save());
				}
			]
		};
		
		proto['$delete /' + name + '/:id'] = {
			meta: {
				description: 'Remove entity'
			},
			process: function(req, res, params) {
				var x = new Ctor({ _id: params.id });
				await(this, x.del());
			}
		}
		
		proto['$patch /' + name + '/:id'] = {
			meta: {
				description: 'Modify existed entity. `patch object` syntax is similar to MongoDB\'s'
			},
			process: [
				bodyPatchParser,
				function (req, res, params) {
					
					var json = req.body,
						instance = new Ctor({_id: params.id}).patch(json)
						;
					
					await(this, instance);
				}
			]
		};
		
		
		return proto;
	},
	Collection: function(name, Ctor){
		
		var proto = {},
			property = name,
			bodyParser = HttpServiceStatics.collectionParser(property, Ctor),
			properties = Class.properties(Ctor.prototype._ctor)
			;
		
		proto['$get /' + name] = {
			meta: {
				response: [ properties ]
			},
			process: function(){
				await(this, Ctor.fetch({}));
			}
		};
		
		var upsert = {
			meta: {
				description: 'Create or update(if _id is present) entries',
				arguments: [ properties ]
			},
			process: [
				bodyParser,
				function(req) {
					await(this, req[property].save());
				}
			]
		};
		
		proto['$put /' + name] = upsert;
		proto['$post /' + name] = upsert;
		proto['$delete /' + name] = {
			meta: {
				arguments: [ {_id: 'string'} ]
			},
			process: [
				function(req, res,params, next){
					if (Array.isArray(req.body) === false) {
						next('Invalid arguments. Array expected');
						return;
					}
					
					var imax = req.body.length,
						i = -1;
					while ( ++i < imax ){
						if (req.body[i]._id)
							continue;
						
						next('`_id` property expected at ' + i);
						return;
					}
					
					req[property] = new Ctor(req.body);
				},
				function(req) {
					await(this, req[property].del());
				}
			]
		};
		
		proto['$patch /' + name] = {
			meta: {
				description: '<is not supported>'
			},
			process: function(){
				this.reject(new HttpError('`PATCH` is not supported for collections'));
			}
		};
		
		return proto;
	}
};

function await(service, instance){
	instance
		.done(service.resolveDelegate())
		.fail(service.rejectDelegate())
		;
}
