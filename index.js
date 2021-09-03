import storage from './src/storage.js'
import session from './src/session.js'
import notify from './src/notify.js'
import env from './src/env.js'

let dt = {
  storage,
  notify,
  env
}

if (!env.isUni) {
  dt.session = session
}

dt.__mixin = (Vue) => {
  notify.__mixin(Vue)
}

export default dt