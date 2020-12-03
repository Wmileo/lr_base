// channel
import { channel } from './channel.js'

import notification from './notification.js'
import storage from './storage.js'

// moment
import moment from 'moment'

// api
import api from '@xq/api'

import config from './config.js'

function init(Vue) {
  Vue.prototype.$api = api
  Vue.prototype.$moment = moment
  Vue.prototype.$channel = channel
  Vue.prototype.$notification = notification
  Vue.prototype.$storage = storage

  config.init()
}

export const $notification = notification
export const $storage = storage
export const $api = api

export default {
  init
}
