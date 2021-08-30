import env from './env.js';

function storage(local = true) {
  return local ? window.localStorage : window.sessionStorage
}

function get(name, local = true) {
  if (env.isUni) {
    return uni.getStorageSync(name)
  } else {
    let str = storage(local).getItem(name)
    let data = (str && str.indexOf('{') == 0) ? JSON.parse(str).v : null
    return data
  }
}

function set(name, data, local = true) {
  if (env.isUni) {
    uni.setStorageSync(name, data)
  } else {
    let str = JSON.stringify({v:data})
    storage(local).setItem(name, str)
  }
}

function remove(name, local = true) {
  if (env.isUni) {
    uni.removeStorageSync(name)
  } else {
    storage(local).removeItem(name)
  }
}

function clear(local = true) {
  if (env.isUni) {
    uni.clearStorageSync()
  } else {
    storage(local).clear()
  }
}

export default {
  get,
  set,
  remove,
  clear
}