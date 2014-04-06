module.exports = {
	
	suites: {
		'service-dom': {
			exec: 'dom',
			tests: 'test/service-dom/**.test'
		},
		'service-node': {
			exec: 'node',
			tests: 'test/service-node/**.test'
		},
		
		'examples': {
			exec: 'browser',
			tests: 'test/examples/**.test'
		}
	}
};