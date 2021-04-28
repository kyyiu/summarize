//如何在webpack构建的项目中,使用VUe进行开发
//npm i vue -S


//在webpack中import Vue from 'vue'导入的vue构造函数功能不全,只能提供runtime-only的方式,并没有提供相网页中的使用方式
// import Vue from 'vue'
//包的查找规则
//1,项目根目录中有没有node_modules文件夹
//2,在其中有没有包名对应的文件夹
//3,在vue文件夹中,找一个package.json的包配置文件
//4,在pacakage.json中,找main属性[指定了这个包被加载时的人口文件]

// import Vue from '../node_modules/vue/dist/vue.js'
import Vue from 'vue'
//如果出现[Vue warn]: Cannot find element: #app
// 这是因为你的js在html页面头部引入的原因，自定义js文件要最后引入，
// 因为要先有元素id,vue才能获取相应的元素
import login from './login.vue'
//默认webpack无法打包.vue文件,
//npm i vue-loader vue-template-compiler -D
import m ,{star,ccc}from './tes.js'
console.log(m,star,ccc)

var vm = new Vue({
	el:'#app',
	data:{
		msg: '23'
	},
	// render: function (createElement){
	// 	//createElement是个方法调用它把指定的组件模板渲染为html结构
	// 	return createElement(login)
	// 	//这里return的结果会替换页面中el指定的哪个容器
	// },
	// 上面等同于
	render: c => c(login)
})