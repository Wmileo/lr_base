function opt() {
  let port = $storage.port.get()
  let s = port == 'q' || port == 'b' ? 'b' : 'c'
  let r = s == 'c' ? $storage.userId.get() : null
  let con = s == 'b' ? $storage.userId.get() : null
  let o = $channel().option
  if (o.con != null) {
    con = o.con
  }
  return {
    r,
    con
  }
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
      _canShare(data) {
        let obj = {}
        obj.title = data.title
        if (data.path == null) {
          if ($utils.env.isH5()) {
            data.path = window.location.origin + window.location.pathname
          } else {
            data.path = '/' + $this().page
          }
        }
        let h5 = $utils.env.isH5() ? {
          code: null,
          state: null,
          from: null,
          token: null,
          u: null
        } : {}
        let path = $utils.url.build(data.path, {
          ...$channel().option,
          ...opt(),
          ...data.param,
          ...h5
        })
        
        if ($utils.env.isH5()) {
          obj.imgUrl = data.image
          obj.link = path
          obj.desc = data.desc
          $xq.wx.updateShareData($utils.object.clean(obj))
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
