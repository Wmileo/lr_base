import base from '../index.js'
import stats from '@xq/stats/mp'

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
  updateManager.onUpdateReady(function() {
    updateManager.applyUpdate()
  })
  $auth.autoLogin().then(res => {
    isLogin = true
  })
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
