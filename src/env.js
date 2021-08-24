const isUni = typeof(uni) != 'undefined'
const system = isUni ? uni.getSystemInfoSync() || {} : {}
const safeBottom = (isUni && (system.model.indexOf('iPhone X') >= 0 || system.model.indexOf('iPhone 1') >= 0)) ? 34 : 0

let env = {
  isH5: process.env.VUE_APP_PLATFORM == 'h5',
  isUni,
  isH5InMp: window.__wxjs_environment === 'miniprogram',
  isQy: system.environment == 'wxwork',
  safeBottom,
  isAndroid: system.system.indexOf('Android') == 0
}

export default env
