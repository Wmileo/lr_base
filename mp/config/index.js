import './fetch.js'
import './image.js'
import './notification.js'
import server from '@xq/server'

function init() {
  server.config.onFail((code, msg) => {
    if (code > 1 && msg) {
      $api.showToast(msg)
    }
    if (msg) {
      $log.warn('base-mp-config', 'serverOnFail', msg)
    }
  })
  server.config.onError(err => {
    if (err.message) {
      $log.warn('base-mp-config', 'serverOnError', err.message)
    }
  })
  server.config.onAuth(() => {
    return $xq.auth.autoLogin()
  })
  server.auth.passList.push($fetch.user.login().path)
  $xq.auth.log()
}

export default {
  init
}
