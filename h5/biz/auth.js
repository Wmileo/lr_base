import server from '@xq/server'

let logging = false
let isLogin = false
let isAuth = false

function autoLogin(force = false) {
  isLogin = $storage.isLogin.get()
  isAuth = $storage.isAuth.get()
  if (isLogin && !force) {
    return Promise.resolve()
  }
  let opt = $channel().option
  if (opt.token && opt.u) {
    server.auth.setInfo({
      Authorization: opt.token
    })
    $storage.token.set(opt.token)
    $storage.userId.set(opt.u)
    isLogin = true
    isAuth = true
    return Promise.resolve()
  } else if (opt.state) {
    return new Promise((resolve, reject) => {
      if (logging) {
        setTimeout(() => {
          autoLogin().then(resolve, reject)
        }, 40)
      } else {
        logging = true
        let fail = (err) => {
          reject(err)
          logging = false 
        }
        $xq.auth.login(opt.code).then(res => {
          resolve()
          isAuth = res.data.state != 0
          isLogin = true
          logging = false
          $storage.isAuth.set(isAuth)
          $storage.isLogin.set(isLogin)
          $notification.authState.emit(res.data.state)
        }, fail)
      }
    })
  } else {
    auth()
    return Promise.reject()
  }
}

function tryAuth() {
  if (isAuth) {
    return Promise.resolve()
  }
  return new Promise((resolve, reject) => {
    if (logging) {
      setTimeout(() => {
        tryAuth().then(resolve, reject)
      }, 40)
    } else {
      auth(true)
    }
  })
}

function isAuthed() {
  if (isAuth) {
    return Promise.resolve()
  }
  return new Promise((resolve, reject) => {
    if (logging) {
      setTimeout(() => {
        isAuthed().then(resolve, reject)
      }, 40)
    } else {
      reject()
    }
  })
}

let str1 = '64ffa23'
let str2 = '0391696'

function auth(userinfo = false) {
  let id = `wx${str1}aa${str2}`
  let uri = encodeURIComponent(window.location.href)
  let scope = userinfo ? 'snsapi_userinfo' : 'snsapi_base'
  let state = userinfo ? '2' : '1'
  let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${id}&redirect_uri=${uri}&response_type=code&scope=${scope}&state=${state}#wechat_redire`
  window.location.href = url
  // window.location.replace(url)
}

Object.assign($xq.auth, {
  autoLogin,
  tryAuth,
  isAuthed
})
