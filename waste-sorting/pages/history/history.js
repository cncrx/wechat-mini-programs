Page({

  data: {
    historyList: []
  },

  jumpToResult: function(e){
    var wname = e.currentTarget.dataset.wname
    wx.request({
      url: 'https://sffc.sh-service.com/wx_miniprogram/sites/feiguan/trashTypes_2/Handler/Handler.ashx',
      data: {
        a: "GET_KEYWORDS",
        kw: wname
      },
      success: res => {
        // 判断输入的关键词是否有结果，没则提示
        try {
          // 定义个数组，含N个JSON
          var dataList = []
          for (var i = 0; i < res.data.kw_list.length; i++) {
            var name = res.data.kw_list[i]
            var type = res.data.kw_arr[i]["CssName"]
            dataList.push({
              name,
              type
            })
          }

          // 字符串化用于传递值给详情页
          var wasteList = JSON.stringify(dataList)

          // 跳转到详情页
          wx.navigateTo({
            url: '/pages/result/result?wasteList=' + wasteList
          })

        } catch (e) {
          $Toast({
            content: '跳转错误，请稍候重试',
            type: 'warning'
          });
        }

      }
    })
  },

  deleteHistory: function(e) {
    // 获取当前元素下标
    var index = e.currentTarget.dataset.index

    // 获取数组，删除元素，并再次存储，刷新
    var historyList = this.data.historyList
    historyList.splice(index, 1) //
    this.setData({
      historyList: historyList
    })
    wx.setStorageSync("history", historyList)
  },

  onLoad: function(options) {
    
  },

  onShow: function() {
    var history = wx.getStorageSync("history")
    if (history) {
      this.setData({
        historyList: history
      })
    }
  },
  onShareAppMessage: function() {

  }
})