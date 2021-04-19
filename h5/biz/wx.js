let $wx = require('jweixin-module')

let jsApiList = [
  'updateAppMessageShareData',
  'updateTimelineShareData',
]

let openTagList = [
  'wx-open-launch-weapp'
]

let debug = false//process.env.NODE_ENV == 'development'

function config() {
  $fetch.wx.sign().fetch({
    url: encodeURIComponent(window.location.href.split('#')[0])
  }).then(res => {
    $wx.config({
      debug,
      appId: res.data.appid,
      timestamp: res.data.timestamp,
      nonceStr: res.data.noncestr,
      signature: res.data.signature,
      jsApiList,
      openTagList
    })
  })
}

function updateShareData(data) {
  if ($utils.env.isH5InWx()) {
    data.type = 'share'
    postMessage(data)
  } else {
    $wx.ready(() => {
      $wx.updateAppMessageShareData({
        title: data.title, // 分享标题
        desc: data.desc, // 分享描述
        link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: data.imgUrl, // 分享图标
      })
      $wx.updateTimelineShareData({
        title: data.title, // 分享标题
        link: data.link, // 分享链接
        imgUrl: data.imgUrl, // 分享图标
      })
    })
  }
}

function postMessage(data) {
  $wx.ready(() => {
    $wx.miniProgram.postMessage({data})
  })
}

function navigateTo(url) {
  $wx.ready(() => {
    $wx.miniProgram.navigateTo({url})
  })
}

function navigateBack() {
  $wx.ready(() => {
    $wx.miniProgram.navigateBack()
  })
}

function redirectTo(url) {
  $wx.ready(() => {
    $wx.miniProgram.redirectTo({url})
  })
}

export default {
  config,
  updateShareData,
  postMessage,
  navigateTo,
  navigateBack,
  redirectTo
}
