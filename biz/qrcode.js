let url = 'https://h5.xiquehaofang.com/qr/'

function mp(page, info) {
  return $fetch.qrcode.image().fetch({
    code: $utils.url.build(url + page, {
      ...info,
      from: 'qrcode'
    })
  }).then(res => {
    return res.data
  })
}

export default {
  mp,
}