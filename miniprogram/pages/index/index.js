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
  formatDate: function (e, fmt) {
    var o = {
      "M+": e.getMonth() + 1, //月份 
      "d+": e.getDate(), //日 
      "H+": e.getHours(), //小时 
      "m+": e.getMinutes(), //分 
      "s+": e.getSeconds(), //秒 
      "q+": Math.floor((e.getMonth() + 3) / 3), //季度 
      "S": e.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  },
  onLoad: function() {
    var that = this;
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        if (res.result.openid == that.data.openid){
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
      for (var a of res.data) {
        a.date = that.formatDate(a.date, "yyyy-MM-dd HH:mm:ss")
      }
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
  },
  delect:function(e){
    let that = this
    //刪除該條信息
    wx.showModal({
      title: '刪除操作',
      content: '操作不可逆，確定永久刪除嗎？',
      success(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'delect',
            data: {
              _id: e.currentTarget.dataset.delectId
            }
          })
          that.data.dateList.forEach((item,i)=>{
            if (item._id == e.currentTarget.dataset.delectId)
              that.data.dateList.splice(i,1)
          })
          var a = that.data.dateList
          that.setData({
            dateList: a
          })
        } else if (res.cancel) {
         
        }
      }
    })
  }
})
