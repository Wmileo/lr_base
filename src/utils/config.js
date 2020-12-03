import componentMgr from '@xq/component'
import { btnMgr } from '@xq/component'
import $api from '@xq/api'
import userMgr from 'biz/user.js'

// server
import server from 'server'

// image
import image from "server/image.js"

function init() {
  
  server.init()
  image.init()
  componentMgr.init()
  
  $api.handleRecheckSession((success, fail) => {
    userMgr.autoLogin().then(() => {
      success()
    }).catch(() => {
      fail()
    })
  })
  
  let handleUserInfo = false
  btnMgr.bindingUserInfo(auth => {
    if (!handleUserInfo) {
      userMgr.auth(auth).then(res => {
        handleUserInfo = true
      })
    }
  })
  let handlePhoneNumber = false
  btnMgr.bingdingPhoneNumber(auth => {
    if (!handlePhoneNumber) {
      userMgr.authPhone(auth).then(() => {
        handlePhoneNumber = true
      })
    }
  })
  
}

export default {
  init
}