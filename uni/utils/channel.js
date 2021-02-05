
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

export function channel(_this = this) {
  let cn = _this.getOpenerEventChannel()
  let opt = _this.$mp.query
  return {
    get(key, data) {
      if (cn.listener[key]) {
        return cn.listener[key][0].fn(data)
      }
      $log.error('base-uni-utils', 'channel : 无效key')
      return null
    },
    emit(key, data) {
      cn.emit(key, data)
    },
    option: params(opt)
  }
}
