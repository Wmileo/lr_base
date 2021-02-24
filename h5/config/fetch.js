import server from '@xq/server'

let {
  get,
  post,
  upload
} = server.apiBuilder

let apis = {
  wx: {
    sign: get('/v1/wechat/appConfigSign')
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
