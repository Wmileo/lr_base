import server from '@xq/server'

server.http.onFail((code, msg) => {
  if (code > 1 && msg) {
    $api.showToast(msg)
  }
  if (msg) {
    $log.warn('base-mp-config', 'serverOnFail', msg)
  }
})
server.http.onError(err => {
  if (err.message) {
    $log.warn('base-mp-config', 'serverOnError', err.message)
  }
})
server.http.onAuth(() => {
  return $auth.autoLogin(true)
})