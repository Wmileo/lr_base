import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

import '@xq/log'
import '@xq/server'

import './utils/notification.js'
import './utils/storage.js'
import image from './utils/image.js'
import './utils/url.js'
import './utils/object.js'
import './utils/env.js'

$moment = moment

function init(Vue) {
  image.init(Vue)
}

export default {
  init
}