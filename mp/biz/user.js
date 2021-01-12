import {
  fetchs
} from '@xq/server'
import $api from '@xq/api'
import server from '@xq/server'

let logging = false

let loginType = ''

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
  let type = loginType
  return fetchs.user.login().fetch({
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

function update(data) {
  return fetchs.user.update().fetch(data).then(res => {
    console.log(res)
  })
}

function auth(data) {
  if (authInfo.auth) {
    return Promise.resolve(authInfo.auth)
  } else {
    data.type = loginType
    return fetchs.user.auth().fetch(data).then(res => {
      authInfo.auth = res.data
      return res.data
    })
  }
}

function authPhone(data) {
  data.type = loginType
  return fetchs.user.phone().fetch(data).then(res => {
    return res.data
  })
}

function log() {
  fetchs.user.log().fetch({
    type: loginType
  })
}

function setLoginType(type) {
  loginType = type
}

function info() {
  return authInfo
}

export default {
  autoLogin,
  update,
  auth,
  authPhone,
  log,
  setLoginType,

  info
}
