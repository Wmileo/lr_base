import authMgr from '../../uni/biz/auth.js'

let logging = false

let authInfo = {}

function autoLogin() {
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
      $api.login().then(res => {
        authMgr.login(res.code).then((res) => {
          authInfo.login = res.data
          resolve()
          logging = false
        }, fail)
      }, fail)
    }
  })
}

function info(data) {
  data.type = $storage.port.get()
  if (data.avatarUrl) {
    data.avatar = data.avatarUrl
    delete data.avatarUrl
  }
  if (data.nickName) {
    data.nick = data.nickName
    delete data.nickName
  }
  return $fetch.auth.info().fetch(data).then(res => {
    let info = authInfo.info
    let newInfo = res.data
    authInfo.info = newInfo
    if (!info || (info.nick != newInfo.nick || info.avatar != newInfo.avatar)) {
      $notification.auth.emit(authInfo)
    }
    return newInfo
  })
}

function phone(data) {
  data.type = $storage.port.get()
  return $fetch.auth.phone().fetch(data).then(res => {
    let phone = authInfo.phone
    let newPhone = res.data
    authInfo.phone = newPhone
    if (!phone || phone != newPhone) {
      $notification.auth.emit(authInfo)
    }
    return newPhone
  })
}

function get() {
  return authInfo
}

$auth = {
  autoLogin,
  info,
  phone,
  get
}
