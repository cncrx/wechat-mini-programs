var app = getApp()
var baseUrl = app.globalData.host
const {
  $Toast
} = require('../../iview-ui/dist/base/index') // Toast

Page({

  data: {
    jobDetail: [],
    jwt: null
  },

  onLoad: function(options) {
    var that = this
    var jobId = options.jobId

    wx.request({
      url: baseUrl + 'jobs/' + jobId,
      success(res) {
        console.log(res.data)
        that.setData({
          jobDetail: res.data
        })
      }
    })

    wx.getStorage({
      key: 'jwt',
      success: function(res) {
        that.setData({
          jwt: res.data
        })
      },
    })
  },

  onShareAppMessage: function() {

  },

  companyDetail(e) {
    console.log(e.currentTarget.dataset.companyId)
    wx.navigateTo({
      url: '../company/company?companyId=' + e.currentTarget.dataset.companyId
    })
  },

  farvoriteJob(e) {
    var that = this

    if (that.data.jwt != null) {
      console.log(that.data.jwt)
      wx.request({
        url: baseUrl + 'favoritejobs/',
        method: 'post',
        header: {
          "AUTHORIZATION": that.data.jwt
        },
        data: {
          BelongtoJob: that.data.jobDetail.id,
          JobName: that.data.jobDetail.JobName
        },
        success(res) {
          console.log(res)
          if (res.statusCode === 401 || res.statusCode === 500) {
            $Toast({
              content: '收藏失败',
              type: 'warning'
            });
          } else if (res.statusCode === 201) {
            $Toast({
              content: '收藏成功',
              type: 'success'
            })
          }
        }
      })
    }
  },

  applyJob(e) {
    var that = this

    if (that.data.jwt != null) {
      console.log(that.data.jwt)
      wx.request({
        url: baseUrl + 'candidates/',
        method: 'post',
        header: {
          "AUTHORIZATION": that.data.jwt
        },
        data: {
          BelongtoJob: that.data.jobDetail.id,
          JobName: that.data.jobDetail.JobName,
          BelongtoCompany: that.data.jobDetail.BelongtoCompany,
        },
        success(res) {
          console.log(res)
          if (res.statusCode === 401 || res.statusCode === 500) {
            $Toast({
              content: '应聘提交失败',
              type: 'warning'
            })
          } else if (res.statusCode === 201) {
            $Toast({
              content: '应聘提交成功',
              type: 'success'
            })
          }
        }
      })
    }
  }
})