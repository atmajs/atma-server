
module.exports = {
	$config: {
		$before () {
            include
				.cfg('extentionDefault', { js: 'ts' })
                .cfg('amd', true);
		}	
	},
	suites: {
		'service-dom': {
			exec: 'dom',
			env: 'test/service-dom/before.js',
			tests: 'test/service-dom/**.spec.ts',
		},
		'service-node': {
			exec: 'node',
			env: '/lib/server.js',
			tests: 'test/service-node/**.spec.ts'
		},

		'errors': {
			exec: 'node',
			env: '/lib/server.js',
			tests: 'test/error/**.spec.ts'
		},

		'examples': {
			exec: 'browser',
			tests: 'test/examples/**.spec.ts'
		},

		'page': {
			exec: 'node',
			env: '/lib/server.js',
			tests: 'test/page/**.spec.ts'
		},

		'config': {
			exec: 'node',
			env: '/lib/server.js',
			tests: 'test/config/**.spec.ts'
		},

		'compo': {
			exec: 'node',
			env: '/lib/server.js',
			tests: 'test/compo/**.spec.ts'
		},


		'handlers': {
			exec: 'node',
			env: '/lib/server.js',
			tests: 'test/handlers/**.spec.ts'
		}
	}
};