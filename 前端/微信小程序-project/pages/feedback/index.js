// pages/feedback/index.js
/*
	1 点击'+'触发tap点击事件
		1调用小程序内置的选择图片的api
		2获取到图片的路径数组
		3把图片路径存到data的变量中
		4页面就可以根据 图片数组 进行循环显示 自定义组件
	2 点击自定义图片组件
		1 获取被点击的元素的索引
		2获取data中的图片数组
		3 根据索引数组中删除对应的元素
		4 把数组重新设置回data中
	3 点击提交
		1 获取文本域的内容 类似输入框的获取
			1 data中定义变量 表示 输入框内容
			2 文本域绑定输入事件 事件触发的时候 把输入框的值 存入到变量中
		2 对这些内容 合法性验证
		3 验证通过 用户选择的图片上传到专门的图片的服务器,返回图片外网链接
			1 遍历图片数组
			2 挨个上传
			3 自己在维护图片数组 存放图片 上传后到外网的链接
		4 文本域和外网的图片的路径 一起提交到服务器
		5 清空当前页面
		6 返回上一页
		
*/ 

Page({

  /**
   * 页面的初始数据
   */
  data: {
	tabs:[
	  {
	    id:0,
	    value:"体验问题",
	    isActive:true
	  },
	  {
	    id:1,
	    value:"商品商家投诉",
	    isActive:false
	  }
	],
	//被选中 的图片路径 数组
	chooseImgs:[],
	//文本域的内容
	textVal:""
  },
  
  //外网的图片的路径数组
  UpLoadImgs:[],
  
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
  //点击+触发选择图片
  handleChooseImg(){
	  //调用小程api
	  wx.chooseImage({
		  //同时选中的图片数量
		  count:8,
		  //图片 格式 原图 压缩
		  sizeType:['original','compressed'],
		  //图片来源 相册 照相机
		  sourceType:['album','camera'],
		  success:(res)=>{
			  this.setData({
				  chooseImgs: [...this.data.chooseImgs,...res.tempFilePaths]
			  })
		  }
	  })
  },
  //点击自定义图片组件
  handleRemoveImg(e){
	  //获取被点击的组件的索引
	const {index} = e.currentTarget.dataset  
	//获取data中的图片数组
	let {chooseImgs} = this.data
	// 删除元素
	chooseImgs.splice(index,1)
	this.setData({
		chooseImgs
	})
  },
  //文本域的输入事件
  handleTextInput(e){
	this.setData({
		textVal: e.detail.value
	})  
  },
  //提交按钮的点击
  handleFormSubmit(){
	  //获取文本域内容
	  const {textVal,chooseImgs} = this.data
	  //合法性验证
	  if(!textVal.trim()){
		  //不合法
		  wx.showToast({
			  title:"输入不合法",
			  icon: 'none',
			  mask:true
		  })
		  return
	  }
	  //准备上传图片 到专门的服务器
	  //上传文件的api不支持 多个文件同时上传
	  wx.showLoading({
		  title:"正在上传中",
		  mask:true
	  })
	  //判断有没有需要上传的图片数组
	  if(chooseImgs.length!=0){
		  chooseImgs.forEach((v,i)=>{
		  		  wx.uploadFile({
		  		  		  //图片要上传到哪里
		  		  		  url: 'https://images.ac.cn/Home/Index/UploadAction/',
		  		  		  //被上传的文件的路径
		  		  		  filePath: v ,
		  		  		  //上传的文件的名称 后台来获取文件 file
		  		  		  name: 'image',
		  		  		  //顺带的文本信息
		  		  		  formData: {},
		  				  success: (res)=>{
		  					  let url=JSON.parse(res.data).url
		  					  this.UpLoadImgs.push(url)
		  					  //所有图片都上传完毕了才触发
		  					  if(i===chooseImgs.length-1){
		  						  wx.hideLoading()
		  						  //提交都成功了
		  						  //重置页面
		  						  this.setData({
		  							  textVal:"",
		  							  chooseImgs:[]
		  						  })
		  						  //返回上一个页面
		  						  wx.navigateBack({
		  							  delta:1
		  						  })
		  					  }
		  				  }
		  				  
		  		  })
		  })
		  	
	  }else{
		  wx.hideLoading()
		  console.log("在提交了文本")
		  wx.navigateBack({
			  delta:1
		  })
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