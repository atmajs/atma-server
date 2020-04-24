import { app_isDebug } from '../util/app';
import { Autoreload } from '../Autoreload/Autoreload'
import Application from '../HttpApplication/Application'

const StaticContent = require('static-content');

Application.on('configurate', function(app){
	if (app.isRoot === false || app_isDebug() === false) {
		return;
	}
	StaticContent.on('file', file => {
		Autoreload.watchFile(file)
	});
	Autoreload.getWatcher().on('fileChange', (path, file) => {
		StaticContent.Cache.remove(file);
	});
});

export default StaticContent;