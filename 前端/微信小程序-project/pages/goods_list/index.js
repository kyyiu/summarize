// pages/goods_list/index.js
// 1用户上滑页面 滚动条触底 开始加载下页数据
//   1找到滚动条触底事件
//   2判断还有没有下一页数据
      // 1获取总页数 只有总条数
        //  总页数=Math.ceil(总条数/页容量)
      // 2获取当前页码
      // 3 判断当前页码是否大于等于总页数
//   3 假如没有数据 弹出一个提示
//   4 如果有加载
//      1当前页面++
    //  2重新发送请求
    //  3数据请求回来 要对data中的数组进行拼接而不是替换

// 下拉刷新页面
//  1触发下拉刷新事件  需要在页面的json文件中开启一个配置项enablePullDownRefresh
      // 而backgroundTextStyle:""设置刷新特效颜色（仅支持dark，light
      // 页面相关事件处理函数--监听用户下拉动作onPullDownRefresh
//  2重置数据数组
//  3重置页马设置位1
//  4重新发送请求
//  5数据请求回来 需要手动关闭等待效果


import {request} from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    goodsList:[]

  },

  //接口要的参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },

  //总页数
  totalPages:1,

  handleTabsItemChange(e){
    //1获取被点击的标题索引
    const {index} = e.detail;
    //2修改源数组
    let {tabs}=this.data
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
    //3赋值到data中
    this.setData({
      tabs
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid
    this.getGoodsList()
  },


  //获取商品列表数据
  async getGoodsList(){
    const res = await request({url:"/goods/search",data:this.QueryParams})
    //获取总条数
    const total=res.total
    // 计算总页数
    this.totalPages=Math.ceil(total/this.QueryParams.pagesize)
    this.setData({
      // goodsList:res.goods
      //拼接数组
      goodsList:[...this.data.goodsList,...res.goods]
    })

    //关闭微信下拉刷新的窗口
    wx.stopPullDownRefresh()
  },


  //页面上滑，滚动条触底事件
  onReachBottom(){
      // 1判断还有没有下一页数据
      console.log('C')
      if(this.QueryParams.pagenum>=this.totalPages){
        console.log('A')
          wx.showToast({
            title: '没有下一页了',
          })
      }else{
        console.log('B')
        this.QueryParams.pagenum++;
        this.getGoodsList();
      }
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
    // 1重置数组
    this.setData({
      goodsList:[]
    })
    // 2重置页码
    this.QueryParams.pagenum=1
    // 3发送请求
    this.getGoodsList()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})