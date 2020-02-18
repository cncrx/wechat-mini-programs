Page({
  data: {
    bkTextElem: '',
    bkTextElemValue: null,

    bkCostElem: '',
    bkCostElemValue: null,

    bkList: []
  },

  bindBKText(e) {
    this.setData({
      bkTextElem: e.detail.value
    })
  },

  bindBKCost(e) {
    this.setData({
      bkCostElem: e.detail.value
    })
  },

  addBK(e) {
    var bkList = this.data.bkList
    var text = this.data.bkTextElem,
      cost = this.data.bkCostElem

    bkList.push([text, cost])

    this.setData({
      bkList,
      bkTextElemValue: '',
      bkCostElemValue: ''
    })

    wx.setStorage({
      key: 'bkList',
      data: JSON.stringify(bkList),
    })
  },

  delBK(e) {
    var bkList = this.data.bkList
    var bkElemIndex2Del = e.currentTarget.dataset.elemIndex

    bkList.splice(bkElemIndex2Del, 1)

    this.setData({
      bkList
    })

    wx.setStorage({
      key: 'bkList',
      data: JSON.stringify(bkList),
    })
  },

  onShow: function() {
    var that = this

    wx.getStorage({  // 每次 OnShow 都同步 todoList
      key: 'bkList',
      success: function (res) {
        var bkList = JSON.parse(res.data)
        that.setData({
          bkList
        })
      },
    })
  },
})