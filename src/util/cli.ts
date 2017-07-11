
export function cli_arguments () {
	
	var argv = process.argv,
		imax = argv.length,
		i = 2,
		args = {
			args: []
		},
		x;
	
	for (; i < imax; i++){
		x = argv[i];
		
		if (x[0] === '-') {
			args[x.replace(/^[\-]+/, '')] = true;
			continue;
		}
		
		var eq = x.indexOf('=');
		if (eq !== -1) {
			args[x.substring(0, eq)] = x.substring(eq + 1);
			continue;
		}
		
		args.args.push(x);
	}
	
	return args;
};
