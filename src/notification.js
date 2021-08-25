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

function on(name, func) {
  if (env.isUni) {
    uni.$on(name, func)
  } else {
    if (!ons[name]) {
      ons[name] = []
    }
    ons[name].push(func)
  }
}

function off(name, func) {
  if (env.isUni) {
    uni.$off(name, func)
  } else {
    remove(ons, name, func)
    remove(onces, name, func)
  }
}

function once(name, func) {
  if (env.isUni) {
    uni.$once(name, func)
  } else {
    if (!onces[name]) {
      onces[name] = []
    }
    onces[name].push(func)
  }
}

function emit(name, data) {
  if (env.isUni) {
    uni.$emit(name, data)
  } else {
    if (ons[name]) {
      ons[name].forEach(func => {
        func(data)
      })
    }
    if (onces[name]) {
      onces[name].forEach(func => {
        func(data)
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
