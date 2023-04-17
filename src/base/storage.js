import env from './env.js'
let tmp = {}

function get(name) {
  if (env.isUni) {
    return uni.getStorageSync(name)
  } else if (env.isWindow) {
    let str = window.localStorage.getItem(name)
    let data = str && str.indexOf('{') == 0 ? JSON.parse(str).v : null
    return data
  } else {
    return tmp[name]
  }
}

function set(name, data) {
  if (env.isUni) {
    uni.setStorageSync(name, data)
  } else if (env.isWindow) {
    let str = JSON.stringify({ v: data })
    window.localStorage.setItem(name, str)
  } else {
    tmp[name] = data
  }
}

function remove(name) {
  if (env.isUni) {
    uni.removeStorageSync(name)
  } else if (env.isWindow) {
    window.localStorage.removeItem(name)
  } else {
    tmp[name] = null
  }
}

function clear() {
  if (env.isUni) {
    uni.clearStorageSync()
  } else if (env.isWindow) {
    window.localStorage.clear()
  } else {
    tmp = {}
  }
}

export default {
  get,
  set,
  remove,
  clear
}
