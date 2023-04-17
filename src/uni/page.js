import lr from '../index.js'

/**
 * 解析url参数
 */
function handleOption(opt) {
  let result = {}
  if (opt.q) {
    result = lr.url.option(decodeURIComponent(opt.q))
  } else if (opt.scene) { // 微信扫码
    result = lr.url.option(decodeURIComponent(opt.scene))
  }
  if (Object.keys(result).length == 0) {
    for (let key in opt) {
      result[key] = decodeURIComponent(opt[key])
    }
  }
  return result
}

function getCurrent() {
  return new Promise((resolve, reject) => {
    let pages = getCurrentPages()
    let l = pages.length
    if (l > 0) {
      let page = pages[l - 1]
      let vm = page.$vm
      if (vm) {
        vm.pagePath = vm.__route__ || vm.route
        vm.option = handleOption(vm.$mp.query)
        resolve(vm)
        return
      }
    }
    reject(new Error('未获取到page'))
  })
}

lr.launch = {
  getOption: () => {
    return handleOption(uni.getEnterOptionsSync().query)
  },
  getPath: () => {
    return uni.getEnterOptionsSync().path
  }
}

lr.page = {
  handleOption,
  getCurrent,
}