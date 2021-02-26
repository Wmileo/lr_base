
/**
 * 解析url参数
 */
function params(options) {
  let result = {}
  for (let key in options) {
    result[key] = decodeURIComponent(options[key])
  }
  return result
}

$channel = () => {
  let _this = $this()
  let cn = _this ? _this.getOpenerEventChannel() : null

  let opt = {}
  if (process.env.VUE_APP_PLATFORM == 'h5') {
    opt = $utils.url.option(window.location.href)
  } else if (_this != null) {
    opt = _this.$mp.query
  } else if (typeof(wx) != 'undefined') {
    opt = wx.getLaunchOptionsSync().query
  }
  if (opt.q) {
    opt = $utils.url.option(opt.q)
  } else if (opt.scene) {
    opt = $utils.url.option(decodeURIComponent(opt.scene))
  }
  return {
    get(key, data) {
      if (cn && cn.listener[key]) {
        return cn.listener[key][0].fn(data)
      }
      $log.error('base-uni-utils', 'channel : 无效key 或 当前环境不支持')
      return null
    },
    emit(key, data) {
      if (cn) {
        cn.emit(key, data)
      }
    },
    option: params(opt)
  }
}
