function image(str) {
  return $fetch.qrcode.image().fetch({
    code: str
  })
}

Object.assign($xq.auth, {
  image
})
