
import debugMgr from '../uni/utils/debug.js'
import serverMgr from '@xq/server'

function init(config) { //切换环境
  debugMgr.setDebug({
    envs: config.envs,
    onEnv(env) {
      config.onEnv(env)
      serverMgr.auth.clear()
      $auth.autoLogin()
    },
    onLog() {
      config.onLog()
    }
  })
}

export default {
  init
}
