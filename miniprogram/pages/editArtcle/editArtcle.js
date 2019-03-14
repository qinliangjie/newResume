// miniprogram/pages/editArtcle/editArtcle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allColor:'defalut',
    fontColor:'#333',
    title:'',
    content:''
  },
  changeColor:function(e){
    var types = e.currentTarget.dataset.type;
    switch (types){
      case "1":
        this.setData({
          allColor:'rgb(219, 219, 219)',
          fontColor: '#333'
        })
        break;
      case "2":
        this.setData({
          allColor: 'rgb(53, 167, 243)',
          fontColor: '#fff'
        })
        break;
      case "3":
        this.setData({
          allColor: 'rgb(250, 191, 81)',
          fontColor: '#fff'
        })
        break;
      case "4":
        this.setData({
          allColor: 'pink',
          fontColor: '#fff'
        })
        break;
      case "5":
        this.setData({
          allColor: 'black',
          fontColor: '#fff'
        })
        break;
    }
  },
  formTitle:function(e){
    this.setData({
      title: e.detail.value
    })
  },
  formContent:function(e){
    this.setData({
      content:e.detail.value
    })
  },
  comfire:function(e){
    const that = this;
    if (this.data.title==''){
      wx.showToast({
        icon:'none',
        title: '写一下标题嘛o(´^｀)o',
        duration:2000
      })
      return
    }
    if (this.data.content==''){
      wx.showToast({
        title: '写下发生什么嘛o(´^｀)o',
        icon:'none',
        duration:2000
      })
      return
    }
    wx.cloud.callFunction({
      name:'artcle',
      data:{
        database:{
          title: that.data.title,
          content: that.data.content,
          color: that.data.allColor,
          fontColor: that.data.fontColor
        }
      },
      success: res => {
        wx.redirectTo({
          url: '/pages/index/index',
        })
      },
      fail: err => {
        console.log(err)
        wx.showToast({
          title: '保存失败，傻钓服务7',
          icon: 'none',
          duration: 2000
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