import server from '@xq/server'

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
  user: {
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

function setBaseURL(url) {
  extras.url = url
}

export const fetchs = list

export default {
  setBaseURL
}

