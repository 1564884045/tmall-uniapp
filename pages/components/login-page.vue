<template>
<view class="login-page" v-if="login">
	<button type="primary" open-type="getUserInfo" @click="getUserInfo()">登录</button>
</view>
</template>

<script>
import wxLogin from '../../login/login.js'
export default{
	data() {
		return {
			login: false
		}
	},
	methods:{
		showing(boll=true){
			this.login = boll
		},
		// 登录
		async getUserInfo(event){
			new this.$Toast('登录中').showloading()
			//新的登录接口：wx.getUserProfile
			wx.getUserProfile({
				desc: '登录'
			})
			.then(res=>{
				let {userInfo,errMsg} = res
				this.wxusEr(userInfo,errMsg)
			})
			.catch(err=>{
				console.log('拒绝登录或登录失败')
			})
		},
		// 调用登录
		async wxusEr(userInfo,errMsg){
			try{
				let data = await new wxLogin(userInfo,errMsg).loGin()
				// 登录成功更新需要请求的接口或者数据
				this.$bus.$emit('mycart', {cart:data})
				this.login = false
			}catch(e){
				//TODO handle the exception
			}
		}
	}
}
</script>

<style scoped>
.login-page{
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #FFFFFF;
	z-index: 999;
}
.login-page button{
	width: 350rpx;
}
</style>