import '../base/index.js'
import '@xq/stats/mp'
import '@xq/component'

import '../uni/index.js'
import config from './config/index.js'

import './biz/index.js'

import btnMgr from '@xq/component/com/btn/index.js'

function init() {
  config.init()
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

  btnMgr.bindingUserInfo(auth => {
    return $xq.auth.info(auth)
  })
  
  btnMgr.bingdingPhoneNumber(auth => {
    return $xq.auth.phone(auth)
  })
}

export default {
  init
}
