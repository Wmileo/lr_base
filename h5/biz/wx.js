import env from 'config/env.js'
$wx = require('jweixin-module')

let jsApiList = [
  'updateAppMessageShareData',
  'updateTimelineShareData',
]

function config() {
  $fetch.wx.sign().fetch({
    url: encodeURIComponent(window.location.href.split('#')[0])
  }).then(res => {
    $wx.config({
      debug: process.env.NODE_ENV == 'development',
      appId: data.appid,
      timestamp: data.timestamp,
      nonceStr: data.noncestr,
      signature: data.signature,
      jsApiList,
    })
  })
}

function updateShareData(data) {
  $wx.ready(function(){
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

export default {
  config,
  updateShareData
}
