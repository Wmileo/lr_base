import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

import '@dt/server'

import './notification.js'
import './log.js'
import './storage.js'
import './url.js'
import './object.js'

import env from './env.js'
import image from './image.js'
import unit from './unit.js'

$moment = moment

function init(Vue) {
  env.init(Vue)
  image.init(Vue)
  unit.init(Vue)
}

export default {
  init
}