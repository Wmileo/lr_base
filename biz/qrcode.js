let url = 'https://h5.xiquehaofang.com/qr/'

let key = 'key_mps'
let mps = $storage._get(key)

function mp(page, info, force) {//force强制生成新二维码
  let code = $utils.url.build(url + page, {
    ...info,
    from: 'qrcode'
  })
  if (mps.code && !force) {
    return Promise.resolve(mps.code)
  } else {
    return $fetch.qrcode.image().fetch({
      code
    }).then(res => {
      $storage._set(key, res.data)
      return res.data
    })
  }
}

export default {
  mp,
}