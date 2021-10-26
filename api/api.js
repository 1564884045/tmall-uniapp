// request请求
// class:继承，私有方法，私有属性，静态方法。。。。
let Base64 = require('./base64.js').Base64
const request = class{
	constructor(url,arg) {
	    this.url = url
		this.arg = arg
	}
	
	// post
	modepost(){
		return new Promise((resolve,reject)=>{
			uni.request({
				url:this.url,
				method:'POST',
				data:this.arg,
				header:{Authorization:this.baseFun()}
			})
			.then(res=>{
				resolve(res[1].data)
			})
			.catch(err=>{
				reject('出错了')
			})
		})
	}
	
	// get
	modeget(){
		return new Promise((resolve,reject)=>{
			uni.request({
				url:this.url,
				method:'GET',
				header:{Authorization:this.baseFun()}
			})
			.then(res=>{
				resolve(res[1].data)
			})
			.catch(err=>{
				reject('出错了')
			})
		})
	}
	
	// 加密token
	baseFun(){
		const token = uni.getStorageSync('wxuser').token
		const base64 = Base64.encode(token+':')
		return 'Basic ' + base64
	}
	
}

export default request