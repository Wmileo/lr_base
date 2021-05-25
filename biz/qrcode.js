let url = 'https://h5.xiquehaofang.com/qr/'

let key = 'k_qrcode_mps'
let mps = $storage._get(key) || {}
if (typeof(mps) != 'object') {
  mps = {}
}

function mp(page, info, force) {//force强制生成新二维码
  let code = $utils.url.build(url + page, {
    ...info,
    from: 'qrcode'
  })
  if (mps[code] && !force) {
    return Promise.resolve(mps[code])
  } else {
    return $fetch.qrcode.image().fetch({
      code
    }).then(res => {
      mps[code] = res.data
      $storage._set(key, mps)
      return res.data
    })
  }
}

export default {
  mp,
}