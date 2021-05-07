import base from '../index.js'
import '../uni/index.js'
import './biz/index.js'
import './config/index.js'
import './config/notification.js'
import './config/storage.js'

function init(Vue) {
  base.init(Vue)
  $api.showLoading("登录中...")
  $auth.autoLogin().then(res => {
    $wx.config()
  }).finally(() => {
    $api.hideLoading()
  })
}

export default {
  init
}

