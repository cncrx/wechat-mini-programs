var app = getApp()
var baseUrl = app.globalData.host

Page({
  data: {
    loading: true,
    wechat_code: null,

    jobsList: [],
    jobsListPage: [],
    jobsCount: 0,  // 工作数量

    pageSize: 5,  // 每页显示数量
    page: 0,  // 页数
    current: 1,
  },

  onLoad() {
    var that = this

    wx.request({
      url: baseUrl + 'jobs/',
      method: "GET",
      success(res) {
        var pageSize = that.data.pageSize
        var page = Math.ceil(res.data.length / 5)
        if (res.data.length < pageSize) {
          that.setData({
            loading: false,
            jobsList: res.data,
            jobsCount: res.data.length,
            page,
            jobsListPage: res.data
          })
        } else { // 分页
          that.setData({
            loading: false,
            jobsList: res.data,
            jobsCount: res.data.length,
            page,
            jobsListPage: res.data.slice(0, pageSize)
          })
        }

      }
    })
  },

  onShow() {
    
  },

  onShareAppMessage: function() {

  },

  jumpToDetail(e) {
    wx.navigateTo({
      url: '../job/job?jobId=' + e.currentTarget.dataset.jobId,
    })
  },

  changePage(e) {
    if (e.detail.type === 'next') {
      this.setData({
        current: this.data.current + 1
      });
    } else if (e.detail.type === 'prev') {
      this.setData({
        current: this.data.current - 1
      });
    }

    var jobsList = this.data.jobsList
    var _start = (this.data.current - 1) * this.data.pageSize
    var _end = this.data.current * this.data.pageSize

    var jobsListPage = jobsList.slice(_start, _end)
    this.setData({
      jobsListPage
    })
  }

})