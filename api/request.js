// 请求地址
const url = 'https://meituan.thexxdd.cn/api/'

const urls = class{
	// constructor:构造方法
	constructor() {
	    
	}
	// static：静态方法:直接使用类来调用，不是静态方法，需要实例化类，也就是new
	static m(){
		// 首页轮播图
		let bannerget = `${url}getbanner`
		// 推荐抢购商品
		let getrecommurl = `${url}recom`
		// 天猫榜单
		let billboardurl = `${url}billboard`
		// 首页卡片流商品
		let commodcradurl = `${url}commodcrad`
		// 商品搜索
		let searchurl = `${url}search`
		// 商品详情页{商品介绍}
		let introduceurl = `${url}introduce`
		// 商品参数
		let parameterurl = `${url}parameter`
		// 商品评价
		let wxcommnt = `${url}wxcommnt`
		// 商品所有评论的标签
		let comtag = `${url}comtag`
		// 商品所有评论的内容
		let comtconent = `${url}comtconent`
		// 收藏和取消收藏
		let enshrine = `${url}enshrine`
		// 小程序登录
		let wxlogin = `${url}wxlogin`
		// 获取详情页商品是否收藏
		let collection = `${url}collection`
		// 获取购物车数据
		let mycart = `${url}mycart`
		// 获取sku数据
		let skuurl = `${url}wxsku`
		// 获取每个sku的库存，价格等等
		let queryskuurl = `${url}querysku`
		// 加入购物车
		let atcart = `${url}atcart`
		// 校验登录状态
		let tokening = `${url}tokening`
		// 获取收货地址
		let gainadd = `${url}gainadd`
		// 新增收货地址
		let sudeadd = `${url}sudeadd`
		// 修改收货地址
		let modifyadd = `${url}modifyadd`
		// 删除收货地址
		let deleadd = `${url}deleadd`
		// 微信支付：统一下单
		let wxpay = `${url}placeorder`
		// 查询订单是否支付成功
		let queryorder = `${url}queryorder`
		// 待付款
		let tobepaid = `${url}tobepaid`
		// 订单详情{待付款，待发货，待收货}
		let tobedetail = `${url}tobedetail`
		// 删除订单
		let deleorder = `${url}deleorder`
		// 待发货
		let tbdelivered = `${url}tbdelivered`
		// 待收货
		let gtbreceived = `${url}gtbreceived`
		// 确认收货
		let conreceipt = `${url}conreceipt`
		// 待评价
		let tbevaluated = `${url}tbevaluated`
		// 待评价详情页
		let dtpepage = `${url}dtpepage`
		// 商品评价
		let subcomm = `${url}subcomm`
		// 商品分类：一级分类
		let comclassurl = `${url}comclass`
		// 商品分类：二级分类
		let secondurl = `${url}secondclass`
		// 二级分类下的商品
		let queryurl = `${url}queryclass`
		// 按销量，价格查询商品
		let querycod = `${url}querycod`
		// 购物车：单个商品的选中和取消选中
		let selecturl = `${url}selecting`
		// 购物车：加减商品数量
		let pride = `${url}pride`
		// 购物车：全选和取消全选
		let selectall = `${url}selectall`
		// 购物车：商品购物车商品
		let cartdelete = `${url}cartdelete`
		// 购物车：重选sku
		let cartsku = `${url}cartsku`
		// 购物车：重选sku并修改
		let skubase = `${url}skubase`
		return{
			bannerget,
			getrecommurl,
			billboardurl,
			commodcradurl,
			searchurl,
			introduceurl,
			parameterurl,
			wxcommnt,
			comtag,
			comtconent,
			enshrine,
			wxlogin,
			collection,
			mycart,
			skuurl,
			queryskuurl,
			atcart,
			tokening,
			gainadd,
			sudeadd,
			modifyadd,
			deleadd,
			wxpay,
			queryorder,
			tobepaid,
			tobedetail,
			deleorder,
			tbdelivered,
			gtbreceived,
			conreceipt,
			tbevaluated,
			dtpepage,
			subcomm,
			comclassurl,
			secondurl,
			queryurl,
			querycod,
			selecturl,
			pride,
			selectall,
			cartdelete,
			cartsku,
			skubase
		}
	}
}

export default urls
