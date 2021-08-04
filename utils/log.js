let list = []
let onList = (list) => {}

function print(type, mark, msg, data) {
  console[type](`dt-${mark}：${msg}`)
  let datas = null
  if (data) {
    datas = []
    if (data.constructor === Object) {
      for (let key in data) {
        console[type](`dt-${mark}：${key}`, data[key])
        datas.push(`${key} :${str(data[key])}`)
      }
    } else if (data.constructor === Array) {
      data.forEach(item => {
        console[type](`dt-${mark}：`, item)
        datas.push(str(item))
      })
    } else {
      console[type](`dt-${mark}：`, data)
      datas.push(data)
    }
    console[type](`dt-${mark}：----------------`)
  }
  let time = $moment().format('YYYY-MM-DD hh:mm:ss');
  list.unshift({
    type,
    msg,
    datas,
    mark,
    time
  })
  onList(list)
}

function str(item) {
  if (typeof(item) == 'object') {
    return JSON.stringify(item, null, 4)
  } else {
    return item
  }
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

function handleList(func) {
  onList = func
  onList(list)
}

function clearList() {
  list = []
  onList(list)
}

$log = {
  log,
  warn,
  info,
  error
}

export default {
  handleList,
  clearList
}
