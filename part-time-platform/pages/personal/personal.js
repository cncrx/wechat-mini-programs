var app = getApp()
var baseUrl = app.globalData.host
const {
  $Toast
} = require('../../iview-ui/dist/base/index') // Toast

Page({
  data: {
    jwt: null,
    logged: false,
    wechatNickName: {},
    jobsApplyList: null,
    jobsFavList: null
  },

  onLoad: function(options) {
    var that = this
    wx.getStorage({
      key: 'wechatNickName',
      success: function(res) {
        that.setData({
          wechatNickName: res.data
        })
      },
    })
  },

  jumpToDetail(e) {
    wx.navigateTo({
      url: '../job/job?jobId=' + e.currentTarget.dataset.jobId,
    })
  },

  onShow() {
    var that = this
    
    wx.getStorage({
      key: 'jwt',
      success: function (res) {
        that.setData({
          jwt: res.data,
          logged: true
        })

        console.log("that.data.jwt", that.data.jwt)
        if (that.data.jwt) {
          console.log("got jwt")
          wx.request({ // 请求已应聘岗位
            url: baseUrl + 'candidates/',
            header: {
              "AUTHORIZATION": that.data.jwt // 根据 jwt 来判断用户
            },
            success(res) {
              let jobsApplyList = res.data
              console.log("jobsApplyList", jobsApplyList)
              that.setData({
                jobsApplyList
              })
            }
          })

          wx.request({ // 请求收藏的岗位
            url: baseUrl + 'favoritejobs/',
            header: {
              "AUTHORIZATION": that.data.jwt
            },
            success(res) {
              let jobsFavList = res.data
              console.log("jobsFavList", jobsFavList)
              that.setData({
                jobsFavList
              })
            }
          })
        } // if
      } // suc
    })
  },

  login(e) {
    var that = this
    var wechatNickName = e.detail.userInfo.nickName

    wx.login({ // 申请 code
      success(res) {
        
        if (res.code) {
          var wechat_code = res.code
          console.log("wechat code", wechat_code)
          wx.request({ // code 传去后端换 jwt
            url: baseUrl + 'wechat/',
            method: 'post',
            data: {
              "code": wechat_code
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            success(res) {
              console.log("res", res)
              if (res.statusCode === 400 || res.statusCode === 500) { // 登录或注册失败
                $Toast({
                  content: res.data.err_msg, // Toast 下后端返回的报错原因
                  type: 'warning'
                });
              } else if (res.statusCode === 200 || res.statusCode === 201) { // 登录或注册成功
                wx.setStorage({
                  key: 'jwt',
                  data: res.data.jwt,
                })

                wx.setStorage({
                  key: 'wechatNickName',
                  data: wechatNickName,
                })

                $Toast({
                  content: '登录/注册成功', // 成功的 Toast
                  type: 'success'
                })

                that.setData({ // 注册成功的 setData
                  jwt: res.data.jwt,
                  logged: true,
                  wechatNickName
                })
                if (that.data.jwt) { // 登录成功后自动请求 已应聘的岗位和收藏岗位
                  console.log("has jwt")
                  wx.request({ // 已应聘岗位
                    url: baseUrl + 'candidates/',
                    header: {
                      "AUTHORIZATION": that.data.jwt
                    },
                    success(res) {
                      let jobsApplyList = res.data
                      console.log(jobsApplyList)
                      that.setData({
                        jobsApplyList
                      })
                    }
                  })

                  wx.request({ // 收藏的岗位
                    url: baseUrl + 'favoritejobs/',
                    header: {
                      "AUTHORIZATION": that.data.jwt
                    },
                    success(res) {
                      let jobsFavList = res.data
                      console.log(jobsFavList)
                      that.setData({
                        jobsFavList
                      })
                    }
                  })
                }
              }
            }
          })
        } else {
          $Toast({
            content: 'wechat code 获取失败',
            type: 'warning'
          })
        }
      }
    })

  },

  logout() {
    try {
      wx.clearStorage() // 清空 Storage
      $Toast({
        content: '注销成功',
        type: 'sucess'
      })
      wx.reLaunch({ // 刷新
        url: '/pages/personal/personal',
      })
    } catch (e) {
      $Toast({
        content: '注销失败',
        type: 'warning'
      })
    }
  }
})