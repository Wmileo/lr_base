
function build(url, obj) {
  if (obj) {
    url += url.includes("?") ? "&" : "?"
    for (let key in obj) {
      url += key + "=" + encodeURIComponent(obj[key]) + "&"
    }
    url = url.substr(0, url.length - 1)
  }
  return url
}

function option(url) {
  let str = url.split('?')[1]
  if (str) {
    str = str.split('#')[0]
    let strs = str.split('&')
    let info = {}
    for (let p in strs) {
      let arr = strs[p].split('=')
      info[arr[0]] = decodeURIComponent(arr[1])
    }
    return info
  } else {
    return {}
  }
}

$utils.url = {
  build,
  option,
}
