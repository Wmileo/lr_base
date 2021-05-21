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

function safeBottom() {
  if (isUni()) {
    let systemInfo = uni.getSystemInfoSync()
    if (systemInfo.model.indexOf('iPhone X') >= 0 || systemInfo.model.indexOf('iPhone 1') >= 0) {
      return 34
    }
  }
  return 0
}

if (!$utils) {
  $utils = {}
}

let env = {
  isH5,
  isUni,
  isH5InWx,
  isQy,
  safeBottom
}

function init(Vue) {
  Vue.prototype._env = env
}

$utils.env = env

export default {
  init
}
