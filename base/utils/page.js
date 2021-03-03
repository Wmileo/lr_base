function currentPage() {
  let l = getCurrentPages().length
  return getCurrentPages()[l - 1].route
}

let onShowFuncs = []
let onHideFuncs = []

function handleOnShow() {
  $log.info('base-page', `onShow ${currentPage()}`)
  onShowFuncs.forEach(func => {
    func()
  })
}

function handleOnHide(forever = false) {
  $log.info('base-page', `onHide ${currentPage()}`)
  onHideFuncs.forEach(func => {
    func(forever)
  })
}

if (process.env.VUE_APP_PLATFORM == 'h5') {
  document.onvisibilitychange = () => {
    if (document.visibilityState == "visible") {
      handleOnShow()
    }
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
      let oh = methods.onHide
      methods.onHide = function(h) {
        handleOnHide()
        if (oh) {
          oh.call(this, methods)
        }
      }
      let ou = methods.onUnload
      methods.onUnload = function(u) {
        handleOnHide(true)
        if (ou) {
          ou.call(this, methods)
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

