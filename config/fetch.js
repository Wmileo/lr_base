import server from '@xq/server'

let {
  get,
  post,
  upload
} = server.apiBuilder

let apis = {
  qrcode: {
    image: get('/app/images/generateCodeImage'),
  }
}

function setBaseURL(url) {
  server.setFetchs(apis, {
    url
  })
}

$notification.env.on(url => {
  setBaseURL(url)
})

