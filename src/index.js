import fetch from './server/fetch.js'
import image from './server/image.js'

import user from './biz/user.js'
export const userMgr = user

import file from './biz/file.js'
export const fileMgr = file

import config from './biz/config.js'
export const configMgr = config

import notification from './utils/notification.js'
import storage from './utils/storage.js'

function init(config, Vue) {
  fetch.setBaseURL(config.baseURL)  // baseURL
  image.setImageUrlKey(config.imageUrlKey) // imageUrlKey
  image.setImages(config.images) // images
  
  user.setLoginType(config.loginType) // loginType
  
  notification.setNotifications(config.notifications) // notifications
  storage.setStorages(config.storages) // storages
  
  initVue(Vue)
  initConfig()
}

export default {
  init
}

// moment
import moment from 'moment'
export const $moment = moment

// api
import api from '@xq/api'
export const $api = api

// channel
import { channel } from './utils/channel.js'

import { notifications } from './utils/notification.js'
export let $notification = notifications

import { storages } from './utils/storage.js'
export let $storage = storages

function initVue(Vue) {
  Vue.prototype.$api = api
  Vue.prototype.$channel = channel
  Vue.prototype.$notification = notifications
  Vue.prototype.$storage = storages
}

import server from './server/index.js'
import componentMgr from '@xq/component'
import { btnMgr } from '@xq/component'
function initConfig() {
  server.init()
  componentMgr.init()
  
  api.handleRecheckSession((success, fail) => {
    user.autoLogin().then(() => {
      success()
    }).catch(() => {
      fail()
    })
  })
  
  let handleUserInfo = false
  btnMgr.bindingUserInfo(auth => {
    if (!handleUserInfo) {
      user.auth(auth).then(res => {
        handleUserInfo = true
      })
    }
  })
  let handlePhoneNumber = false
  btnMgr.bingdingPhoneNumber(auth => {
    if (!handlePhoneNumber) {
      user.authPhone(auth).then(() => {
        handlePhoneNumber = true
      })
    }
  })
}

