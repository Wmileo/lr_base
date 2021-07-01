import server from '@xq/server'
let time = 0
let wait = false

let fail = (code, msg) => {
  if (code > 1 && msg) {
    $api.showToast(msg)
  }
  if (msg) {
    $log.warn('base-mp-config', 'serverOnFail', msg)
  }
}

let err = (err) => {
  if (err.message) {
    $log.warn('base-mp-config', 'serverOnError', err.message)
  }
}

let auth = () => {
  time++
  if (time >= 20) {
    if (!wait) {
      wait = true
      setTimeout(() => {
        wait = false
        time = 0
      }, 300000)
    }
    return Promise.reject(new Error('服务出错，请稍后使用'))
  }
  return $auth.autoLogin(true)
}

server.http.onFail({
  xq: fail,
  jz: fail
})
server.http.onError({
  xq: err,
  jz: err
})
server.http.onAuth({
  xq: auth
})
