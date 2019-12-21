//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  getUserInfo: function(e) {
    console.log(e)

    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://localhost:3000/v1/token',
            method:'POST',
            data: {
              account: res.code,
              type:100
            },
            success (res) {
              //当token 过期 直接重定向 登录页面
              app.globalData.token = res.data.token;
            },
            fail(msg){
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  getLatest(){

    wx.request({
      url: 'http://localhost:3000/v1/classic/latest',
      method:'POST',
      header: {
        'content-type': 'application/json', // 默认值
        token:app.globalData.token,
      },
      data:{},
      success(res) {

      }
    })



  },
  clearToken(){
    app.globalData.token='';
  },
  getNext(){
    wx.request({
      url: 'http://localhost:3000/v1/classic/2/next',
      method:'POST',
      header: {
        'content-type': 'application/json', // 默认值
        token:app.globalData.token,
      },
      data:{},
      success(res) {

      }
    })
  },
  getPre(){
    wx.request({
      url: 'http://localhost:3000/v1/classic/2/previous',
      method:'POST',
      header: {
        'content-type': 'application/json', // 默认值
        token:app.globalData.token,
      },
      data:{},
      success(res) {

      }
    })
  },
  getLike(){
    wx.request({
      url: 'http://localhost:3000/v1/like',
      method:'POST',
      header: {
        'content-type': 'application/json', // 默认值
        token:app.globalData.token,
      },
      data:{
        art_id:1,
        type:100,
      },
      success(res) {

      }
    })
  },
  getDislike(){
    wx.request({
      url: 'http://localhost:3000/v1/like/cancel',
      method:'POST',
      header: {
        'content-type': 'application/json', // 默认值
        token:app.globalData.token,
      },
      data:{
        art_id:1,
        type:100,
      },
      success(res) {

      }
    })
  },
  getLikeDetail(){
    wx.request({
      url: 'http://localhost:3000/v1/classic/favor',
      method:'POST',
      header: {
        'content-type': 'application/json', // 默认值
        token:app.globalData.token,
      },
      data:{
        id:1,
        type:100,
      },
      success(res) {

      }
    })

  }
})
