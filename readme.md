Atma Node.js Server Module
----

- [Overview](#overview)
- [Configuration](#configuration)
	- [Resources](#resources)
	- [Routing](#routing)
- [Endpoints](#endpoints)
	- [Handler](#handler)
	- [Service](#httpservice)
		- [Routes](#service-routes)
		- [Endpoints](#service-endpoints)
		- [Barricade](#barricades-middlewares)
		- [Example](#service-and-the-application-routing-example)
	- [Page](#httppage)
		- [Master View](#master-view)
		- [Page View](#page-view)

## Overview
_Can be used as a [Connect](http://www.senchalabs.org/connect/) Middleware_

This module uses:

- [Atma.js libs](https://github.com/atmajs/atma.libs)
- [atma.logger](https://github.com/atmajs/atma-logger)
- [atma.io](https://github.com/atmajs/atma-io)
- [appcfg](https://github.com/atmajs/appcfg)

To setup a bootstrap project use Atma.Toolkit - ``` $ atma gen server ```

## Configuration
[appcfg](https://github.com/atmajs/appcfg) module is used to load the configurations and routings. The default path is the ``` /server/config/**.yml ```.

The default configuration can be viewed here - [link](https://github.com/atmajs/atma-server/tree/master/src/ConfigDefaults)

#### Resources
_scripts / styles_ for the NodeJS application itself and for pages. They are defined in
- `config/env/both.yml` - shared resources
- `config/env/server.yml` - resources for the nodejs application, e.g. server side components paths.
- `config/env/client.yml` - resources, that should be loaded on the client.
	
	In the DEV Mode all client-side scripts/styles/components are served to browsers without concatenation.
	For the production compile resources with `atma custom node_modules/atma-server/tools/compile`
	
- Define scripts and styles for a particular page only _in page routing_.

#### Routing

- **handlers** ` config/handlers.yml `
	```yml
	handler:
		location: /server/http/handler/{0}.js
		#< default
	handlers:
		# route - resource that exports a HttpHandler
		'/foo': 'baz'
			# path is '/server/http/handler/baz.js'
			# method is '*'
		
		'$post /qux': 'qux/postHandler'
			# path is '/server/http/handler/quz/postHander.js'
			# method is 'POST'
	```

- **services** ` config/services.yml `
	```yml
	service:
		location: /server/http/service/{0}.js
		#< default
	services:
		# route - resource that exports a HttpService @see HttpService
		'/user': 'User'
			# path is '/server/http/service/User.js'
			# method is '*'
			# futher routing is handled by the service, like '/user/:id'
	```
- **pages** ` config/pages.yml `
	```yml
	page:
		# see default config to see the default page paths
	
	pages:
		# route - Page Definition
		
		/:
			id: index #optional, or is generated from the route
				
			template: quz #optional, or is equal to `id`
				# path is `/server/http/page/quz/quz.mask
			master: simple #optional, or is `default`
				# path is `/server/http/master/simple.mask`
			
			# optional
			secure:
				# optional, default - any logged in user
				role: 'admin'
			
			scripts:
				# scripts for the page
			styles:
				# styles for the page
			
			# any other data, which then is accessable via javascript or mask
			# `ctx.page.data.title`
			title: String
	```
	
## Endpoints

There are 3 types of endpoints:

- [Handler (generic handler)](#handler)
- [HttpService (RESTful service)](#httpservice)
- [HttpPage](#httppage)

### Handler

To declare a Handler is as simple as to define a Class/Constructor with Deferred(_Promise_) Interface and `process` function in prototypes, like this

```javascript
// server/http/handler/hello.js
module.exports = Class({
	Base: Class.Deferred,
	process: function(req, res){
		this.resolve(
			data String | Object | Buffer,
			?statusCode Number,
			?mimeType String,
			?headers Object
		);
		this.reject(error)
	}
});
```

To bind for a route(`server/config/handlers.yml`):
```yml
handler:
	location: '/server/http/handler/{0}.js'
	# <- default
handlers:
	'/say/hello': Hello
	'(\.less(\.map)?$)': LessHandler
	'(\.es6(\.map)?$)': TraceurHandler
```

Handler is the first endpoint that will be looked for by the responder.
Usually, this are the low level handlers, like 'less' preprocessor. 
But the interface ``` (Deferred + process(req, res)) ``` is same also for HttpService and HttpPage


### HttpService

##### Service routes
For route docs refer to [RutaJS](http://github.com/atmajs/ruta)

Sample:
```javascript
module.exports = atma.server.HttpService({
	'$get /': Function | Endpoint
	'$post /': ...
	'$get /:name(foo|bar|qux)': ...
	'$put /user': ...
})
```

##### Service endpoints
###### Function

```javascript
atma.server.HttpService(/* endpoints */ {
	// route - handler
	route: function(req, res, params){
		this.resolve(/* @see Handler */);
		this.reject(...);
	}
	// route - handler with `help` information
	route: {
		help {
			description: String,
			arguments: {
				foo: 'string',
				...
			},
			response: {
				baz: 'string',
				...
			}
		}
		process: function(req, res, params) { ... }
	}
})
```
> Help feature will list all endpoints of a service with there meta information. `http://127.0.0.1/rest/user?help`


###### Barricades (_Middlewares_)
```javascript
atma.server.HttpService({
	// route - Barricade (Middleware pattern)
	route: [
		function(req, res, params, next){
			// error example
			if (req.body.name == null){
				next('Name argument expected');
				return;
			}
			
			// continue
			req.name = req.body.name;
			next();
			
			// stop processing
			this.resolve(...);
			this.reject(...);
		},
		function(req, res, params, next){
			...
		},
		...
	],
	
	// same with `help`
	route: {
		help: { ... }
		process: [
			fooFunction,
			bazFunction,
			...
		]
	}
})
```

##### Service and the application routing example 

```javascript
// server/http/service/time.js
module.exports = atma.server.HttpService({
	'/': function(req, res){
		this.resolve('This is a time service');
	},
	'/:transport(console|file|client)': function(req, res, params){
		var time = new Date().toString(),
			that = this;
		switch(params.transport){
			case 'console':
				console.log(' > time', time);
				this.resolve('Pushed to console');
				return;
			case 'file':
				var that = this;
				fs.write('someFile.txt', time, function(error){
					if (error) return that.reject(error);
					that.resolve('Saved to file');
				});
				return;
			case 'client':
				this.resolve(time);
				return;
		}
	}
})
```

```yml
# server/config/services.yml

service:
	location: /server/http/service/{0}.js'
	# <- default

services:
	'/time': time
```


### HttpPage

HttpPage consists of 3 parts

- Controller
- Master View Template
- View Template

You would rare redefine the default controller, as each Page should consist of a component composition,
so that the logic could be moved to each component. We wont explain what a component is, as you should refer to [MaskJS](https://github.com/atmajs/mask) and [MaskJS.Node](https://github.com/atmajs/mask-node)
Some things we remind:

- **Context**
	```javascript
	{ req: <Request>, res: <Response>, page: <HttpPage (current instance)> }
	```
- **Render-mode**
	- ```javascript
		mode: 'server' | 'client' | 'both' // @default is 'both'
		modeModel: 'server' // if `server` is defined, the model wont be serialized
	```
- **Cache**
	Each components output could be cached and the conditions could be defined.
	- `byProperty`: For each unique value from model or ct

_Example_
```javascript
mask.registerHandler(':requestedUrl', Compo({
	mode: 'server:all'
	modelMode: 'server:all'
	cache: {
		byProperty: 'ctx.req.url'
	},

	onRenderStart: function(model, ctx){
		this.nodes = jmask('h4').text(ctx.req.url);
	}
}))
```

Going back to the HttpPage, lets start from a master view template

#### Master View

Refer to the [layout component](http://atmajs.com/compo/layout)

Example:
```sass
// server/http/master/default.mask
layout:master #default {
	:document {
		
		head {
			meta http-equiv="Content-Type" content="text/html;charset=utf-8";
			meta name="viewport" content="maximum-scale=1.5, minimum-scale=.8, initial-scale=1, user-scalable=1";
			title > "Atma.js"

			atma:styles;
		}
		body {
			
			@placeholder #body;
			
			atma:scripts;
		}
	}
}
```


#### Page View

```sass
// server/http/page/hello.mask
layout:view master=default {
	@content #body {
		'Hello World'
	}
}
```

The routing is also made via configuration files

```yml
# server/config/pages.yml

page: 
	location:
		# controller: '/server/http/page/{0}/{1}.js'
		# template: '/server/http/page/{0}/{1}.mask'
		# master: '/server/http/master/{0}.mask'
		# <- this all are defaults

pages: 
	'!/hello': 
		template: hello
		master: default #<- default

		# also other data could be here defined, and then accessed in components onRenderStart like: ``` ctx.page.data.title ```
		title: Hello
```


----
(c) 2014 MIT
