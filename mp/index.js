import base from '../index.js'
import stats from '@dt/stats'

$stats = stats

import '../uni/index.js'
import './config/index.js'

import './biz/index.js'

function init(Vue) {
  base.init(Vue)
  initConfig()
}

let isLogin = false

function initConfig() {
  
  const updateManager = uni.getUpdateManager()
  if (updateManager) {
    updateManager.onUpdateReady(function() {
      updateManager.applyUpdate()
    })
  }
  $api.handleSession(() => {
    if (isLogin) {
      return Promise.resolve()
    } else {
      return $auth.autoLogin().then(res => {
        isLogin = true
        return res
      })
    }
  })
}

export default {
  init
}
