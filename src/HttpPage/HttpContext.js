
function HttpContext(page, req, res){
	this.page = page;
	this.req = req;
	this.res = res;
	
	this._rewrite = null;
	this._redirect = null;
}

HttpContext.prototype = {
	redirect: function(url, code){
		if (code == null) 
			code = 302;
			
		this.res.statusCode = code;
		this.res.setHeader('Location', url);
		this.res.setHeader('Content-Length', '0');
		this.res.end();
		
		this._redirect = url;
	},
	
	rewrite: function(url){
		
		this._rewrite = url;
	}
}
