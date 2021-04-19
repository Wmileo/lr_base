
function isH5() {
  return process.env.VUE_APP_PLATFORM == 'h5'
}

function isUni() {
  return typeof(uni) != 'undefined'
}

function isQy() {
  return uni.getSystemInfoSync().environment == 'wxwork'
}

function isH5InWx() {
  return window.__wxjs_environment === 'miniprogram'
}

if (!$utils) {
  $utils = {}
}

$utils.env = {
  isH5,
  isUni,
  isH5InWx,
  isQy
}

