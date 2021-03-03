let visits = []

setInterval(() => {
  if (visits.length > 0) {
    log({ c: 0 })
  }
}, 15000)

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
  $fetch.log.visit().fetch(data)
}

function visit(data) {
  let ld = logData(data)
  visits.push(ld)
  log(ld)
}

function leave() {
  log({ c: -1 })
}

function init() {
  $utils.page.onShow.inject(() => {
    handlePageShow()
  })
  $utils.page.onHide.inject((forever) => {
    handlePageHide(forever)
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
