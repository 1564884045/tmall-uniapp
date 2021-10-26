<template>
<view>
	<!-- 返回按钮 -->
	<view class="header-fixed backno" v-show="showAbs">
		<view class="status_bar" :style=" 'height:' + tophight.top + 'px;' "></view>
		<view class="navs-image"
		:style=" 'height:' + tophight.height + 'px;' "
		@click="pageRe()"
		 >
			<image src="/static/details/fanhuibai.jpg" mode="widthFix"></image>
		</view>
	</view>
	<!-- 顶部导航栏 -->
	<view class="header-fixed backyes" v-show="!showAbs" :style="{opacity:styleObject}">
		<view class="status_bar" :style=" 'height:' + tophight.top + 'px;' "></view>
		<Top :tophight="tophight"></Top>
	</view>
	<!-- 图片视频宣传 -->
	<!-- 注意：如果含有视频播放，在子组件里无法触发视频播放，必须要在父组件 -->
	<view>
		<swiper :indicator-dots="dots"  :interval="3000" :duration="1000" :circular="true"
		indicator-color="rgba(216, 216, 216)"
		indicator-active-color="#7a7a7a"
		@change="bannerfun"
		>
		<block v-for="(iteming,index) in imagetext[0].media" :key="index">
			<swiper-item class="swiper-video" v-if="iteming.video != '' ">
				<view class="video-btn">
					<view>
						<video id="myVideo" :src="iteming.video"
						:show-center-play-btn="false"
						:enable-progress-gesture="false"
						:controls="contimg"
						object-fit="cover"
						@play="playFun"
						@pause="pauseFun"
						@ended="endedFun"
						></video>
					</view>
					<view class="video-img" @click="videoPlay()" v-show="startVideo">
						<image src="/static/details/bofang.svg" mode="widthFix"></image>
					</view>
				</view>
			</swiper-item>
			<block v-for="(item,indexing) in iteming.imgArray" :key="indexing">
			<swiper-item>
				<view>
					<image :src="item" mode="aspectFill" class="imageurl" @click="previmg(indexing,iteming.imgArray)"></image>
				</view>
			</swiper-item>
			</block>
		</block>	
		</swiper>
	</view>
	<!-- 价格，标题等等 -->
	<Price :priceetc="priceetc"></Price>
	<!-- 产品参数 -->
	<Parame></Parame>
	<!-- 评价 -->
	<Evaluate :comment="comment" class="evaluate"></Evaluate>
	<!-- 商品详情图 -->
	<Produce :priceetc="priceetc" class="produce"></Produce>
	<!-- 底部操作栏组件 -->
	<Shopping :gooid="gooid" :colldata="colldata"
	:cartdata="cartdata"
	></Shopping>
	<!-- // 公用的商品sku选择组件 -->
	<Addtocart ref="addto" :skudata="skudata"></Addtocart>
	<!-- 页面loading -->
	<full-loading ref="fullload"></full-loading>
</view>
</template>

