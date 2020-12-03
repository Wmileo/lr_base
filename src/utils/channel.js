/**
 * 设置url参数
 */
function url(url, obj) {
  if (Object.keys(obj).length > 0) {
    url += url.includes("?") ? "&" : "?"
  }
  for (let key in obj) {
    url += key + "=" + encodeURIComponent(obj[key]) + "&"
  }
  return url
}

/**
 * 解析url参数
 */
function params(options) {
  let result = {}
  
  //#ifdef MP-WEIXIN
  for (let key in options) {
    result[key] = decodeURIComponent(options[key])
  }
  //#endif

  //#ifdef APP-PLUS
  result = options
  //#endif

  return result
}

export function channel() {
  let cn = this.getOpenerEventChannel()
  return {
    get(key, data) {
      if (cn.listener[key]) {
        return cn.listener[key][0].fn(data)
      }
      console.error('channel : 无效key')
      return null
    },
    emit(key, data) {
      cn.emit(key, data)
    },
    url, // 构建url
    params // 解析参数
  }
}

