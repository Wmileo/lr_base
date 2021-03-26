function mp(key, path) {
  let tmp = path.split('?')
  let scene = "channel=qrcode"
  if (tmp[1] && tmp[1].length > 0) {
    scene += ',' + tmp[1].replace(new RegExp(`\\&`, 'g'), ',')
  }
  let page = tmp[0]
  if (page.indexOf('/') == 0) {
    page = page.substr(1)
  }
  console.log(scene)
  return $fetch.qrcode.mpqrcode().fetch({
    key,
    scene,
    page,
    // width: 430,
    // autoColor: false,
    // lineColor: "{\"r\":255,\"g\":165,\"b\":0}",
    // isHyaline: false
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
