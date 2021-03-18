
/**
 * 解析url参数
 */
function params(opt) {
  if (opt.q) {
    return $utils.url.option(opt.q)
  } else if (opt.scene) {
    return $utils.url.option(decodeURIComponent(opt.scene))
  }
  let result = {}
  for (let key in opt) {
    result[key] = decodeURIComponent(opt[key])
  }
  return result
}

$channel = () => {
  let _this = $this()
  let cn = (_this && _this.getOpenerEventChannel) ? _this.getOpenerEventChannel() : null

  let option = {}
  let launch = {}
  
  if ($utils.env.isH5()) {
    option = $utils.url.option(window.location.href)
    launch.path = window.location.pathname
    launch.option = option
  } else if (!$utils.env.isH5()) {
    option = params(wx.getLaunchOptionsSync().query)
    launch.path = wx.getLaunchOptionsSync().path
    launch.option = option
  }
  
  if (_this && _this.$mp) {
    option = params(_this.$mp.query)
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
    option,
    launch
  }
}
