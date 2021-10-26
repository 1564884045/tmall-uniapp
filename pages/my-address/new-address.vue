<template>
<view class="new-address-view">
	<!-- 收货地址 -->
	<view class="new-address">
		<view>收货城市:</view>
		<view>
			<input type="text" v-model="city" placeholder="请选择收货城市" disabled placeholder-style="color:#9c9c9c"/>
		</view>
		<view>
			<picker mode="region" @change="regionChange">
				<text>选择城市</text>
			</picker>
		</view>
	</view>
	<!-- 详细地址 -->
	<view class="new-address">
		<view>详细地址:</view>
		<view>
			<input type="text" v-model="address" placeholder="请填写详细地址" placeholder-style="color:#9c9c9c"/>
		</view>
	</view>
	<!-- 联系人 -->
	<view class="new-address">
		<view>联系人: </view>
		<view>
			<input type="text" v-model="name" placeholder="请填写收货人姓名" placeholder-style="color:#9c9c9c"/>
		</view>
	</view>
	<!-- 手机号码 -->
	<view class="new-address">
		<view>手机号:</view>
		<view>
			<input type="number" v-model="mobile" placeholder="请填写收货人手机号码" placeholder-style="color:#9c9c9c"/>
		</view>
	</view>
	<!-- 保存地址 -->
	<view class="conServe adcolor" @click="preTion()" v-if="nameadd">保存地址</view>
	<!-- 修改地址 -->
	<view class="conServe adcolor" @click="modifyAdd()" v-if="!nameadd">修改地址</view>
	<!-- 删除地址 -->
	<view class="conServe decolor" @click="deleteAdd()" v-if="!nameadd">删除</view>
</view>
</template>

<script>
export default{
	data() {
		return {
			city:'',
			address:'',
			name:'',
			mobile:'',
			nameadd:true,
			// 该条收回地址的id
			id:''
		}
	},
	methods:{
		// 省市区选择
		regionChange(e){
			let values = e.detail.value
			// 浙江省 杭州市 上城区
			var str = ''
			values.forEach((item)=>{str += item + ' '})
			this.city = str
		},
		// 提交收货地址
		async preTion(){
			new this.$Toast('正在提交').showloading()
			let obj = {city:this.city,address:this.address,name:this.name,mobile:this.mobile}
			try{
				let data = await new this.Request(this.Urls.m().sudeadd,obj).modepost()
				console.log(data)
				if(data.msg == 'SUCCESS'){
					new this.$Toast('提交成功').showtoast()
					uni.navigateBack({
					    delta: 1
					});
				}else{
					new this.$Toast(data.msg,'none').showtoast()
				}
			}catch(e){
				//TODO handle the exception
			}
		},
		// 修改收货地址
		async modifyAdd(){
			new this.$Toast('正在修改').showloading()
			let obj = {id:this.id,city:this.city,address:this.address,name:this.name,mobile:this.mobile}
			try{
				let data = await new this.Request(this.Urls.m().modifyadd,obj).modepost()
				if(data.msg == 'SUCCESS'){
					new this.$Toast('修改成功').showtoast()
					uni.navigateBack({
					    delta: 1
					});
				}else{
					new this.$Toast(data.msg,'none').showtoast()
				}
			}catch(e){
				//TODO handle the exception
			}
		},
		// 删除收货地址
		async deleteAdd(){
			new this.$Toast('正在删除').showloading()
			try{
				let data = await new this.Request(this.Urls.m().deleadd + '?id=' + this.id).modeget()
				new this.$Toast('修改成功').showtoast()
				uni.navigateBack({
				    delta: 1
				});
			}catch(e){
				//TODO handle the exception
			}
		},
		
		// 获取用户从哪个按钮点击进来的
		useradd(data){
			if(data.value == '001'){
				// 修改地址或者删除地址
				this.nameadd = false
				let {city,address,mobile,name,_id} = data.data
				this.city = city,
				this.address = address,
				this.name = name,
				this.mobile = mobile,
				this.id = _id
			}else{
				this.nameadd = true
			}
		}
	},
	onLoad(e) {
		console.log(JSON.parse(e.value))
		this.useradd(JSON.parse(e.value))
	}
}
</script>

<style scoped>
.new-address-view{padding: 10upx 30upx;}
.new-address{
height: 100upx;
display: flex; 
align-items: center;
justify-content: space-between;
font-size: 28rpx;
border-bottom: 1rpx solid #F0F0F0;
}
.new-address view:nth-child(1){width: 150rpx;}
.new-address view:nth-child(2){flex: 1;}
.new-address view:nth-child(3){color: #4CD964;}
/* 保存 */
.conServe{height: 80rpx;
font-size: 30rpx;
border-radius: 10rpx;
font-weight: bold;
display: flex;
align-items: center;
justify-content: center;
margin-top: 30rpx;
}
.adcolor{background:linear-gradient(to right,#ffd300,#e6be00);}
.decolor{background-color: red; color: #FFFFFF;}
</style>

