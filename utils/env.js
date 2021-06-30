let system = uni.getSystemInfoSync() || {}

function isH5() {
  return process.env.VUE_APP_PLATFORM == 'h5'
}

function isUni() {
  return typeof(uni) != 'undefined'
}

function isQy() {
  return system.environment == 'wxwork'
}

function isH5InWx() {
  return window.__wxjs_environment === 'miniprogram'
}

function safeBottom() {
  if (isUni()) {
    if (system.model.indexOf('iPhone X') >= 0 || system.model.indexOf('iPhone 1') >= 0) {
      return 34
    }
  }
  return 0
}

function isAndroid() {
  return system.environment.indexOf('Android') == 0
}

if (!$utils) {
  $utils = {}
}

let env = {
  isH5,
  isUni,
  isH5InWx,
  isQy,
  safeBottom,
  isAndroid
}

function init(Vue) {
  Vue.prototype._env = env
}

$utils.env = env

export default {
  init
}
