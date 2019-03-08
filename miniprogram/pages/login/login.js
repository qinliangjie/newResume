Page({
  data: {
    normalcn: '您好',
    normalen: 'Hello',
    normaljp: '...'
  },
  onLoad: function (options) {
    this.app = getApp()
  },
  onShow() {
    setTimeout(function () {
      wx.redirectTo({
        url: '../index/index',
      })
    }, 8000)
  }

})