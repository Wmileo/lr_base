import server from '@xq/server'

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
    info: get('/v1/config/getByAppkey')
  },
  auth: {
    login: post('/v1/user/wxLogin')
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
    server: 'app'
  })
  server.auth.passList.push($fetch.auth.login().path)
  server.config.passList.push($fetch.auth.login().path)
  server.config.passList.push($fetch.config.info().path)
}

$notification.env.on(url => {
  setBaseURL(url)
})

