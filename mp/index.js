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
import {
  channel
} from './utils/channel.js'
import {
  notifications
} from './utils/notification.js'
import {
  storages
} from './utils/storage.js'

import server from './server/index.js'
import componentMgr from '@xq/component'
import {
  btnMgr
} from '@xq/component'

import debugMgr from './utils/debug.js'
import logMgr from '@xq/log'
import serverMgr from '@xq/server'

let isLogin = false

function debug(config) { //切换环境
  debugMgr.setDebug({
    envs: config.envs,
    onEnv(env) {
      isLogin = false
      config.onEnv(env)
      fetch.setBaseURL(env)
      serverMgr.auth.clear()
      user.autoLogin().then(res => {
        isLogin = true
      })
    },
    onLog() {
      config.onLog()
    }
  })
}

function init(config, Vue) { //初始化

  const updateManager = api.getUpdateManager()
  updateManager.onUpdateReady(function() {
    updateManager.applyUpdate()
  })

  initVue(Vue)

  fetch.setBaseURL(config.baseURL) // baseURL
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
  Vue.prototype.$log = logMgr
}

function initConfig() {
  server.init()
  componentMgr.init()

  user.autoLogin().then(res => {
    isLogin = true
  })

  api.handleSession(() => {
    if (isLogin) {
      return Promise.resolve()
    } else {
      return user.autoLogin()
    }
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
export const $log = logMgr
export default {
  init,
  debug
}
