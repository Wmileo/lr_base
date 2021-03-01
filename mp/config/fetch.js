import server from '@xq/server'

let {
  get,
  post,
  upload
} = server.apiBuilder

let apis = {
  auth: {
    info: post('/v1/user/getWxUserInfo'),
    phone: post('/v1/user/getWxUserPhone'),
  },
  feedback:{
    save: post('/v1/feedback/save'),
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

