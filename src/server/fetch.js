import server from '@xq/server'

let {
  get,
  post,
  upload,
  builders
} = server.apiBuilder

let apis = {
  config: {
    info: get('/v1/config/getByAppkey')
  },
  user: {
    login: post('/v1/user/wxLogin'),
    auth: post('/v1/user/getWxUserInfo'),
    phone: post('/v1/user/getWxUserPhone'),
    log: get('/v1/user/createLogLogin'),
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

