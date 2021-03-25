function mp(key, path) {
  let tmp = path.split('?')
  let scene = tmp[1].replace(new RegExp(`\\&`, 'g'), ',')
  let page = tmp[0].substr(1)
  return $fetch.qrcode.mpqrcode().fetch({
    key,
    scene,
    page,
    width: 430,
    autoColor: false,
    lineColor: "{\"r\":255,\"g\":165,\"b\":0}",
    isHyaline: false
  }).then(res => {
    return res.data
  })
}

function cmp(path) {
  return mp("c", path)
}

function bmp(path) {
  return mp("b", path)
}


export default {
  cmp,
  bmp
}
