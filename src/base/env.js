const isUni = typeof uni != 'undefined'
const isWindow = typeof window != 'undefined'

let env = {
  isUni,
  isWindow,
  isH5: true
}

if (isUni) {
  const system = uni.getSystemInfoSync()
  const safeBottom =
    system.model.indexOf('iPhone X') >= 0 ||
    system.model.indexOf('iPhone 1') >= 0
      ? 34
      : 0
  env.isH5 = process.env.VUE_APP_PLATFORM == 'h5'
  env.isQy = system.environment == 'wxwork'
  env.safeBottom = safeBottom
  env.isAndroid = system.system.indexOf('Android') == 0
}

if (env.isH5 && isWindow) {
  env.isH5InMp = window.__wxjs_environment === 'miniprogram'
}

export default env
