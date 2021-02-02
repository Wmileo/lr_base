import server from '@xq/server'

let logging = false

let userType = ''

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
        login(res.code).then(() => {
          resolve()
          logging = false
        }, fail)
      }, fail)
    }
  })
}

function login(authorizationCode) {
  let type = userType
  return $fetch.auth.login().fetch({
    authorizationCode,
    type
  }).then(res => {
    server.auth.setInfo({
      Authorization: res.data.token
    })
    authInfo.login = res.data
    return res
  })
}

function info(data) {
  if (authInfo.auth) {
    return Promise.resolve(authInfo.auth)
  } else {
    data.type = userType
    return $fetch.auth.info().fetch(data).then(res => {
      authInfo.auth = res.data
      return res.data
    })
  }
}

function phone(data) {
  data.type = userType
  return $fetch.auth.phone().fetch(data).then(res => {
    return res.data
  })
}

function log() {
  $fetch.auth.log().fetch({
    type: userType
  })
}

$notification.userType.on(type => {
  userType = type
})

export default {
  autoLogin,
  info,
  phone,
  log
}
