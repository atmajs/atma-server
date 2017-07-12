import { include, mask, logger, Class } from '../dependency'
import { HttpError } from '../HttpError/HttpError'
import { LIB_DIR } from '../vars'
import { fn_delegate, fn_proxy } from '../util/fn'
import HttpPageBase from './HttpPageBase'
import { 
	page_process, 
	page_resolve, 
	page_pathAddAlias, 
	pageError_sendDelegate, 
	pageError_failDelegate, 
	page_proccessRequest } from './page-utils'


class HttpErrorPage extends HttpPageBase {
				
		constructor (error, pageData, config){
			super();
			this._setPageData(pageData, config);
			this.model = error;
		}
		
		private _setPageData (data, cfg){
			this.data = data;
			
			if (data.masterPath != null) 
				this.masterPath = data.masterPath;
			
			if (data.templatePath != null) 
				this.templatePath = data.templatePath;
			
			if (data.master) 
				this.masterPath = cfg.$getMaster(data);
			
			if (data.template) 
				this.templatePath = cfg.$getTemplate(data);
			
			if (data.compo) 
				this.compoPath = cfg.$getCompo(data);
			
			
			if (this.template == null && this.compoPath == null && this.templatePath == null)
				this.templatePath = cfg.$getTemplate(data);
			
			if (this.master == null && this.masterPath == null)
				this.masterPath = cfg.$getMaster(data);
			
		}
		static send (error, req, res, config){
			var pageCfg = config.page,
				errorPages = pageCfg.errors,
				genericPage = pageCfg.error
				;
				
			var pageData = (errorPages && errorPages[error.statusCode]) || genericPage;
			if (pageData == null) {
				pageData = {
					masterPath: '',
					templatePath:  LIB_DIR.combine('../pages/error/error.mask').toString()
				};
			}
			
			return new HttpErrorPage(error, pageData, config).process(req, res, config);
		}
	
		process (req, res, config){
			this
				.done(pageError_sendDelegate(res, this.model))
				.fail(pageError_failDelegate(res, this.model))
				;
			page_proccessRequest(this, req, res, config);
		}
		
		private _load (){
			
			this.resource = include
				.instance()
				.load(
					page_pathAddAlias(this.masterPath, 'Master'),
					page_pathAddAlias(this.templatePath, 'Template'))
				.js(
					page_pathAddAlias(this.compoPath, 'Compo')
				)
				.done(fn_proxy(this._response, this));
			return this;
		}
		
		
		private _response (resp){
			
			var master = resp.load.Master || this.master,
				template = resp.load.Template || this.template,
				nodes = this.nodes || template
				;
			if (master == null && this.masterPath !== '') {
				this.reject(new HttpError('Page: Masterpage not found'));
				return;
			}
			
			if (nodes == null) {
				this.reject(new HttpError('Page: Template not found'));
				return;
			}
			
			if (master) 
				mask.render(mask.parse(master));
			
			page_process(
				this
				, nodes
				, fn_delegate(page_resolve, this)
			);
		}
	
	};

export default HttpErrorPage;