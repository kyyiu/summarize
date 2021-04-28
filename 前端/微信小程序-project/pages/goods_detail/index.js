// pages/goods_detail/index.js

/*
  1发送请求
  2 点击轮播图 预览大图
    1给轮播图绑定点击事件
    2 调用小程序api previewImage
  3点击加入购物车
    1先绑定点击事件
    2获取缓存中的购物车数据 数组格式
    3先判断当前的商品是否已经存在于购物车
    4已经存在修改商品数据 执行购物车数量++ 重新把购物车数组填充回缓存中
    5不存在直接给购物车数组添加一个元素 新元素带上数量属性num 重新把购物车数组填充回缓存中
    6弹出提示
  4 商品收藏
	1页面onsohw的时候加载缓存中的商品收藏的数据
	2判断当前商品是否被收藏
	 1是改变页面图标
	 2不是
	3点击商品收藏按钮
	 1判断是否存在于缓存数组中
	 2存在 把该商品删除
	 3没有 添加进收藏数组中 存入缓存中即可
*/

import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
	//商品是否被收藏
	isCollect:false,
  },


  //商品对象
  GoodsInfo:{},
  
  
  async getGoodsDetail(goods_id){
    const goodsObj = await request({url:"/goods/detail",data:{goods_id}})
    this.GoodsInfo = goodsObj
	//获取缓存中的商品收藏按钮
	let collect = wx.getStorageSync("collect")||[]
	//判断当前商品是否被收藏
	let isCollect = collect.some(v=>v.goods_id===this.GoodsInfo.goods_id)
    this.setData({
      goodsObj:{
        //iphone部分手机不识别webp图片格式
        //最好找后台进行修改
        //临时自己修改，确保后台存在1.webp=》1.jpg
        goods_name:goodsObj.goods_name,
        goods_price:goodsObj.goods_price,
        pics:goodsObj.pics,
        goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg')
      },
	  isCollect
    })
  },
  //点击轮播图放大预览
  handlePreviewImage(e){
    //1先构造要预览的图片数组
    const urls=this.GoodsInfo.pics.map(v=>v.pics_mid)
    //2接收传递过来的图片url
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current:current,
      urls: urls,
    })
  },

  //点击加入购物车
  handleCartAdd(){
    //1获取缓存中的购物车数组
    let cart = wx.getStorageSync("cart")||[];
    //2判断商品对象是否存在于购物车数组中
    let index = cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id)
    if(index===-1){
      //不存在 第一次添加
      this.GoodsInfo.num=1
      this.GoodsInfo.checked=true
      cart.push(this.GoodsInfo)
    }else{
      cart[index].num++
    }
    wx.setStorageSync("cart", cart)
    //弹窗提示
    wx.showToast({
      title: '加入成功',
      icon:'success',
      //true防止用户手抖疯狂点击按钮
      mask:true,
      
    })
  },
	//点击商品收藏图标
	handleCollect(){
		let isCollect = false
		//获取缓存中的商品收藏数组
		let collect = wx.getStorageSync("collect")||[]
		//判断该商品是否被收藏
		let index = wx.collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id)
		//当index!=-1表示已经收藏
		if(index!==-1){
			//能找到已经收藏过了 在数组中删除该商品
			collect.splice(index,1)
			isCollect = false
			wx.showToast({
				title:"取消成功",
				icon:"success",
				mask:true,
			})
		}else{
			//没有收藏过
			collect.push(this.GoodsInfo)
			isCollect = true
			wx.showToast({
				title:"收藏成功",
				icon:"success",
				mask:true,
			})
		}
		//把数组存入到缓存中
		wx.setStorageSync("collect",collect)
		//修改isCollect
		this.setData({
			isCollect
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
	let pages = getCurrentPages()
	let currentPage = pages[pages.length-1]
	let options = currentPage.options
	const {goods_id} = options
	this.getGoodsDetail(goods_id)
	
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