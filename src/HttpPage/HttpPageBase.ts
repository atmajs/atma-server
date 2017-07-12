import { include, mask, logger, Class } from '../dependency'
import {mime_HTML} from '../const/mime'

export default class HttpPageBase extends Class.Deferred<HttpPageBase> {
	data = {
		id: null,
		env: null
	}
	
	template
	master
	
	ctx
	
	templatePath
	masterPath
	
	route
	query
	model

	compoPath: string

	resource

	nodes

	app
	middleware

	onRenderStart:Function

	//mimeType = mime_HTML

	getScripts (config){
		return config.$getScripts(this.data.id);
	}
	
	getStyles (config){
		return config.$getStyles(this.data.id);
	}
};
