
function build(url, obj) {
  if (obj) {
    url += url.includes("?") ? "&" : "?"
    for (let key in obj) {
      if (obj[key] != null) {
        url += key + "=" + encodeURIComponent(obj[key]) + "&"
      }
    }
    url = url.substr(0, url.length - 1)
  }
  $log.info('base-utils-url', url)
  return url
}

function option(url) {
  let str = url
  if (url.indexOf('?') >= 0) {
    str = url.split('?')[1]
  }
  str = str.split('#')[0]
  let sub = '&'
  if (str.indexOf(sub) < 0) {
    sub = ','
  }
  let strs = str.split(sub)
  let info = {}
  for (let p in strs) {
    let arr = strs[p].split('=')
    info[arr[0]] = decodeURIComponent(arr[1])
  }
  return info
}

if (!$utils) {
  $utils = {}
}

$utils.url = {
  build,
  option,
}
