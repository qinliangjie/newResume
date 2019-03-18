// miniprogram/pages/editResume/editResume.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proImg: "",//头像
    name:"",//昵称
    bgImg: "",//背景图
    sign:"",//签名
    date: '2000-01-01',//出生日期
    privates:[{
      id:0,
      detail:'展示所有日志'
    },{
      id:1,
      detail:'仅展示三个月内的日志'
    },{
      id:2,
      detail:'仅展示一个星期内的日志'
    },{ 
      id:3,
      detail:'仅展示三天内的日志'
    }],
    p_index:1
  },
  gotoAdd: function () {
    setTimeout(function () {
      wx.navigateTo({
        url: '../index/index',
      })
    }, 1000)
    wx.showToast({
      icon: 'none',
      title: '保存成功',
      duration: 1000
    })
   
  },
  change_p_index(e){
    var i = e.detail.value
    wx.cloud.callFunction({
      name:'setting',
      data:{
        p_index:i
      }
    })
    this.setData({
      p_index: i
    })
  },
  saveName(e){
    var value = e.detail.value;
    wx.cloud.callFunction({
      name:'setting',
      data:{
        name:value
      }
    })
  },
  saveSign(e){
    var value = e.detail.value;
    wx.cloud.callFunction({
      name: 'setting',
      data: {
        sign: value
      }
    })
  },

  doUpload: function(event) {
    let that = this
    let aid = event.currentTarget.dataset.type
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        wx.showLoading({
          title: '上传中'
        })
        const filePath = res.tempFilePaths[0];
        const cloudPath = 'my-bg' + aid + filePath.match(/\.[^.]+?$/)[0];
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            let thisres = res;
            wx.showToast({
              icon: 'none',
              title: '上传成功'
            })
            that.setData({
              fileID: thisres.fileID
            })
             
          },
          fail: e => {
            console.log('[上传失败]:', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败'
            })
          },
          complete: () => {
            const db = wx.cloud.database()
            if (aid == 1) {
              wx.cloud.callFunction({
                name: 'setting',
                data: {
                  bgimg: that.data.fileID
                },
                success: res => {
                  that.setData({
                    bgImg: filePath
                  })
                },
                fail: err => {
                    wx.showToast({
                      icon: 'none',
                      title: '上传失败',
                    })
                  console.error('[云函数] [sum] 调用失败：', err)
                }
              })

            }
            if (aid == 2) {
              wx.cloud.callFunction({
                name: 'setting',
                data: {
                  hdimg: that.data.fileID
                },
                success: res => {
                  that.setData({
                    proImg: filePath
                  })
                },
                fail: err => {
                  wx.showToast({
                    icon: 'none',
                    title: '上传失败',
                  })
                  console.error('[云函数] [sum] 调用失败：', err)
                }
              })
            }

          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this
    const db = wx.cloud.database()
    new Promise(function (resolve, reject){
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
    }).then(function(){
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
    
   
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})