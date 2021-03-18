import '../base/index.js'
import '../uni/index.js'
import './biz/index.js'
import './config/index.js'

function init() {
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

