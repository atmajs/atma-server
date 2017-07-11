import Application from '../HttpApplication/Application';

enum Debug {
	Unknown, Yes, No
}
let debug = Debug.Unknown;
export function app_isDebug (): boolean {
	if (debug !== Debug.Unknown) {
		return debug === Debug.Yes;
	}
	const app = Application.current;
	if (app == null) 
		return false;
	
	var isDebug = Boolean(app.args.debug || app.config.debug);
	if (isDebug !== true) {
		var env = process.env.NODE_ENV || process.env.ENV;
		if (env) {
			isDebug = /^(test|debug)$/i.test(env);
		}
	}
	debug = isDebug ? Debug.Yes : Debug.No;
	return isDebug;
};