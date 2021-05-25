
function get(name) {
  if ($utils.env.isUni()) {
    return uni.getStorageSync(name)
  } else {
    let str = window.localStorage.getItem(name)
    let data = (str && str.indexOf('{') == 0) ? JSON.parse(str).v : null
    return data
  }
}

function set(name, data) {
  if ($utils.env.isUni()) {
    uni.setStorageSync(name, data)
  } else {
    let str = JSON.stringify({v:data})
    window.localStorage.setItem(name, str)
  }
}

function remove(name) {
  if ($utils.env.isUni()) {
    uni.removeStorageSync(name)
  } else {
    window.localStorage.removeItem(name)
  }
}

function clear() {
  if ($utils.env.isUni()) {
    uni.clearStorageSync()
  } else {
    window.localStorage.clear()
  }
}

function storage(name) {
  return {
    get() {
      return get(name)
    },
    set(data) {
      set(name, data)
    },
    remove() {
      remove(name)
    }
  }
}

function setStorages(storages) {
  storages.forEach(srg => {
    $storage[srg] = storage(srg)
  })
}

$storage = {
  _set: set,
  _get: get,
  _remove: remove,
  _clear: clear,
  _pushItems: setStorages
}

export default {
  setStorages
}