Page({
  data: {
    toggleTip: true,
    CDRunning: false,
    TCDState: "专注",
    minutes: "30",
    seconds: "0",
    toggleCD: true,

    time: "00:00",
    nminutes: "0",
    nseconds: "0",

    todoElem: '',
    todoList: [],

    date: "",
    cddText: "",
    cddList: [],
    currTimestamp: "",
    cddTimestamp: "",

    bkList: ""
  },

  toggleCD() {
    this.setData({
      toggleCD: !this.data.toggleCD,
      toggleTip: false
    })
  },

  // 番茄计时 ===========================================
  tomatoCountDown() {
    if (!this.data.CDRunning) {
      var that = this
      var minutes = 30
      var seconds = 1
      this.setData({
        CDRunning: true
      })

      var i = setInterval(function () { // Interval 对象
        if (that.data.CDRunning == false) { // 按钮停止条件
          clearInterval(i)
          return
        }

        seconds--

        if (seconds == 0) {
          if (minutes != 0) {
            seconds = 59
            minutes--
          } else {
            clearInterval(i)
            that.setData({
              CDRunning: false
            })
          }
        }

        if (minutes == 4) {
          that.setData({
            TCDState: "休息"
          })
        }

        that.setData({
          minutes,
          seconds
        })
      }, 1000)
    } else {
      this.setData({
        minutes: "30",
        seconds: "0",
        TCDState: "专注",
        CDRunning: false
      })
    }
  },


  // 普通计时 ===========================================
  bindPickerTimeChange(e) {
    var nminutes = Number((e.detail.value).split(":")[0])
    var nseconds = Number((e.detail.value).split(":")[1])
    this.setData({
      time: e.detail.value,
      nminutes,
      nseconds
    })
  },

  normalCountDown() {
    if (!(this.data.CDRunning) && (this.data.nminutes!=0 || this.data.nseconds!=0)) {
      var that = this
      var nminutes = this.data.nminutes
      var nseconds = this.data.nseconds
      this.setData({
        CDRunning: true
      })

      var i = setInterval(function () { // Interval 对象
        //if (nminutes && nseconds == 0) { // 00:00 时不予执行
        //  clearInterval(i)
        //  return}
        if (that.data.CDRunning == false) { // 按钮停止条件
          clearInterval(i)
          return
        }

        nseconds--

        if (nseconds == 0) {
          if (nminutes != 0) {
            nseconds = 59
            nminutes--
          } else {
            clearInterval(i)
            that.setData({
              CDRunning: false
            })
          }
        }

        that.setData({
          nminutes,
          nseconds
        })
      }, 1000)
    } else {
      this.setData({
        nminutes: "0",
        nseconds: "0",
        CDRunning: false
      })
    }
  },


  // TODO ===========================================
  bindTODOText(e) {
    this.setData({
      todoElem: e.detail.value
    })
  },

  delTODO(e) {
    var todoList = this.data.todoList
    var todoElemIndextoDel = e.currentTarget.dataset.elemIndex // 下标
    
    todoList.splice(todoElemIndextoDel, 1) // 获取下标并切片

    this.setData({
      todoList
    })

    wx.setStorage({ // 存入 storage
      key: 'todoList',
      data: JSON.stringify(todoList),
    })
  },


  // 记账 ===========================================
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
  

  // 跳转相应详情页 ===========================================
  jumpToPage(e) {
    console.log(e)
    var page = e.currentTarget.dataset.page
    wx.switchTab({
      url: '/pages/'+page+"/"+page,
    })
  },


  onLoad: function(options) {
    var y = new Date().getFullYear()
    var m = new Date().getMonth()+1
    var d = new Date().getDate()
    var date = (y + "-" + m + "-" + d)
    var currTimestamp = Math.round(new Date(date).getTime() / 1000)

    this.setData({
      date,
      currTimestamp
    })

  },


  onShow() {
    var that = this

    wx.getStorage({  // 每次 onShow 都同步 todoList
      key: 'todoList',
      success: function (res) {
        var todoList = JSON.parse(res.data)
        that.setData({
          todoList
        })
      },
    })

    wx.getStorage({  // 每次 onShow 都同步 cddList
      key: 'cddList',
      success: function (res) {
        var cddList = JSON.parse(res.data)
        that.setData({
          cddList
        })
      },
    })

    wx.getStorage({  // 每次 onShow 都同步 bkList
      key: 'bkList',
      success: function(res) {
        var bkList = JSON.parse(res.data)
        that.setData({
          bkList
        })
      },
    })
  },

  onShareAppMessage() {

  }
})