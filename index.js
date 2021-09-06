import storage from './src/storage.js'
import session from './src/session.js'
import notify from './src/notify.js'
import memory from './src/memory.js'
import env from './src/env.js'

let dt = {
  storage,
  notify,
  memory,
  env
}

if (!env.isUni) {
  dt.session = session
}

dt._mixin = (Vue) => {
  notify._mixin(Vue)
}

export default dt