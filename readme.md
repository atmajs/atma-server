Atma Node.js Server Module
----
[![Build Status](https://travis-ci.org/atmajs/atma-server.svg?branch=master)](https://travis-ci.org/atmajs/atma-server)
[![NPM version](https://badge.fury.io/js/atma-server.svg)](http://badge.fury.io/js/atma-server)

- [Overview](#overview)
- [Application](#httpapplication)
- [Configuration](#configuration)
	- [Resources](#resources)
	- [Routing](#routing)
- [Endpoints](#endpoints)
	- [Sub-Application](#subapplication)
	- [Handler](#handler)
    - [Endpoint](#httpendpoint)
	- [Service](#httpservice)
		- [Routes](#service-routes)
		- [Endpoints](#service-endpoints)
		- [Help & Validation](#meta---help--validation)
		- [Barricade](#barricades-middlewares)
		- [Example](#service-and-the-application-routing-example)
	- [Page](#httppage)
		- [Master View](#master-view)
		- [Page View](#page-view)
		
- [Preprocessors](#preprocessors)

## Overview
_Can be used as a [Connect](http://www.senchalabs.org/connect/) Middleware_

This module uses:

- [Atma.js libs](https://github.com/atmajs/atma.libs)
- [atma-logger](https://github.com/atmajs/atma-logger)
- [atma-io](https://github.com/atmajs/atma-io)
- [appcfg](https://github.com/atmajs/appcfg)

To setup a bootstrap project use Atma.Toolkit - ``` $ atma gen server ```

## HttpApplication
```javascript
var atma = require('atma-server');
atma
	.server
	.Application({
		base:__dirname,
		configs: '/server/config/**.yml'
	})
	.done(function(app){
		// configuration and resources are loaded
		app
			.processor({
				// pipeline is executed on every request
				before: [
					function(req, res, next){ next() },
				]
				// this pipeline is executed only if the application finds any endpoint
				// (server, handler, page, subapp)
				moddleware: [
					// refer to connectjs middleware documentation
					function(req, res, next){ next() },
					require('body-parser').json(),
				],
				// otherwise, if response was not completed by any middleware or any endpoint before
				// continue with this middleware pipeline.
				after: [
					function(req, res, next){ next() },
					atma.server.middleware.static
				]
			})
			
			// start server, portnumber is taken from the configuration
			.listen();
		
		// or start the server manually:
		var server = require('http')
			.createServer(app.process)
			.listen(app.config.$get('port'));
			
		if (app.config.debug)
			app.autoreload(server);
	});
```

## Configuration
[appcfg](https://github.com/atmajs/appcfg) module is used to load the configurations and the routings. Default path is the ``` /server/config/**.yml ```.

The default configuration can be viewed here - [link](https://github.com/atmajs/atma-server/tree/master/src/ConfigDefaults)

#### Resources
_scripts / styles_ for the NodeJS application itself and for the web pages. They are defined in:
- `config.env.both.scripts<Object|Array>`
	
	`config/env/both.yml`   - shared resources
- `config.env.server.scripts<Object|Array>`
	
	`config/env/server.yml` - resources for the nodejs application, e.g. server side components paths.
- `config.env.client.scripts<Object|Array>`, `config.env.client.styles<Object|Array>`
	
	`config/env/client.yml` - resources, that should be loaded on the client.
	
	In the DEV Mode all client-side scripts/styles/components are served to browsers without concatenation.
	For the production compile resources with `atma custom node_modules/atma-server/tools/compile`
	
- Define scripts and styles for a particular page in page routing.

#### Routing

- **subapps** ` config/app.yml `

	```yml
	subapps:
		// all `rest/*` requests are piped to the Api Application
		// `Api.js` should export the `atma.server.Application` instance
		'rest': '/../Api.js'
	```
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

			# rewrite the page request to some other route
			rewrite: String

			# redirect the page request to some other route
			redirect: String
	```
	
## Endpoints

There are 4 types of endpoints _in route lookup order_
- [Sub Application](#sub-application)
- [Handler (generic handler)](#handler)
- [HttpService/Endpoint (RESTful service)](#httpservice)
- [HttpPage](#httppage)

### Sub Application
We support application nesting, that means you can bind another server application instance for the route e.g. `/api/` and all `/api/**` requests are piped to the app.
Each application instance has its own settings and configurations. This allows to create highly modular and composit web-applications.


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

Usually, this are the low level handlers, like 'less' preprocessor. 
But the interface ``` (Deferred + process(req, res)) ``` is same also for HttpService and HttpPage

### HttpEndpoint

Class and decorators oriented [HttpService](#httpservice)

```typescript
import { HttpEndpoint } from 'atma-server'

@HttpEndpoint.isAuthorized()
export default class MyEndpoint extends HttpEndpoint {

    @HttpEndpoint.isInRole('admin')
    async '$get /' () {
        return Promise.resolve({ foo: 1})
    }
}
```

**Decorators** can be applied to the class or methods

* `HttpEndpoint.isAuthorized()`
* `HttpEndpoint.isInRole(...roles: string[])`
* `HttpEndpoint.hasClaim(...roles: string[])`
* `HttpEndpoint.origin(origin: string = "*")`
* `HttpEndpoint.middleware(fn: (req, res?, params?) => Promise<any> | any | void)`
* `HttpEndpoint.createDecorator(methods: ICreateDecorator)`

```typescript
interface ICreateDecorator {
    forCtor (Ctor: Function, meta: IHttpEndpointMeta): Function | void;
    forMethod (Proto: any, method: IHttpEndpointMethod): IHttpEndpointMethod | void
}
```

### HttpService

##### Service routes
_For the route docs refer to [RutaJS](http://github.com/atmajs/ruta)_

Sample:
```javascript
module.exports = atma.server.HttpService({
	'$get /': Function | Endpoint
	'$post /': ...
	'$get /:name(foo|bar|qux)': ...
	'$put /user': ...
})
```

#### Service endpoints
##### Function

```javascript
atma.server.HttpService(/*endpoints*/ {
	// route:handler
	'route': function(req, res, params){
		this.resolve(/*@see Handler*/);
		this.reject(...);
	},
	
	'route': {
		process: function(){ ... }
	}
})
```

##### Meta - help & validation
 - **help** - list all endpoints of a service with there meta information. `http://127.0.0.1/rest/user?help`
 - **validation** - when sending data with `post`/`put`, httpservice will validate it before processing
	```javascript
	atma.server.HttpService({
		'/route': {
			meta: {
				description: 'Lorem...',
				
				/* For request validating and the documentation */
				arguments: {
					// required, not empty string
					foo: 'string',
					// required, validate with regexp
					age: /^\d+$/,
					
					// optional, of type 'number'
					'?baz': 'number',
					
					// unexpect
					'-quz': null,
					
					// validate subobject
					jokers: {
						left: 'number',
						right: 'number'
					},
					
					// validate arrays
					collection: [ {_id: 'string', username: 'string'} ]
				},
				// allow only properties which are listed in `arguments` object
				strict: false,
				
				/* Documentation purpose only*/
				response: {
					baz: 'string',
					...
				}
			},
			process: function(req, res, params) { ... }
		}
	})
	```
	- *Headers* Set default headers for the service
	```javascript
	atma.server.HttpService({
		'/route': {
			meta: {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
				}
			},
			process: function(req, res, params) { ... }
		}
	});
	```

###### Barricades (_Middlewares_)
```javascript
atma.server.HttpService({
	// route - Barricade (Middleware pattern)
	'/route': [
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
	'/other/route': {
		meta: { ... }
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
				io
					.File
					.writeAsync('someFile.txt')
					.pipe(this, 'fail')
					.done(() => {
						this.resolve('Saved to file');
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
	
	```javascript
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

The routing is also made via the configuration files

```yml
# server/config/pages.yml

pages: 
	'/hello': 
		id: hello
```


### Preprocessors

E.g., to use `ES6` or `Less` files, please install server plugins
- [TraceurCompiler](https://github.com/atmajs/atma-loader-traceur)
- [Less](https://github.com/atmajs/atma-loader-less)

```bash
# atma.toolkit, is only a helper util to intall plugins (further on is not required)
$ npm i atma -g
$ atma plugin install atma-loader-traceur
$ atma plugin install atma-loader-less
```

----
:copyright: ``` 2014-2015; MIT; The Atma.js Project ```
