// vuex存放数据，数据仓库，数据管理中心
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 购物车的件数
const cartnum = {
	nums:''
}

// 收货地址数据
const addordr = {
	address:{}
}

const state = {
	// 购物车的件数
	cartnum,
	// 收货地址数据
	addordr
}


export default new Vuex.Store({
	// 数据仓库中心
	state,
	// 传值
	// actions:异步传值。不能直接到达数据仓库state，store.dispath()
	// getters:计算属性，带有缓存，
	// mutations：同步传值：可以直接传给state,store.commit('mutacart',value)
	mutations:{
		// 加入购物车成功后传值的购物车条数
		mutacart(state,nums){
			// 接收到组件传过来的值之后要存储到数据中心仓库
			state.cartnum = {nums}
		},
		// 收货地址携带数据返回到订单页
		mutaadd(state,address){
			state.addordr = {address}
		}
	}
})