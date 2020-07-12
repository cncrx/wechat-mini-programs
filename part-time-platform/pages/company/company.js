var app = getApp()
var baseUrl = app.globalData.host

Page({
  data: {
    companyDetail: [],
    avatarSrc: ''
  },
  
  onLoad: function (options) {
    var that = this
    var companyId = options.companyId
    
    wx.request({  // 获取公司信息
      url: baseUrl + 'cu/' + companyId,
      success(res) {
        console.log(res.data)
        that.setData({
          companyDetail: res.data,
          avatarSrc: 'http://120.79.85.160:80/pt/avatar?id=' + companyId // 图片通过转发的话会乱码
        })
      }
    })
  },

  onShow: function () {

  },

  onShareAppMessage: function () {

  },


  goBack() {
    wx.navigateBack({
      delta: 1
    })
  }
})