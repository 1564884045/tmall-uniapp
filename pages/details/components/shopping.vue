<template>
<view>
<view class="shopping-view">
	<view class="shopping-text">
		<image src="/static/details/fenxiang.svg" mode="widthFix"/>
		<text>分享</text>
	</view>
	<view class="shopping-text middle">
		<image src="/static/details/gouwuche.svg" mode="widthFix"/>
		<text>购物车</text>
		<text>{{cartnum}}</text>
	</view>
	<!-- 未收藏 -->
	<view class="shopping-text" @click="collEct(1,gooid)" v-if="collects == 0">
		<image src="/static/details/shoucang.svg" mode="widthFix"/>
		<text>收藏</text>
	</view>
	<!-- 已收藏 -->
	<view class="shopping-text" @click="collEct(0,gooid)"  v-if="collects == 1">
		<image src="/static/details/yishoucang.svg" mode="widthFix"/>
		<text>已收藏</text>
	</view>
	<view class="join join-right" @click="couponsFun('002')">加入购物车</view>
	<view class="join join-left" @click="couponsFun('003')">立即购买</view>
</view>
<!-- 登录弹窗 -->
<showmodal ref="show"></showmodal>
</view>
</template>

<script>
export default{
	props:{gooid:String,colldata:Object,cartdata:Object},
	data() {
		return {
			collects:0,
			cartnum:0
		}
	},
	methods:{
		// 收藏和取消收藏errcode: "401":就是没有权限，也就是没有登录
		async collEct(num,id){
			let data = {num,id}
			try{
				let enshrine = await new this.Request(this.Urls.m().enshrine,data).modepost()
				console.log(enshrine)
				let {errcode} = enshrine.msg
				if(errcode == '401'){
					// 要去登录
					this.$refs.show.showing('coll')
				}else if(errcode == '200'){
					this.collects = enshrine.msg.collects
				}
			}catch(e){
				//TODO handle the exception
			}
		},
		// 登陆成功后更新收藏状态
		async reFresh(){
			try{
				// 获取商品是否收藏
				let collection = await new this.Request(this.Urls.m().collection + '?id=' + this.gooid).modeget()
				this.collects = collection.msg.collects
				// 更新购物车件数
				let mycart = await new this.Request(this.Urls.m().mycart).modeget()
				this.cartnum = mycart.data.length
			}catch(err){
				console.log(err)
			}
		},
		
		// 调用父组件里的sku组件
		couponsFun(mean){
			this.$parent.shoPp(mean)
		}
	},
	
	// 接收登录组件传过来的值
	created(){
		this.$bus.$on('collict',res=>{
			if(res.colldata == 'SUCCESS'){
				// 登陆成功后更新收藏状态
				this.reFresh()
			}
		})
	},
	
	watch:{
		// 获取该商品是否收藏
		colldata(newValue,oldValue){
			let {collects} = newValue.msg
			this.collects = collects
		},
		// 获取购物车件数
		cartdata(newValue,oldValue){
			if(newValue.msg.errcode){this.cartnum = 0}
			else if(newValue.msg == 'SUCCESS'){this.cartnum = newValue.data.length}
		},
		// 加入购物车成功后存储到vuex后，从vuex仓库中心拉取值；监听vuex数据中的值变化，
		// 如果vuex数据中心的值变化才会被触发执行
		"$store.state.cartnum"(newValue,oldValue){
			this.cartnum = newValue.nums
		}
	}
}
</script>

<style scoped>
.shopping-view image{width: 35rpx; height: 35rpx;}
.shopping-view{font-size: 30upx;
background: #FFFFFF;
border-top: 1rpx solid #cccccc;
height: 100upx;
display: flex;
align-items: center;
position: fixed;
bottom: 0;
left: 0;
width: 100%;
}
.join{flex: 2; text-align: center; height: 80upx; line-height: 80upx;
color: white;
}
.shopping-text{
height: 100upx;
flex: 1;
display: flex;
flex-direction:column;
justify-content: center;
align-items: center;
}
.shopping-text text{font-size: 23upx; padding-top: 5upx;
color: #666666;}
.join-right{
	background: linear-gradient(to right, #ffc800 10%, #ff9602 80%);
	border-top-left-radius: 50upx;
	border-bottom-left-radius: 50upx;
}
.join-left{background: linear-gradient(to right, #ff7500 10%, #ff4b00 80%);
border-top-right-radius: 50upx;
border-bottom-right-radius: 50upx;
margin-right: 10upx;}
.middle{border-left: 1rpx solid #f4f4f4;
border-right: 1rpx solid #f4f4f4;
position: relative;
}
.middle text:nth-child(3){
font-size: 16upx; background: #fe0036;
color: #FFFFFF;
border-radius: 50%;
width: 30upx;
height: 30upx;
padding: 0 !important;
text-align: center;
line-height: 30upx;
position: absolute;
top: 10upx;
right: 10upx;
}
</style>
