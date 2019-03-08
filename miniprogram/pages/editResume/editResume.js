// miniprogram/pages/editResume/editResume.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proImg:"",
    bgImg:"",
    photoImg:"",
    date:'2000-01-01'
  },
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  doUpload:function(event){
    let that = this
    let aid = event.currentTarget.dataset.type
    console.log(event)
    wx.chooseImage({
      count:1,
      sizeType:['compressed'],
      sourceType:['album','camera'],
      success:function(res){
        wx.showLoading({
          title: '上传中'
        })
        const filePath = res.tempFilePaths[0];
        const cloudPath = 'my-bg'+ aid + filePath.match(/\.[^.]+?$/)[0];
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success:res=>{
            console.log("[上传成功]:",res);
            if(aid==1){
              app.globalData.fileID = res.fileID
              app.globalData.cloudPath = cloudPath
              app.globalData.imagePath = filePath
            }
            if(aid==2){
              app.globalData.fileID_hd = res.fileID
              app.globalData.cloudPath_hd = cloudPath
              app.globalData.imagePath_hd = filePath
            }
          },
          fail:e=>{
            console.log('[上传失败]:',e)
            wx.showToast({
              icon:'none',
              title:'上传失败'
            })
          },
          complete:()=>{
            wx.hideLoading();
            const db = wx.cloud.database()
            if(aid==1){
              db.collection('userInfo').doc(this.data._id).update({
                data: {
                  bgimg: filePath
                },
                success: res => {
                  that.setData({
                    bgImg: filePath
                  })
                },
                fail:err=>{
                  icon: 'none',
                  console.log('上传失败');
                }
              })
              
            }
            if(aid==2){
              db.collection('userInfo').doc(this.data._id).update({
                data: {
                  hdimg: filePath
                },
                success: res => {
                  that.setData({
                    proimg: filePath
                  })
                },
                fail: err => {
                  icon: 'none',
                    console.log('上传失败');
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
    let that = this
    const db = wx.cloud.database()
    db.collection('userInfo').where({
      _id: 'XII8yXkPDdDCJ6tj'
    }).get({
      success(res) {
        that.setData({
          proImg:res[0].hdimg,
          bgImg:res[0].bgimg
        })
      }
    })
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