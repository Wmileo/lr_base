let memory = {}

function get(name) {
  return memory[name]
}

function set(name, data) {
  memory[name] = data
}

function remove(name) {
  memory[name] = null
}

function clear() {
  memory = {}
}

export default {
  get,
  set,
  remove,
  clear
}