<script>
var {log} = console
// 预览图片
const {Login} = require('../../public/logic.js')
// top
import Top from './components/top.vue'
import Price from './components/price.vue'
import Parame from './components/parame.vue'
import Evaluate from './components/evaluate.vue'
import Produce from './components/product.vue'
import Shopping from './components/shopping.vue'
// 公用的商品sku选择组件
import Addtocart from '../components/addtocart.vue'
export default{
	components:{Top,Price,Parame,Evaluate,Produce,Shopping,Addtocart},
	data() {
		return {
			// 胶囊按钮的数据
			tophight:{},
			// 返回按钮
			showAbs:true,
			// 透明度
			styleObject:0,
			// 找到视频上下文
			videoplay:{},
			// 中间播放按钮
			startVideo:true,
			// 是否显示默认播放控件（播放/暂停按钮、播放进度、时间）
			contimg:false,
			imagetext:[],
			// 面板指示点
			dots:false,
			// 商品标题，价格等
			priceetc:{},
			// 评价
			comment:[],
			// 备用商品id
			gooid:'',
			// 获取商品是否收藏
			colldata:{},
			// 获取购物车件数
			cartdata:{},
			// sku数据
			skudata:[]
		}
	},
	methods:{
		// 请求数据
		async detRequest(id){
			let introduce = new this.Request(this.Urls.m().introduceurl + '?id=' + id).modeget()
			// 评价
			let wxcommnt = new this.Request(this.Urls.m().wxcommnt + '?id=' + id).modeget()
			// 获取商品是否收藏
			let collection = new this.Request(this.Urls.m().collection + '?id=' + id).modeget()
			// 获取购物车的件数
			let mycart = new this.Request(this.Urls.m().mycart).modeget()
			// 获取sku数据
			let sku = new this.Request(this.Urls.m().skuurl + '?id=' + id).modeget()
			try{
				let res = await Promise.all([introduce,wxcommnt,collection,mycart,sku])
				log(res)
				// 图片视频的数据
				this.imagetext = res[0].data
				let mendata = res[0].data[0]
				// 商品id
				this.gooid = mendata.id
				// 商品标题，价格等
				let describe = mendata.describe
				describe['id'] = mendata.id
				this.priceetc = describe
				// 评价
				this.comment = res[1].data
				// 获取商品是否收藏
				this.colldata = res[2]
				// 获取购物车件数
				this.cartdata = res[3]
				// 获取sku数据
				let defaultdata = {
					image:mendata.media[0].imgArray[0],
					price:mendata.describe.Trueprice,
					totalstock:mendata.describe.Total_stock,
					id:mendata.id,
					title:mendata.describe.title
				}
				this.skudata = res[4].data
				this.skudata.push(defaultdata)
				// 如果有视频不显示面板指示点
				this.truevideo = mendata.media[0].video
				this.dots = this.truevideo == '' ? true : false
				// 取消loading
				this.$refs.fullload.init()
			}catch(e){
				//TODO handle the exception
			}
		},
		
		
		
		// 导航栏的显示
		handleScroll(top){
			if(top > 90){
				let opacity = top / 300
				opacity = opacity > 1 ? 1 : opacity
				this.showAbs = false
				this.styleObject = opacity
			}else{
				this.showAbs = true
			}
		},
		
		// 滑块滑动时触发
		bannerfun(e){
			let inx = e.detail.current
			// 滑动到图片的时候要显示面板指示点
			if(this.truevideo != ''){
				this.dots = inx == 0 ? false : true
				this.videoplay.pause()
			}else{
				this.dots = true
			}
		},
		// 预览图片
		previmg(index,imgArray){
			new Login(index,imgArray).previewImg()
		},
		// 手动触发视频播放
		videoPlay(){
			log('123')
			setTimeout(()=>{
				this.videoplay.play()
			},200)
		},
		// 视频播放时触发
		playFun(){
			this.startVideo = false
			this.contimg = true
		},
		// 视频暂停时触发
		pauseFun(){
			this.startVideo = true
			this.contimg = false
		},
		// 视频播放到结尾时触发
		endedFun(){
			this.startVideo = true
			this.contimg = false
		},
		// 被子组件top调用来描点链接
		fathEr(index){
			// 作业：当滑动到目标位置时，顶部的导航栏自动选中对应的tab
			console.log(index)
			// evaluate:评价；produce：详情图
			let clsdata = index === 1 ? '.evaluate' : '.produce'
			let he = this.tophight.top + this.tophight.height
			const query = this.createSelectorQuery()
			query.select(clsdata).boundingClientRect()
			query.selectViewport().scrollOffset()
			query.exec((res)=>{
				uni.pageScrollTo({
				    scrollTop: res[0].top + res[1].scrollTop - he,
				    duration: 300
				});
			})
		},
		
		// 被子组件shopping调用
		shoPp(mean){
			console.log('123')
			this.$refs.addto.showCou(mean)
		},
		// 返回上一页面
		pageRe(){
			uni.navigateBack({
				delta:1
			})
		}
	},
	
	
	
	
	
	created() {
		// 获取胶囊按钮的数据
		this.tophight =  uni.getMenuButtonBoundingClientRect()
	},
	mounted() {
		this.videoplay = wx.createVideoContext('myVideo')
	},
	// 滚动监听
	onPageScroll(e){
		this.handleScroll(e.scrollTop)
	},
	onLoad(e) {
		this.detRequest(e.id)
	}
}
</script>

<style>
page{background: #f2f2f2;}
.header-fixed{
position: fixed;
top: 0;
left: 0;
right: 0;
z-index: 2;
}
.backyes{background: #f8f8f8;}
.backno{background: none;}
.status_bar {
width: 100%;
/* background: #007AFF; */
}
.navs-image image{width: 28px; height: 28px;
border-radius: 50%;
}
.navs-image{display: flex; align-items: center;
 padding-left: 20upx;
}
/* banner部分 */
.imageurl {
	width: 100%;
	height: 700upx !important;
}

swiper {
	height: 700upx !important;
}
.swiper-video{height: 700upx; background: #4CD964;}
.swiper-video video{width: 100%; height: 700upx;}
/* 自定义按钮 */
.video-img image{width: 90upx; height: 90upx; z-index: 999;
border: 2px solid #FFFFFF;
border-radius: 50%;}
.video-img{width: 90upx; height: 90upx;
position: absolute; bottom: 0;
left: 50%;
top: 50%;
transform: translateX(-50%) translateY(-50%);
}
.video-btn{height: 700upx; position: relative;}
</style>

