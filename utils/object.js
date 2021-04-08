
function clean(obj, keys) {
  let o = {}
  let ks = keys || Object.keys(obj)
  for (let k of ks) {
    let v = obj[k]
    if (v != null) {
      o[k] = v
    }
  }
  return o
}

if (!$utils) {
  $utils = {}
}

$utils.object = {
  clean,
}