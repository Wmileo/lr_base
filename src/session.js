
function get(name) {
  let str = window.sessionStorage.getItem(name)
  let data = (str && str.indexOf('{') == 0) ? JSON.parse(str).v : null
  return data
}

function set(name, data) {
  let str = JSON.stringify({v:data})
  window.sessionStorage.setItem(name, str)
}

function remove(name) {
  window.sessionStorage.removeItem(name)
}

function clear() {
  window.sessionStorage.clear()
}

export default {
  get,
  set,
  remove,
  clear
}