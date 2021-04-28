// components/Tab/Tab.js
Component({
  /**
   * 组件的属性列表
   * 
   */
  properties: {
// 要接收的数据名称
	tabs:{
		type: Array,
		value:[]
	}
  },

  /**
   * 组件的初始数据
   */
  data: {
		
  },

  /**
   * 组件的方法列表
   * 页面.js文件中存放事件回调函数的时候必须data同层级下
   * 组件.js文件中必须在methods中
   */
  methods: {
	handT: function(e){
		// 触发父组件中的自定义事件,同时传递数据发给父组件
		// this.triggerEvent('父组件自定义事件的名称,要传递的参数')
		//获取索引,{var}=xxx 相当于取出xxx对象中var属性的值再赋值给本地的var变量
		const {index} = e.currentTarget.dataset;
		this.triggerEvent("itemChange",{index})
		
	}
  }
})
