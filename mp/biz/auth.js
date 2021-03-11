import server from '@xq/server'

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
        $xq.auth.login(res.code).then((res) => {
          authInfo.login = res.data
          resolve()
          logging = false
        }, fail)
      }, fail)
    }
  })
}

function info(data) {
  if (authInfo.auth) {
    return Promise.resolve(authInfo.auth)
  } else {
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
      authInfo.auth = res.data
      return res.data
    })
  }
}

function phone(data) {
  data.type = $storage.port.get()
  return $fetch.auth.phone().fetch(data).then(res => {
    authInfo.phone = res.data
    return res.data
  })
}

Object.assign($xq.auth, {
  autoLogin,
  info,
  phone
})
