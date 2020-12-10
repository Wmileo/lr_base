import { fetchs } from '../server/fetch.js'
import $api from '@xq/api'
import server from '@xq/server'

let Fetchs = fetchs.user

let isLogin = false
let logging = false

let loginType = ''

function autoLogin() {
  if (isLogin) {
    return Promise.resolve()
  } else {
    return new Promise((resolve, reject) => {
      if (logging) {
        setTimeout(() => {
          autoLogin().then(resolve, reject)
        }, 40)
      } else {
        logging = true
        $api.login().then(res => {
          login(res.code).then(() => {
            resolve()
            isLogin = true
            logging = false
          }, reject)
        }, reject)
      }
    })
  }
}

function login(authorizationCode) {
  let type = loginType
  return Fetchs.login().fetch({ authorizationCode, type }).then(res => {
    server.auth.setInfo({
      Authorization : res.data.token.access_token
    })
    return res
  })
}

function update(data) {
  return Fetchs.update().fetch(data).then(res => {
    console.log(res)
  })
}

let authInfo = null
function auth(data) {
  if (authInfo) {
    return Promise.resolve(authInfo)
  } else {
    return Fetchs.auth().fetch(data).then(res => {
      authInfo = res.data
      return res.data
    })
  }
}

let authPhoneInfo = null
function authPhone(data) {
  if (authPhoneInfo) {
    return Promise.resolve(authPhoneInfo)
  } else {
    return Fetchs.phone().fetch(data).then(res => {
      authPhoneInfo = res.data
      return res.data
    })
  }
}

function setLoginType(type) {
  loginType = type
}

export default {
  autoLogin,
  update,
  auth,
  authPhone,
  setLoginType
}
