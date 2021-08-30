import storage from './src/storage.js'
import session from './src/session.js'
import notification from './src/notification.js'
import env from './src/env.js'

let dt = {
  storage,
  notification,
  env
}

if (!env.isUni) {
  dt.session = session
}

export default dt