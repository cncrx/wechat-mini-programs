// pages/countdown/countdown.js
Page({
  data: {
    date: "",
    cddText: "",
    cddTextValue: null,  // 用于清空输入框
    cddList: [],
    currTimestamp: "",
    cddTimestamp: "",
  },

  bindCddText(e) {
    this.setData({
      cddText: e.detail.value
    })
  },

  bindCountDownDate(e) {
    var cddTimestamp = Math.round(new Date(e.detail.value).getTime() / 1000)
    this.setData({
      date: e.detail.value,
      cddTimestamp
    })
  },

  addCDD() {
    var cddList = this.data.cddList
    var cddText = this.data.cddText
    var cddTimestamp = this.data.cddTimestamp

    cddList.push({
      text: cddText,
      ts: cddTimestamp
    })

    wx.setStorage({
      key: 'cddList',
      data: JSON.stringify(cddList),
    })

    this.setData({
      cddList,
      cddTextValue: ""
    })

  },

  delCDD(e) {
    var cddList = this.data.cddList
    var cddElemIndex2Del = e.currentTarget.dataset.elemIndex // 下标

    cddList.splice(cddElemIndex2Del, 1) // 获取下标并切片
    console.log(cddList)
    this.setData({
      cddList
    })

    wx.setStorage({ // 存入 storage
      key: 'cddList',
      data: JSON.stringify(cddList),
    })
  },

  onLoad: function(options) {
    var y = new Date().getFullYear()
    var m = new Date().getMonth() + 1
    var d = new Date().getDate()
    var date = (y + "-" + m + "-" + d)
    var currTimestamp = Math.round(new Date(date).getTime() / 1000)

    this.setData({
      date,
      currTimestamp
    })
  },

  onShow: function() {
    var that = this

    wx.getStorage({ // 每次 OnLoad 都同步 cddList
      key: 'cddList',
      success: function(res) {
        var cddList = JSON.parse(res.data)
        that.setData({
          cddList
        })
      },
    })
  },

  onShareAppMessage: function() {

  }
})