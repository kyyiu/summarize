// pages/auth/index.js
import {request} from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime.js"
import {login} from "../../utils/asyncWx.js"
Page({

  //获取用户信息
  async handleGetUserInfo(e){
    try{
      //获取用户信息
      const { encryptedData, rawData, iv, singature } = e.detail;
      //获取小程序登录成功后的code
      const { code } = await login()
      const loginParams = { encryptedData, rawData, iv, singature, code }
      //发送请求获取用户token
      const { token } = await request({ url: "/users/wxlogin", data: loginParams, method: "POST" })
      //吧token存入缓存中 同时跳转回上个界面
      wx.setStorageSync("token", token)
      wx.navigateBack({
        delta: 1
      })
    } catch (err) {
        console.log(err)      
    }

  }
  })