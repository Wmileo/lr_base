import '@xq/stats/mp'

import fetch from './server/fetch.js'
import image from './server/image.js'
import user from './biz/user.js'
import file from './biz/file.js'
import config from './biz/config.js'
// api
import api from '@xq/api'
import notification from './utils/notification.js'
import storage from './utils/storage.js'

// moment
import moment from 'moment'
// channel
import { channel } from './utils/channel.js'
import { notifications } from './utils/notification.js'
import { storages } from './utils/storage.js'

import server from './server/index.js'
import componentMgr from '@xq/component'
import { btnMgr } from '@xq/component'

import envMgr from './utils/env.js'

function debug(config) {
  envMgr.setDebug(config.envs, (env) => {
    config.onEnv(env)
    fetch.setBaseURL(env)
  })
}

function init(config, Vue) {
  
  const updateManager = api.getUpdateManager()
  updateManager.onUpdateReady(function () {
    updateManager.applyUpdate()
  })
  
  initVue(Vue)
  
  fetch.setBaseURL(config.baseURL)  // baseURL
  user.setLoginType(config.loginType) // loginType
  
  initConfig()

  image.setBaseUrl(config.imageUrl) // imageUrl
  image.setImageUrlKey(config.imageUrlKey) // imageUrlKey
  image.setImages(config.images) // images
  
  notification.setNotifications(config.notifications) // notifications
  storage.setStorages(config.storages) // storages
}

function initVue(Vue) {
  Vue.prototype.$api = api
  Vue.prototype.$channel = channel
  Vue.prototype.$notification = notifications
  Vue.prototype.$storage = storages
  Vue.prototype.$moment = moment
}

function initConfig() {
  server.init()
  componentMgr.init()
  
  user.autoLogin() // 每次重新登录确保最新
  // api.checkSession().catch(err => { 
  //   user.autoLogin()
  // })
  
  api.handleRecheckSession((success, fail) => {
    user.autoLogin().then(() => {
      success()
    }).catch(() => {
      fail()
    })
  })
  
  btnMgr.bindingUserInfo(auth => {
    return user.auth(auth)
  })
  btnMgr.bingdingPhoneNumber(auth => {
    return user.authPhone(auth)
  })
}

export const $api = api
export const configMgr = config
export const fileMgr = file
export const userMgr = user
export let $storage = storages
export let $notification = notifications
export const $moment = moment
export default {
  init,
  debug
}

