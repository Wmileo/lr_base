function opt() {
  let port = $storage.port.get()
  let r = $env.mp == 'c' ? $storage.userId.get() : null
  let con = $env.mp == 'b' ? $storage.userId.get() : null
  let o = $channel().option
  if (o.con != null) {
    con = o.con
  }
  return $utils.object.clean({
    r,
    con
  })
}

function init(Vue) {
  Vue.mixin({
    onLoad() {
      let p = $this().page
      if (!$utils.env.isH5()) {
        uni.hideShareMenu()
      }
    },
    onShareAppMessage(obj) {
      return this._shareData
    },
    data() {
      return {
        _shareData: {}
      }
    },
    methods: {
      _canShare(data = {}) {
        let obj = {}
        obj.title = data.title
        if (data.path == null) {
          if ($utils.env.isH5()) {
            data.path = window.location.origin + window.location.pathname + window.location.hash
          } else {
            data.path = '/' + $this().page
          }
        }
        let h5 = $utils.env.isH5() ? {
          from: null,
          token: null,
          u: null
        } : {}
        let option = $channel().option
        option.from = $env.mp
        let path = $utils.url.build(data.path, {
          ...option,
          ...opt(),
          ...data.param,
          ...h5
        })
        
        if ($utils.env.isH5()) {
          obj.imgUrl = data.image
          obj.link = path
          obj.desc = data.desc
          $wx.updateShareData($utils.object.clean(obj))
        } else {
          obj.imageUrl = data.image
          obj.path = path
          this._shareData = $utils.object.clean(obj)
          uni.showShareMenu()
        }
      },
      _unShare() {
        if (!$utils.env.isH5()) {
          uni.hideShareMenu()
        }
      }
    }
  })
}

function url(url, param) {
  return $utils.url.build(url, {
    ...opt(),
    ...param
  })
}

export default {
  init,
  url
}
