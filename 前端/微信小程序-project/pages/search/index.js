// pages/search/index.js

/*
	1输入框绑定值改变事件,input事件
		1获取输入框的值
		2合法性判断
		3检验通过把输入框的值发送到后台
		4返回的数据打印到页面
	2 防抖 定时器 节流
		0 防抖 一般是 输入框中防止重复输入 重复发送请求,节流一般是在页面上拉和下拉
		1 定义全局定时器id
*/ 

import {request} from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
	goods:[],
	isFocus: false

  },
  	TimeId: -1,
	//输入框的值改变就会触发的事件
	handleInput(e){
		//获取输入框的值
		const{value} = e.detail
		//检测合法性
		if(!value.trim()){
			this.setData({
				goods:[],
				//取消按钮是否显示
				isFocus:false,
				//输入的值
				inpValue: ""
			})
			//不合法
			return
		}
		//准备发送请求获取数据
		this.setData({
			isFocus: true
		})
		clearTimeout(this.TimeId)
		this.TimeId=setTimeout(()=>{
			this.qsearch(value)
		},2000)
	},
	//发送请求获取搜索建议数据
	async qsearch(query){
		const res = await request({url:"/goods/qsearch",data:{query}})
		this.setData({
			goods:res
		})
	},
	//点击取消按钮
	handleCancel(){
		this.setData({
			inpValue:"",
			isFocus:false,
			goods:[]
		})
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})