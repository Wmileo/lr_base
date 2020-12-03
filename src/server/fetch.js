import server from '@xq/server'
import config from './env.js'
import code from './code.js'

let {
  get,
  post,
  upload,
  builders
} = server.apiBuilder

let apis = {
  config: {
    info: get('/app/config/info/[appKey]')
  },
  wx: {
    login: post('/customer/wxLogin'),
    auth: post('/customer/getWxUserInfo'),
    phone: post('/customer/getWxUserPhone')
  },
  file: {
    upload: upload('/upload')
  }
}

let list = {}
let extras = {
  url: '',
  server: 'app'
}
for (let mk in apis) {
  const m = apis[mk]
  list[mk] = builders(m, extras)
}

function init(baseURL) {
  extras.url = baseURL
}

export const fetchs = list
export const fetchCode = code
