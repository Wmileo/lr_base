import server from '@xq/server'
import { fetchs } from './fetch.js'

import userMgr from '../biz/user.js'
import $api from '@xq/api'

function init() {
  server.config.onFail((code, msg) => {
    if (code > 1 && msg) {
      $api.showToast(msg)
    }
    if (msg) {
      console.log(msg)
    }
  })
  server.config.onError(err => {
    if (err.message) {
      console.log(err.message)
    }
  })
  server.config.onAuth(() => {
    return userMgr.autoLogin()
  })
  server.auth.passList.push(fetchs.user.login().path)
  if (server.auth.needAuth()) {
    userMgr.autoLogin()
  }
  userMgr.log()
}

export default {
  init
}
