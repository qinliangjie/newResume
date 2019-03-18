//index.js
const app = getApp()

Page({
  data: {
    bgImg: '',
    name: '',
    proImg: '',
    sign: '',
    openid: "oaJdJ5HbfpYNIV_65OxcTgl-iFYo",
    showOne: false,
    margin: [],
    animation: [] //动画
  },
  //下拉刷新
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh()
  },
  test: function() {
    console.log(1)
  },
  //格式化时间代码
  formatDate: function(e, fmt) {
    var o = {
      "M+": e.getMonth() + 1, //月份 
      "d+": e.getDate(), //日 
      "H+": e.getHours(), //小时 
      "m+": e.getMinutes(), //分 
      "s+": e.getSeconds(), //秒 
      "q+": Math.floor((e.getMonth() + 3) / 3),
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
        if (res.result.openid == that.data.openid) {
          that.setData({
            showOne: true
          })
        }

      }
    })
    const db = wx.cloud.database()
    new Promise(function(resolve, reject) {
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
    }).then(function() {
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

      let times = new Date().getTime();
      let datas = [];
      db.collection('Arctic').orderBy('date', 'desc').limit(10).get().then(res => {
        if (that.data.p_index == 0) {
          for (var a of res.data) {
            a.date = that.formatDate(a.date, "yyyy-MM-dd HH:mm:ss")
            datas.push(a)
          }
        }
        //三个月
        if (that.data.p_index == 1) {
          for (var a of res.data) {
            if (times - a.date.getTime() < 90 * 24 * 60 * 60 * 1000) {
              a.date = that.formatDate(a.date, "yyyy-MM-dd HH:mm:ss")
            }
            datas.push(a)
          }
        }
        //一个星期
        if (that.data.p_index == 2) {
          for (var a of res.data) {
            if (times - a.date.getTime() < 7 * 24 * 60 * 60 * 1000) {
              a.date = that.formatDate(a.date, "yyyy-MM-dd HH:mm:ss")
            }
            datas.push(a)
          }
        }
        //三天
        if (that.data.p_index == 3) {
          for (var a of res.data) {
            if (times - a.date.getTime() < 3 * 24 * 60 * 60 * 1000) {
              if (times - a.date.getTime()<  60 * 60 * 1000){
                a.date = parseInt((times -a.date.getTime()) / ( 60 * 1000))+'分钟前';
              }else{
                a.date = that.formatDate(a.date, "yyyy-MM-dd HH:mm:ss")
              }
               
            }
            datas.push(a)
          }
        }
        that.setData({
          dateList: datas
        })

      })
    })
    

  },
  gotoEdit: function() {
    wx.navigateTo({
      url: '../editResume/editResume'
    })
  },
  gotoAdd: function() {
    wx.navigateTo({
      url: '../editArtcle/editArtcle'
    })
  },
  delect: function(e) {
    let that = this
    var animate = []
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
          let i = e.currentTarget.dataset.delectIndex;
          animate[i] = wx.createAnimation();
          animate[i].height(0).step({
            duration: 200
          });
          var deletedtodo = 'animation[' + i + ']';
          var margintodo = 'margin[' + i + ']';
          that.setData({
            [margintodo]: 0
          })
          that.setData({
            [deletedtodo]: animate[i].export()
          })

        } else if (res.cancel) {

        }
      }
    })
  }
})