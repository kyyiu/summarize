import VueRouter from 'vue-router'
import aaa from '../mm/AAA.vue'
import ggg from '../mm/GGG.vue'
import login from '../mm/lg.vue'
import register from '../mm/rg.vue'
var router = new VueRouter({
	routes:[
		{
		path: '/aaa',
		component: aaa,
		children:[
			{path:'login',component: login},
			{path: 'register',component: register}
		]
		},
		{path: '/ggg', component: ggg}
	]
})
export default router