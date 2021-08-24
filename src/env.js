let system = isUni() ? uni.getSystemInfoSync() || {} : {}

function isH5() {
  return process.env.VUE_APP_PLATFORM == 'h5'
}

function isUni() {
  return typeof(uni) != 'undefined'
}

function isQy() {
  return system.environment == 'wxwork'
}

function isH5InMp() {
  return window.__wxjs_environment === 'miniprogram'
}

function safeBottom() {
  return (isUni() 
          && (system.model.indexOf('iPhone X') >= 0 
              || system.model.indexOf('iPhone 1') >= 0))
          ? 34 : 0
}

function isAndroid() {
  return system.system.indexOf('Android') == 0
}

let env = {
  isH5,
  isUni,
  isH5InMp,
  isQy,
  safeBottom,
  isAndroid
}

export default env
