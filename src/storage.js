import env from './env.js';

function get(name) {
  if (env.isUni) {
    return uni.getStorageSync(name)
  } else {
    let str = window.localStorage.getItem(name)
    let data = (str && str.indexOf('{') == 0) ? JSON.parse(str).v : null
    return data
  }
}

function set(name, data) {
  if (env.isUni) {
    uni.setStorageSync(name, data)
  } else {
    let str = JSON.stringify({v:data})
    window.localStorage.setItem(name, str)
  }
}

function remove(name) {
  if (env.isUni) {
    uni.removeStorageSync(name)
  } else {
    window.localStorage.removeItem(name)
  }
}

function clear() {
  if (env.isUni) {
    uni.clearStorageSync()
  } else {
    window.localStorage.clear()
  }
}

export default {
  get,
  set,
  remove,
  clear
}