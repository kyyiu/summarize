// promise 形式 getSetting
export const getSetting=()=>{
  return new Promise((resolve,reject)=>{
    wx-wx.getSetting({
      success: function(res) {resolve(res)},
      fail: function(res) {reject(res)},
      complete: function(res) {},
    })
  })
}


// promise 形式 chooseAddress
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx - wx.chooseAddress({
      success: function (res) { resolve(res) },
      fail: function (res) { reject(res) },
      complete: function (res) { },
    })
  })
}


// promise 形式 openSetting
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx - wx.openSetting({
      success: function (res) { resolve(res) },
      fail: function (res) { reject(res) },
      complete: function (res) { },
    })
  })
}



// promise 形式 showModal
//@param{object} param0 参数
export const showModal = ({content}) => {
  return new Promise((resolve, reject) => {
   wx-wx.showModal({
     title: '提示',
     content: content,
     success: (res)=> {
       resolve(res)
     },
     fail: (err)=> {
       reject(err)
     }
   })
  })
}


// promise 形式 showToast
//@param{object} param0 参数
export const showToast = ({ title }) => {
  return new Promise((resolve, reject) => {
    wx-wx.showToast({
      title: title,
      icon: 'none',
      success: (res)=> {
        resolve(res)
      },
      fail: (res)=> {
        reject(res)
      },
      complete: function(res) {},
    })
  })
}


// promise 形式 login
export const login = () => {
  return new Promise((resolve, reject) => {
    wx - wx.login({
      timeout:10000,
      success: (res) => {
        resolve(res)
      },
      fail: (res) => {
        reject(res)
      }
    })
  })
}


// promise 形式 requestPayment
//@param{object} pay 支付必要的参数
export const requestPayment = (pay) => {
  return new Promise((resolve, reject) => {
    wx-wx.requestPayment({
      ...pay,
      success: (res)=> {
        resolve(res)
      },
      fail: (res)=> {
        reject(res)
      },
      complete: function(res) {},
    })
  })
}