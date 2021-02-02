import server from '@xq/server'

let {
  get,
  post,
  upload
} = server.apiBuilder

let apis = {
  config: {
    info: get('/v1/config/getByAppkey')
  },
  auth: {
    login: post('/v1/user/wxLogin'),
    info: post('/v1/user/getWxUserInfo'),
    phone: post('/v1/user/getWxUserPhone'),
    log: get('/v1/user/createLogLogin'),
  },
  file: {
    upload: upload('/upload')
  }
}

function setBaseURL(url) {
  server.setFetchs(apis, {
    url,
    server: 'app'
  })
}

$notification.env.on(url => {
  setBaseURL(url)
})

