let visits = []

function currentPage() {
  let l = getCurrentPages().length
  return getCurrentPages()[l - 1].route
}

function logData(ext) {
  let t = 1
  let opt = $channel().option
  if (process.env.VUE_APP_PLATFORM == 'h5' && opt.from != 'mp') {
    t = 0
  }
  let p = currentPage()
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
  $fetch.log.visit().fetch(data).finally(() => { // 触发心跳
    heartbeat()
  })
}

function visit(data) {
  let ld = logData(data)
  visits.push(ld)
  log(ld)
}

function heartbeat() {
  setTimeout(() => {
    if (visits.length > 0) {
      log({ c: 0 })
    }
  }, 180000)
}

function leave() {
  log({ c: -1 })
}

function init() {
  $utils.page.onShow.inject(() => {
    handlePageShow()
  })
  $utils.page.onHide.inject((forever) => {
    handlePageHide(true)
  })
}

function handlePage() {
  let num = visits.length
  if (num > 0) {
    let last = visits[num - 1]
    let p = currentPage()
    if (last.p == p) {
      return last
    }
  }
  return null
}

function handlePageShow() {
  let page = handlePage()
  if (page != null) {
    log(last)
  }
}

function handlePageHide(forever) {
  if (forever) {
    visits.pop()
  }
  if (handlePage() != null) {
    leave()
  }
}

function estate(item) {
  visit({e: item.id})
}
function layout(item) {
  visit({e: item.estateId})
}
function consultant(item) {
  visit({e: item.estateId})
}
function article(item) {
  visit({e: item.estateId, con: item.consultantId})
}

export default {
  init,
  estate,
  layout,
  consultant,
  article
}
