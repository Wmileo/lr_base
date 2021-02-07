function currentPage() {
  let l = getCurrentPages().length
  return getCurrentPages()[l - 1].route
}

let onShowFuncs = []
let onHideFuncs = []

function handleOnShow() {
  $log.info('stats', 'onShow', currentPage())
  onShowFuncs.forEach(func => {
    func()
  })
}

function handleOnHide() {
  $log.info('stats', 'onHide', currentPage())
  onHideFuncs.forEach(func => {
    func()
  })
}

if (process.env.VUE_APP_PLATFORM == 'h5') {
  window.onpageshow = (event) => {
    handleOnShow()
  }
  window.onpagehide = (event) => {
    handleOnHide()
  }
} else {
  let oc = Component
  Component = function(c) {
    if (c.methods) {
      let methods = c.methods
      let os = methods.onShow
      methods.onShow = function(s) {
        handleOnShow()
        if (os) {
          os.call(this, methods)
        }
      }
      methods.onHide = function(s) {
        handleOnHide()
        if (os) {
          os.call(this, methods)
        }
      }
    }
    oc(c)
  }
}

if (!$utils) {
  $utils = {}
}

$utils.page = {
  onShow: {
    inject(func){
      onShowFuncs.push(func)
    }
  },
  onHide: {
    inject(func){
      onHideFuncs.push(func)
    }
  }
}
