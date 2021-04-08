import utils from '../utils/index.js'
import '../uni/index.js'
import './biz/index.js'
import './config/index.js'
import './config/notification.js'

function init(Vue) {
  utils.init(Vue)
  $api.showLoading("登录中...")
  $xq.auth.autoLogin().then(res => {
    $xq.wx.config()
  }).finally(() => {
    $api.hideLoading()
  })
}

export default {
  init
}

