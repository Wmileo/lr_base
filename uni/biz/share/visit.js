import shareMgr from './channel.js';

let visits = []

setInterval(() => {
  if (visits.length > 0) {
    log({ c: 0 })
  }
}, 15000)

function logData(ext) {
  let t = 1
  let opt = $channel().option
  if ($utils.env.isH5() && opt.from != 'mp') {
    t = 0
  }
  let p = $this().page
  let cid = opt.id
  let r = opt.r
  let con = opt.con
  let c = opt.c
  return $utils.object.clean({
    p, t, cid, r, con, c,
    ...ext
  })
}

function log(data) {
  $fetch.log.visit().fetch(data)
}

function visit(data) {
  data.c = shareMgr.getChannel($this().page)
  if (data.c > 0) {
    let ld = logData(data)
    visits.push(ld)
    log(ld)
  }
}

function leave() {
  if (!$utils.env.isH5()) {
    log({ c: -1 })
  }
}

function init(Vue) {
  Vue.mixin({
    onShow() {
      handlePageShow()
    },
    onHide() {
      handlePageHide()
    },
    onUnload() {
      handlePageHide(true)
    },
    methods: {
      _visit(e) {
        visit(e)
      }
    }
  })
}

function handlePage() {
  let num = visits.length
  if (num > 0) {
    let last = visits[num - 1]
    let p = $this().page
    if (last.p == p) {
      return last
    }
  }
  return null
}

function handlePageShow() {
  let page = handlePage()
  if (page != null) {
    log(page)
  }
}

function handlePageHide(forever) {
  if (handlePage() != null) {
    if (forever) {
      visits.pop()
    }
    leave()
  }
}

export default {
  init
}
