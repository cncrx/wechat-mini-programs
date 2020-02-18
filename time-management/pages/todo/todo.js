// pages/todo/todo.js
Page({
  data: {
    todoList: [],
    todoElem: "",
    todoElemValue: null  // 用于清空输入框
  },

  bindTODOText(e) {
    this.setData({
      todoElem: e.detail.value
    })
  },

  addTODO() {
    var todoList = this.data.todoList
    var todoElem = this.data.todoElem

    todoList.push(todoElem)  // 往尾部添加数据

    wx.setStorage({  // 存入 storage
      key: 'todoList',
      data: JSON.stringify(todoList),
    })

    this.setData({
      todoList,
      todoElemValue: ''
    })
  },

  delTODO(e) {
    var todoList = this.data.todoList
    var todoElemIndex2Del = e.currentTarget.dataset.elemIndex  // 下标

    todoList.splice(todoElemIndex2Del, 1)  // 获取下标并切片

    this.setData({
      todoList
    })

    wx.setStorage({  // 存入 storage
      key: 'todoList',
      data: JSON.stringify(todoList),
    })
  },
  
  onShow() {
    var that = this

    wx.getStorage({  // 每次 OnShow 都同步 todoList
      key: 'todoList',
      success: function (res) {
        var todoList = JSON.parse(res.data)
        that.setData({
          todoList
        })
      },
    })
  },

  onShareAppMessage: function () {

  }
})