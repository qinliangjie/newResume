//index.js
const app = getApp()

Page({
  data: {
    bgImg:'',
    name:'',
    proImg:'',
    sign:'',
    openid:"oaJdJ5HbfpYNIV_65OxcTgl-iFYo",
    showOne:false,
    p_index:0
  },

  onLoad: function() {
    var that = this;
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        if (res.result.openid == that.data.openid){
          console.log(res.result.openid == that.data.openid)
          that.setData({
            showOne: true
          })
        }
       
      }
    })
    const db = wx.cloud.database()
    new Promise(function (resolve, reject) {
      db.collection('userInfo').where({
        _id: 'XII8yXkPDdDCJ6tj'
      }).get({
        success(res) {
          that.setData({
            proId: res.data[0].hdimg,
            bgId: res.data[0].bgimg,
            name: res.data[0].name,
            sign: res.data[0].signature,
            p_index: res.data[0].p_index
          })
          resolve()
        }
      });
    }).then(function () {
      wx.cloud.downloadFile({
        fileID: that.data.proId
      }).then(res => {
        that.setData({
          proImg: res.tempFilePath
        })
      }).catch(error => {

      })
      wx.cloud.downloadFile({
        fileID: that.data.bgId
      }).then(res => {
        that.setData({
          bgImg: res.tempFilePath
        })
      }).catch(error => {

      })
    })
    db.collection('Arctic').get().then(res => {
      that.setData({
        dateList:res.data
      })
    })
  },
  gotoEdit:function(){
    wx.navigateTo({
      url: '../editResume/editResume'
    })
  },
  gotoAdd:function(){
    wx.navigateTo({
      url: '../editArtcle/editArtcle'
    })
  }
})
