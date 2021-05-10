import server from '@xq/server'

let {
  get,
  post,
  upload
} = server.apiBuilder

let apis = {
  im:{
    usersig: get('v1/instant/message/getUserSig'),
    relation: post('v1/instant/message/getRelationByImId')
  },
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

