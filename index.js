import storage from './src/storage.js'
import notify from './src/notify.js'
import memory from './src/memory.js'
import env from './src/env.js'
import url from './src/url.js'

let dt = {
  storage,
  notify,
  memory,
  env,
  url
}

dt._mixin = (Vue) => {
  notify._mixin(Vue)
}

export default dt