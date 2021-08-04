import server from '@dt/server'

let {
  get,
  post,
  upload
} = server.apiBuilder

let apis = {
  log: {
    visit: get('/v1/log/visit/append'),
    event: post('/v1/log/user/visit/append')
  },
  config: {
    info: get('/v1/config/getByAppkey', true, false)
  },
  auth: {
    login: post('/v1/user/wxLogin', false, false)
  },
  file: {
    upload: upload('/upload')
  },
  qrcode: {
    mpqrcode: post('/v1/mpqrcode/get')
  }
}

function setBaseURL(url) {
  server.setFetchs(apis, {
    url,
    server: 'dt'
  })
}

$notification.env.on(url => {
  setBaseURL(url)
})

