import utils from '../utils/index.js'
import '@xq/stats/mp'
import '@xq/component'

import '../uni/index.js'
import './config/index.js'

import './biz/index.js'

function init(Vue) {
  utils.init(Vue)
  initConfig()
}

let isLogin = false

function initConfig() {
  
  const updateManager = $api.getUpdateManager()
  updateManager.onUpdateReady(function() {
    updateManager.applyUpdate()
  })

  $xq.auth.autoLogin().then(res => {
    isLogin = true
  })

  $api.handleSession(() => {
    if (isLogin) {
      return Promise.resolve()
    } else {
      return $xq.auth.autoLogin()
    }
  })
}

export default {
  init
}
