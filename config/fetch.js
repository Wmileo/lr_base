import '@dt/server/dt'
import server from '@dt/server'

let {
  get,
  post,
  upload
} = server.apiBuilder

let apis = {
  qrcode: {
    image: post('/app/images/generateCodeImage'),
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

