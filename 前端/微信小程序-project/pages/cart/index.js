// pages/cart/index.js

/*
  1获取用户的收获地址
    1绑定点击事件
    2调用小程序内置api获取用户的收获地址 wx.chooseAddress
  2 获取用户对小程序所授予获取地址权限状态 scope
    1假设用户点击获取收获地址的提示框 确定 authSetting scope.address
      scope值true 直接调用获取收获地址

    3假设用户从没调用过收获地址的api
      scope undefined 直接调用获取收获地址

    2假设用户点击获取收获地址的提示框取消
      scope 值 false
      1诱导用户自己打开授权设置页面 当用户重新给予获取地址权限的时候
      2获取收获地址
    4把获取的收货地址放到本地中
  3页面加载完毕
    0 onload onshow
    1获取本地存储中的地址数据
    2把数据设置给data中的一个变量
  4 onshow
    1获取缓存中的购物车数组
    2把购物车数据填充到data中

  5 全选的实现 数据的展示
    1 onshow 获取缓存中的购物车数组
    2 根据购物车中的商品数据进行计算 所有商品都被选中 checked=true 全选就被选中

  6总价格和总数量
    1都需要商品被选中
    2获取购物车数组
    3遍历
    4判断商品是否选中
    5总价+=商品单价*数量
    6总数+=商品数量
    7计算后的价格和数量 设置data中
  7商品选中
    1绑定change事件
    2获取到被修改的商品对象
    3商品对象的选中状态取反
    4重新填充回data和缓存中
    5重新计算全选。总价格 总数量
  8全选和反选
    1全选复选框绑定事件change
    2获取data中的全选变量 allchecked
    3直接取反
    4遍历购物车数组 让里面商品选中状态随allchecked改变而改变
    5把购物车数组和allchecked重新设置回data和缓存

  9商品数量的编辑
    1'+''-'按钮绑定同一个点击事件 区分关键自定义属性
      1'+' "+1"
      2 "-" "-1"
    2 传递被点击的商平 id goods——id
    3获取data中的购物车数组 来获取需要被修改的商品对象
      当购物车数量=1同时用户点击-
      弹窗（wx.showModal)询问用户是否删除
      1确定删除
      2什么都不做
    4 直接修改商品对象的数量num
    5 把购物车数组重新返回data和缓存
  10 点击结算
    1判断有没有收获地址
    2判断用户有没有选购商品
    3经过以上的验证跳转到支付页面
*/

import { getSetting, chooseAddress, openSetting, showModal, showToast} from "../../utils/asyncWx.js"
import regeneratorRuntime from "../../lib/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0

  },
/**
   * 生命周期函数--监听页面显示
   */
  onShow(){
    //1获取缓存中的收获地址信息
    const address = wx.getStorageSync("address")
    // 获取缓存中的购物车数据
    const cart = wx.getStorageSync("cart")||[]
    this.setData({address})
    this.setCart(cart)
    // 计算全选
    // every 数组方法会遍历 会接收一个回调函数，那么每一个回调函数都返回true 那么every方法的返回值位true，只要一个返回false，那么直接返回flase
    // 如果是空数组 返回值就是true
    // const allChecked = cart.length?cart.every(v=>v.checked):false
    // let allChecked = true
    // //总价格
    // let totalPrice=0
    // //总数量
    // let totalNum=0

    // cart.forEach(v=>{
    //   if(v.checked){
    //     totalPrice+=v.num*v.goods_price
    //     totalNum+=v.num
    //   }else{
    //     allChecked = false
    //   }
    // })
    // allChecked = cart.length!=0?allChecked:false
    // //2给data赋值
    // this.setData({
    //   address,
    //   cart,
    //   allChecked,
    //   totalPrice,
    //   totalNum
    // })
  },

  //商品的选中
  handleItemChange(e){
    //1获取被修改的商品的id
    const goods_id=e.currentTarget.dataset.id
    //2获取购物车数组
    let {cart} = this.data
    //3找到被修改的商品对象
    let index= cart.findIndex(v=>v.goods_id===goods_id)
    //选中状态取反
    cart[index].checked=!cart[index].checked
    
   this.setCart(cart)
  },

  //设置购物车状态同时 重新计算底部工具栏的数据 全选 总价格 购买数量
  setCart(cart){
    let allChecked = true
    //总价格
    let totalPrice = 0
    //总数量
    let totalNum = 0

    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
      } else {
        allChecked = false
      }
    })
    allChecked = cart.length != 0 ? allChecked : false
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    })
    wx.setStorageSync("cart", cart)
  },

  //商品全选功能
  handleItemAllCheck(){
    //获取data中的数据
    let {cart,allChecked} = this.data
    //修改值
    allChecked = !allChecked
    //修改商品选中状态
    cart.forEach(v=>v.checked=allChecked)
    //填充回data和缓存
    this.setCart(cart)
  },

  //商品数量的编辑功能
 async handleItemNumEdit(e){
    //获取传递过来的参数
    const {operation,id} = e.currentTarget.dataset
    //获取购物车数组
    let {cart} = this.data
    //找到需要修改的商品的索引
    const index = cart.findIndex(v=>v.goods_id===id)
    //判断是否执行删除
    if(cart[index].num===1&&operation===-1){
      // wx.showModal({
      //   title: '提示',
      //   content: '您是否要删除',
      //   success:(res)=>{
      //     if(res.confirm){
      //       cart.splice(index,1)
      //       this.setCart(cart)
      //     }else if(res.cancel){

      //     }
      //   }
      // })
      const res = await showModal({ content:"您是否要删除"})
      if (res.confirm) {
            cart.splice(index,1)
            this.setCart(cart)
          }

    }else{

      //进行修改数量
      cart[index].num += operation
      this.setCart(cart)
    }

  },

  //点击收获地址
  async handleChooseAddress(){
    // //1获取权限状态
    // wx-wx.getSetting({
    //   success: function(res) {
    //     //2获取权限状态 主要发现一些属性名很怪异的时候都要使用【】形式来获取属性值
    //     const scopeAdress=res.authSetting['scope.address']
    //     if(scopeAdress===true||scopeAdress===undefined){

    //       wx-wx.chooseAddress({
    //         success: function(res1) {

    //         }
    //       })

    //     }else{
    //       //用户以前拒绝过授予权限 先诱导用户打开授权页面
    //       wx-wx.openSetting({
    //         success: function(res2) {
    //           //可以调用收获地址代码
    //           wx-wx.chooseAddress({
    //             success: function(res3) {
    //               console.log(res3)
    //             }
                
    //           })
    //         }
           
    //       })
    //     }
    //   },
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })


    try{
      const res1 = await getSetting()
      const scopeAddress = res1.authSetting["scope.address"]
      if(scopeAddress===false){
        await openSetting()
      }
      let address = await chooseAddress()
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
      //存入缓存中
      wx.setStorageSync("address",address)

    }catch(err){
      console.log(err)
    }
  },

  async handlePay(){
    //判断收货地址
    const {address,totalNum} = this.data
    if(!address.userName){
      await showToast({title:"您还没有选择收货地址"})
      return
    }
    //判断是否选购商品
    if(totalNum===0){
      await showToast({title:" 您还没有选择商品"})
      return
    }
    //跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/index',
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