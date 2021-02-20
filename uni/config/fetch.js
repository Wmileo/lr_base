import server from '@xq/server'

let {
  get,
  post,
  upload
} = server.apiBuilder

let apis = {
  log: {
    visit: get('/v1/log/visit/append')
  },
  config: {
    info: get('/v1/config/getByAppkey')
  },
  auth: {
    login: post('/v1/user/wxLogin'),
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

