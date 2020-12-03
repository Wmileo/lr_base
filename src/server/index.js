import server from '@xq/server'
import { fetchs } from './fetch.js'

import userMgr from '../biz/user.js'
import $api from '@xq/api'

function init() {
  server.config.onFail((code, msg) => {
    if (msg) {
      console.log(msg)
    }
  })
  server.config.onError(err => {
    if (err.message) {
      console.log(err.message)
    }
  })
  server.config.needRetry((err, retry) => {
    return err.status == 401
  })
  server.config.onRetry((err, retry) => {
    if (err.status == 401) {
      return userMgr.autoLogin().then(() => {
        return retry()
      })
    } else {
      return retry()
    }
  })
  server.auth.passList.push(fetchs.user.login().path)
}

export default {
  init
}
