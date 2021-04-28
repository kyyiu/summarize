import Vue from 'vue'
import VueRouter from 'vue-router'
//手动安装 Vuerouter: npm i vue-router -S
Vue.use(VueRouter)
//安装mint-ui : npm i mint-ui -S
//导入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
import app from './App.vue'
import router from './router.js'
import '../lib/mui/css/mui.min.css'
var vm = new Vue({
	el: '#app',
	render: c => c(app),
	router
})