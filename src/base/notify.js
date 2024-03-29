import env from './env.js';
let ons = {}
let onces = {}

function remove(obj, name, func) {
  if (obj[name]) {
    let i = obj[name].indexOf(func);
    if (i > -1) { 
      obj[name].splice(i, 1); 
    }
  }
}

function on(name, func, target) {
  func.target = target
  if (env.isUni) {
    uni.$on(name, func)
  } else {
    if (!ons[name]) {
      ons[name] = []
    }
    if (ons[name].indexOf(func) < 0) {
      ons[name].push(func)
    }
  }
}

// 移除监听
function off(name, func) {
  if (env.isUni) {
    uni.$off(name, func)
  } else {
    remove(ons, name, func)
    remove(onces, name, func)
  }
}

// 接收一次
function once(name, func, target) {
  func.target = target
  if (env.isUni) {
    uni.$once(name, func)
  } else {
    if (!onces[name]) {
      onces[name] = []
    }
    if (onces[name].indexOf(func) < 0) {
      onces[name].push(func)
    }
  }
}

// 发出通知
function emit(name, data) {
  if (env.isUni) {
    uni.$emit(name, data)
  } else {
    if (ons[name]) {
      ons[name].forEach(func => {
        if (func.target) {
          func.call(func.target, data)
        } else {
          func(data)
        }
      })
    }
    if (onces[name]) {
      onces[name].forEach(func => {
        if (func.target) {
          func.call(func.target, data)
        } else {
          func(data)
        }
      })
      onces[name] = []
    }
  }
}

export default {
  emit,
  on,
  off,
  once
}
