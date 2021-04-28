// pages/login/index.js
Page({
	handleGetUserInfo(e){
		const {userInfo} = e.detail
		wx.setStorageSync("userinfo",userinfo)
		wx.navigateBack({
			delta:1
		})
	}
 
})