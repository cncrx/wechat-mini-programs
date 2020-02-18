const app = getApp()
Page({
  data: {
    //kwList: app.globalData.storageKw
  },
  onLoad: function (options) {
    //干(其他垃圾): gan
    //湿(厨余垃圾): shi
    //有害垃圾: youhai
    //可回收: kehuishou
    var wasteList = JSON.parse(options.wasteList)
    this.setData({
      wasteList: wasteList,
    })
  },
  onShareAppMessage: function () {
    
  }
})