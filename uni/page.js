import dt from '../index.js'

/**
 * 解析url参数
 */
function params(opt) {
  if (opt.q) {
    return dt.url.option(decodeURIComponent(opt.q))
  } else if (opt.scene) {
    return dt.url.option(decodeURIComponent(opt.scene))
  }
  let result = {}
  for (let key in opt) {
    result[key] = decodeURIComponent(opt[key])
  }
  return result
}

function getPage() {
  return new Promise((resolve, reject) => {
    let pages = getCurrentPages()
    let l = pages.length
    if (l > 0) {
      let page = pages[l - 1]
      let vm = page.$vm
      if (vm) {
        vm.pagePath = vm.__route__ || vm.route
        vm.option = params(vm.$mp.query)
        resolve(vm)
        return
      }
    }
    reject(new Error('未获取到page'))
  })
}

function getLaunchInfo() {
  let launch = {}
  if (dt.env.isH5) {
    launch.path = window.location.pathname
    launch.option = dt.url.option(window.location.hash)
    launch.auth = dt.url.option(window.location.href)
  } else {
    let opt = wx.getLaunchOptionsSync() || {}
    launch.path = opt.path
    launch.option = params(opt.query)
  }
  return launch
}

dt.getPage = getPage
dt.launch = getLaunchInfo()