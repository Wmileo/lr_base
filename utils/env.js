
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

let env = {
  isH5,
  isUni,
  isH5InWx,
  isQy
}

function init(Vue) {
  Vue.prototype._env = env
}

$utils.env = env

export default {
  init
}
