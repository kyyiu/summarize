// pages/test/test.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gen:'',
    msg: 'hello',
    num: 666,
    person:{
      sex: '男',
      age: 20
    },
    list:[
      {
        id: 0,
        name: 'a'
      },
      {
        id: 1,
        name: 'b'
      }
    ],
    // 标签字符串
    htm: '<div>hhhhh</div>',
    html:[{
      //1 div标签 name属性指定
      name:'div',
      attrs:{
        // 标签上的属性 class style
        class: 'my_div',
        style: 'color: red;'
      },
      text:'yyy',
      // 子节点children要接收的数据类型和nodes第二种渲染方式类型一致
      children:[{
        name:'p',
        attrs:{},
        //放文本
        children:{
          type: 'text',
          text: 'hhelle'
        }
      }]
    }],
    tabs: [
      {
        id: 0,
        name: 'aa',
        isActive: true
      },
      {
        id: 1,
        name: 'aa',
        isActive: false
      },
      {
        id: 2,
        name: 'aa',
        isActive: false
      },
      {
        id: 3,
        name: 'aa',
        isActive: false
      }
    ]
  },
  // 注册函数和data同级
  bb: function (e) {
    this.setData({
      num: e.detail.value
    }) 
  },
  b1: function (e) {
    const operation = e.currentTarget.dataset.operation;
    this.setData({
      num: this.data.num + operation
    })
  },
  cc:function(e){
    this.setData({
      gen: e.detail.value
    })
  },
  // 自定义事件，接收子组件传递的数据
  handCC: function(e){
    const {index} = e.detail
    var {tabs} = this.data
    tabs.forEach((v,i)=>i===index ? v.isActive=true:v.isActive=false)
    this.setData({
      tabs
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