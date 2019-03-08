//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    openid:"oaJdJ5HbfpYNIV_65OxcTgl-iFYo",
    showOne:false
  },

  onLoad: function() {
    var that = this;
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        if (res.openid == that.openid)
        that.setData({
          showOne:true
        })
      }
    })
    wx.cloud.callFunction({
      name:'sum',
      complete:res=>{
        console.log(res)
      }
    })
    
  },
  gotoEdit:function(){
    wx.redirectTo({
      url: '../editResume/editResume'
    })
  }

})
