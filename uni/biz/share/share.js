
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
      let o = {
        title: this._shareTitle,
        path: $utils.url.build(this._sharePath, {
          ...$channel().option,
          ...opt(),
          ...this._shareParam
        }),
        imageUrl: this._shareImage
      }
      return $utils.object.clean(o)
    },
    data() {
      return {
        _shareTitle: null,
        _shareImage: null,
        _sharePath: '/' + $this().page,
        _shareParam: {}
      }
    },
    methods: {
      _canShare(data) {
        this._shareTitle = data.title
        this._shareImage = data.image
        this._sharePath = data.path
        this._shareParam = data.param
        if (!$utils.env.isH5()) {
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
    ...$channel().option,
    ...opt(),
    ...param
  })
}

export default {
  init,
  url
}
