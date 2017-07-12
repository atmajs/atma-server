import Autoreload from '../Autoreload/Autoreload'
import Application from '../HttpApplication/Application'
import { server } from '../vars';
import { app_isDebug } from '../util/app';

const StaticContent = require('static-content');

Application.on('configurate', function(config, app){
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

server.StaticContent = StaticContent;

export default StaticContent;