/*
  1页面加载的时候
    1 从缓存中获取购物车数据 渲染到页面中
    这些数据checked=true
  2微信支付
    1那些人可以实现微信支付
     1企业账号
     2企业账号的小程序后台中必须给开发者添加上白名单
       1一个appid可以同时绑定多个开发者
       2这些开发者可以公用这个appid和它的开发权限
  3支付按钮
    1 先判断缓存中有没有token
    2 没有跳转到授权页面进行获取token
    3有token。。。
	4 创建订单 获取订单编号
	5 已经完成微信支付
	6 手动删除缓存中已经选中了的商品
	7 删除后的购物车数据 填充回缓存
	8 在跳转页面
*/ 
import { getSetting, chooseAddress, openSetting, showModal, showToast ,requestPayment} from "../../utils/asyncWx.js"
import regeneratorRuntime from "../../lib/runtime.js"
import request from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0

  },
  /**
     * 生命周期函数--监听页面显示
     */
  onShow() {
    //1获取缓存中的收获地址信息
    const address = wx.getStorageSync("address")
    // 获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart") || []
    //过滤后的购物车数组
     cart = cart.filter(v=>v.checked)
    let totalPrice = 0
    //总数量
    let totalNum = 0

    cart.forEach(v => {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })

  },
  //点击支付
  async handleOrderPay(){
   try{
	   //判断缓存中有没有token
	   const token=wx.getStorageSync("token")
	   if(!token){
	     wx.navigateTo({
	       url: '/pages/auth/index',
	     });
	     return
	   }
	   //创建订单
	   //准备请求头参数
	   const header = {Authorization:token}
	   //准备请求参数
	   const order_price = this.data.totalPrice
	   const consignee_addr = this.data.address.all
	   const cart=this.data.cart
	   let goods=[]
	   cart.forEach(v=>goods.push({
	   	goods_id:v.goods_id,
	   	goods_number:v.num,
	   	goods_price:v.goods_price
	   }))
	   const orderParams = {order_price,consignee_addr,goods}
	   //准备发送请求创建订单,获取订单编号
	   const {order_number} = await request({url:"/my/orders/create",method:"POST",data:orderParams,header})
	   //发起预支付接口
	   const {pay} = await request({url:"/my/orders/req_unifiedorder",method:"POST",header,data:{order_number}})
	   //发起微信支付
	   await requestPayment(pay)
	   //查询后台订单状态
	   const  res = await request({url:"/my/orders/chkOrder",method:"POST",header,data:{order_number}})
	   
	   await showToast({title:"支付成功"})
	   //手动删除缓存中已经支付了的商品
	   let newCart = wx.getStorageSync("cart")
	   newCart=newCart.filter(v=>!v.checked)
	   wx.setStorageSync("cart",newCart)
	   //支付成功跳转订单页面
	   wx.navigateTo({
		   url:"/pages/order/index"
	   })
   }catch(err){
	   await showToast({title:"支付失败"})
   }
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