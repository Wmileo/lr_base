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
        }, 100)
      } else {
        logging = true
        $api.login().then(res => {
          console.log(res)
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

function auth(data) {
  return Fetchs.auth().fetch(data)
}

function authPhone(data) {
  return Fetchs.phone().fetch(data)
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
