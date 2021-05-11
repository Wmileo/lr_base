import server from '@xq/server'
let time = 0
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
  time++
  if (this >= 80) {
    return Promise.reject(new Error('服务出错，请稍后使用'))
  }
  return $auth.autoLogin(true)
})