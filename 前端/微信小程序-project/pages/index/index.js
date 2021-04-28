import {request} from "../../request/index.js"
wx-Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数组
    swiperList:[],
    //分类导航数组
    cateList: [],
    //楼层数组
    floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getSwiperList()
   this.getCateList()
   this.getFloorList()
  },

  getSwiperList(){
    // wx-wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (res)=> {
    //     this.setData({
    //       swiperList: res.data.message
    //     })
    //   }
    // })
    request({ url: '/home/swiperdata' })
      .then(result => {
        this.setData({
          swiperList: result
        })
      })
  },

  getCateList() {
    request({ url: '/home/catitems'      })
      .then(result => {
        this.setData({
          cateList: result
        })
      })
  },


  getFloorList(){
    request({ url: '/home/floordata'})
    .then(result=>{
      this.setData({
        floorList: result
      })
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