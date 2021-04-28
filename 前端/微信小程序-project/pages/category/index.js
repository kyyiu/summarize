import {request} from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime.js"
// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧菜单数据
    leftMenuList:[],
    //右侧商品数据
    rightContent:[],
    //选中的标签
    current: 0,
    //右侧内容滚动条距离顶部的距离
    scrollTop: 0

  },
  //接口返回数据
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
      0 web中的本地存储和小程序中的本地存储的区别
          1 代码方式不一样
            web:localStorage.setItem("key","value") localStorage.getItem("key")
           小程序中：wx.setStorageSync("key","value"); wx.getStorageSync("key")
          2 存的时候有没有做类型转换
            web :不管存入的是什么类型的数据，最终都会先调用一下toString(),把数据变成字符串再存入
            小程序：不存在类型转换的操作，存什么数据进去，获取的时候就是什么类型
      1先判断本地存储中有没有旧数据
      {time:Date.now(),data:[...]}
      2 没有直接发送新请求
      3 有同时旧数据也没有过期就使用本地旧数据即可
    */ 
    // this.getCates()

    //1获取本地存储的数据 （小程序中也有本地存储技术
    const Cates = wx.getStorageSync("cates");
    // 2 判断
    if(!Cates){
      this.getCates()
    }else{
      //有旧数据 定义过期时间10s 改成5分钟
      if(Date.now()-Cates.time>1000*10){
        this.getCates()
      }else{
        //可以使用旧数据
        this.Cates = Cates.data
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
        
      }
    }
  },


  //获取分类数据
  async getCates(){
    // request({
    //   url: "/categories"
    // })
    //   .then(res => {
    //     this.Cates = res.data.message;

    //     //把接口的数据存入到本地存储中
    //     wx.setStorageSync("cates", { time: Date.now(), data: this.Cates })

    //     //构造左侧大菜单数据
    //     let leftMenuList = this.Cates.map(v => v.cat_name);
    //     let rightContent = this.Cates[0].children;
    //     this.setData({
    //       leftMenuList,
    //       rightContent
    //     })
    //   })


    //使用es7的async await发送请求
    const res=await request({
      url: "/categories"
    })
    this.Cates = res;

    //把接口的数据存入到本地存储中
    wx.setStorageSync("cates", { time: Date.now(), data: this.Cates })

    //构造左侧大菜单数据
    let leftMenuList = this.Cates.map(v => v.cat_name);
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },

  //左侧菜单点击事件
  handleItemTap(e){
    // 1获取被点击标题的索引
    // 2给data中的currnet赋值
    // 3根据不同index更换右侧
    const {index} = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    this.setData({
      current:index,
      rightContent,
      //重新设置右侧滚动条距离顶部距离
      scrollTop:0
    })
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