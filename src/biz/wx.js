import { fetchs, fetchCode } from 'server/fetch.js'
import { $api, $storage } from 'utils'
import server from '@xq/server'

let Fetchs = fetchs.wx

let isLogin = false
let logging = false

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
          wxLogin(res.code).then(() => {
            resolve()
            isLogin = true
            logging = false
          }, reject)
        }, reject)
      }
    })
  }
}

function wxLogin(authorizationCode) {
  let type = $api.isQy() ? "Q" : "A"
  return Fetchs.login().fetch({ authorizationCode, type }).then(res => {
    server.auth.setInfo({
      Authorization : res.data.token.access_token
    })
    getInfo()
    return res
  })
}

let userInfo = null
let isUpdate = false
function getInfo(success) {
  userInfo = $storage.userInfo.get()
  if (userInfo && success) {
    success(userInfo)
  }
  if (!isUpdate) {
    Fetchs.info().fetch().then(res => {
      isUpdate = true
      $storage.userInfo.set(res.data)
      if (success) {
        success(res.data)
      }
    })
  }
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


export default {
  autoLogin,
  getInfo,
  update,
  auth,
  authPhone
}
