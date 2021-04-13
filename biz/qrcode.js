let url = 'https://h5.xiquehaofang.com/qr/'

function image(page, info) {
  return $fetch.qrcode.image().fetch({
    code: $utils.url.build(url + page, {
      ...info,
      from: qrcode
    })
  })
}

function estate(info) {
  return image('estate', info)
}

function activity(info) {
  return image('activity', info)
}

Object.assign($xq.auth, {
  estate,
  activity
})
