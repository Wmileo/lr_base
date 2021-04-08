function scene(obj) {
  obj.way = 'mpc'
  let s = ''
  if (obj) {
    for (let key in obj) {
      if (obj[key] != null) {
        s += key + "=" + encodeURIComponent(obj[key]) + ","
      }
    }
    s = s.substr(0, s.length - 1)
  }
  return s
}

if (!$utils) {
  $utils = {}
}

$utils.qrcode = {
  scene
}