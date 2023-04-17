import storage from './base/storage.js'
import notify from './base/notify.js'
import memory from './base/memory.js'
import env from './base/env.js'
import url from './base/url.js'

let lr = {
  storage,
  notify, // 即将废弃
  memory,
  env,
  url
}

export default lr