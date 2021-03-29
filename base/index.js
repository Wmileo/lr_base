import moment from 'moment'

import '@xq/log'
import '@xq/api'
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