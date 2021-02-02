
import debugMgr from './utils/debug.js'
import serverMgr from '@xq/server'

let isLogin = false

function debug(config) { //切换环境
  debugMgr.setDebug({
    envs: config.envs,
    onEnv(env) {
      isLogin = false
      config.onEnv(env)
      serverMgr.auth.clear()
      $xq.auth.autoLogin().then(res => {
        isLogin = true
      })
    },
    onLog() {
      config.onLog()
    }
  })
}

export default {
  debug
}
