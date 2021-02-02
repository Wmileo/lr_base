import {channel} from './utils/channel.js'

function init(Vue) {
  Vue.prototype.$channel = channel
}

export default {
  init
}
