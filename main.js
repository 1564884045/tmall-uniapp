import Vue from 'vue'
import App from './App'

// bus传值
import bus from './public/bus.js'
Vue.prototype.$bus = bus

// 请求方法
import urls from './api/request.js'
Vue.prototype.Urls = urls
import request from './api/api.js'
Vue.prototype.Request = request
// toast弹窗
import toast from './public/toast.js'
Vue.prototype.$Toast = toast

// vuex
import store from './store/store.js'
Vue.prototype.$store = store

// 上拉加载组件
import loadn from 'pages/components/loading-men.vue'
Vue.component('loader-on',loadn)
// 登录弹窗
import showmodal from 'pages/components/showmodal.vue'
Vue.component('showmodal',showmodal)
// 全屏覆盖的登录弹窗
import loginpage from 'pages/components/login-page.vue'
Vue.component('loginpage',loginpage)
// 没有订单数据的提示
import ordering from 'pages/components/ordering.vue'
Vue.component('ordering',ordering)
// 页面加载的loading
import Loading from 'pages/components/full-loading.vue'
Vue.component('full-loading',Loading)

// 提示框的样式
import './style/style.css'
// 动画样式
import './pattern/animat.css'
// 产品参数
import './pattern/styles.css'


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
