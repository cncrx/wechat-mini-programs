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
  },

  onLoad: function(options) {
    var that = this

    wx.getStorage({
      key: 'jwt',
      success: function(res) {
        that.setData({
          jwt: res.data,
          logged: true
        })
      }
    })

    wx.getStorage({
      key: 'wechatNickName',
      success: function(res) {
        that.setData({
          wechatNickName: res.data
        })
      },
    })
  },

  login(e) {
    var that = this
    var wechatNickName = e.detail.userInfo.nickName

    wx.login({
      success(res) {
        if (res.code) {
          var wechat_code = res.code

          wx.request({ // code 后端换 openid 和 jwt
            url: baseUrl + 'wechat/',
            method: 'post',
            data: {
              "code": wechat_code
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            success(res) {
              console.log(res)
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

                $Toast({
                  content: '登录/注册成功', // 成功的 Toast
                  type: 'success'
                })

                wx.setStorage({
                  key: 'wechatNickName',
                  data: wechatNickName,
                })

                that.setData({ // 注册成功的 setData
                  jwt: res.data.jwt,
                  logged: true,
                  wechatNickName
                })
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
      wx.clearStorage()
      $Toast({
        content: '注销成功',
        type: 'sucess'
      })
      wx.reLaunch({
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