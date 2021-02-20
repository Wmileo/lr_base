import server from '@xq/server'

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