import { include, mask, logger, Class } from '../dependency'
import {mime_HTML} from '../const/mime'
import Application from '../HttpApplication/Application'

export default class HttpPageBase extends Class.Deferred {
	data = {
		id: null,
		env: null
	}
	isHtmlPage = false
	template: string
	master: string
	
	ctx: any
	
	templatePath: string
	masterPath: string
	
	query: any
	model: any

	compoPath: string

	resource

	nodes

	middleware

	onRenderStart:Function

	constructor(public route, public app: Application) {
		super();
	}

	//mimeType = mime_HTML

	getScripts (config){
		return config.$getScripts(this.data.id);
	}
	
	getStyles (config){
		return config.$getStyles(this.data.id);
	}
};
