let url = 'https://h5.xiquehaofang.com/qr/'

function image(page, info) {
  return $fetch.qrcode.image().fetch({
    code: $utils.url.build(url + page, {
      ...info,
      from: 'qrcode'
    })
  })
}

export default {
  image,
}