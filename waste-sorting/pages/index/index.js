//index.js
const {
  $Toast
} = require('../../dist/base/index');

Page({
  data: {
    inputValue: "",
    wname: "",
    historyList: [],
    tips: ""
  },

  input: function(e) {
    this.setData({
      wname: e.detail.value
    })
  },

  handleClick: function() {

    // 判断输入框内容是否为空，空则提示
    if (this.data.wname) {
      wx.request({
        url: 'https://sffc.sh-service.com/wx_miniprogram/sites/feiguan/trashTypes_2/Handler/Handler.ashx',
        data: {
          a: "GET_KEYWORDS",
          kw: this.data.wname
        },
        success: res => {
          // 判断输入的关键词是否有结果，没则提示
          try  {
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

            // 字符串化用于传递值给结果页
            var wasteList = JSON.stringify(dataList)

            // 检测垃圾名与历史记录是否重复，如没重复则将查询的垃圾名存进数组，并存储
            var addHistory = this.data.historyList
            var repeat = false
            for (var i = 0; i < addHistory.length; i++){
              if (addHistory[i] === this.data.wname){
                repeat = true
                break
              }
            }
            if (!repeat) {
              addHistory.push(this.data.wname)
              wx.setStorageSync("history", addHistory)
            }
            
            // 跳转到详情页
            wx.navigateTo({
              url: '/pages/result/result?wasteList=' + wasteList
            })

            // 清空输入框
            this.setData({
              inputValue: ""
            })

          } catch(e) {
            $Toast({
              content: '您输入的关键词没有查询到结果',
              type: 'warning'
            });
            console.log(e)
          }
          
        }
      })
    } else {
      $Toast({
        content: '输入内容不能为空',
        type: 'error'
      });
    }
  },

  onLoad: function() {
    var history = wx.getStorageSync("history")
    if (history) {
      this.setData({
        historyList: history
      })
    } else {
      var history = []
      this.setData({
        historyList: history
      })
      wx.setStorageSync("history", history)
    }
  },

  onShow: function() {
    var tips = [
      "可回收物(再生资源)是指回收后经过再加工可以成为生产原料或者经过整理可以再利用的物品，主要包括废纸类、塑料类、玻璃类、金属类、电子废弃物类、织物类等。",
      "矿泉水中剩余的水倒干净后再丢进垃圾桶可大大减少环卫工人的工作量，同时还可以压缩瓶罐的体积，方便运输。",
      "旧衣服如果不当作公益物品参与捐赠或再利用，而作为日常生活垃圾丢弃的时候，属于其他垃圾。",
      "其它垃圾，是指除可回收物、厨余/ 餐厨垃圾之外的垃圾，采取卫生填埋或焚烧的方式，有效减少对地下水、地表水、土壤及空气的污染。",
      "将回收价值高的可回收物率先分类投放，如报纸杂志、纸板箱、包装盒、PET塑料瓶、易拉罐等，确保这一类可回收物不被混合垃圾污染。",
      "不确定是否可以回收（或未明确说明）的废纸、废塑料，在未被污染的情况下，请先投放至可回收物收集容器。",
      "废弃的电池等含有金属汞等有毒物质，会对人类产生严重的危害，土壤中的废塑料会导致农作物减产，通过回收利用可以减少危害。",
      "今天你垃圾分类了吗？😀"
      ]
    var randNum = Math.floor((Math.random() * 7) + 1)
    var history = wx.getStorageSync("history")
    if (history) {
      this.setData({
        historyList: history,
        tips: tips[randNum]
      })
    }
  },
  onShareAppMessage: function () {

  }
})