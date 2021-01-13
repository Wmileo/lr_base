let list = []
let onList = (list) => {}

let color = {
  log: 'blue',
  info: 'green',
  warn: 'yellow',
  error: 'red'
}

function print(type, mark, msg, data) {
  console[type](`%c${mark}：`, 'color:${color[type]}', msg, data)
  list.push({type, msg, data, mark})
  onList(list)
}

function log(mark, msg, data) {
  print('log', mark, msg, data)
}

function warn(mark, msg, data) {
  print('warn', mark, msg, data)
}

function info(mark, msg, data) {
  print('info', mark, msg, data)
}

function error(mark, msg, data) {
  print('error', mark, msg, data)
}

function hanldList(func) {
  onList = func
}

export default {
  log,
  warn,
  info,
  error,
  hanldList
}
