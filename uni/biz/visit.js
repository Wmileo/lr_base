let visits = []

function currentPage() {
  let l = getCurrentPages().length
  return getCurrentPages()[l - 1].route
}

let u = ''

function logData(ext) {
  let t = 1
  let opt = $this().$channel().option
  if (process.env.VUE_APP_PLATFORM == 'h5' && opt.from != 'mp') {
    t = 0
  }
  let p = currentPage()
  let cid = opt.id
  let r = opt.r
  let con = opt.con
  return {
    p,t,cid,r,con,
    ...ext
  }
}

function log(data) {
  data.u = u
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
  visits.pop()
  log({ c: -1 })
}

function init() {
  $utils.page.onShow.inject(() => {
    handlePage()
  })
  $utils.page.onHide.inject(() => {
    handlePage(true)
  })

  $notification.userId.on(id => {
    u = id
  })
}

function handlePage(hide = false) {
  let num = visits.length
  if (num > 0) {
    let last = visits[num - 1]
    let p = currentPage()
    if (last.p == p) {
      if (hide) {
        leave()
      } else {
        log(last)
      }
    }
  }
}

function estate(item) {
  visit({e: item.id, c: 1})
}
function layout(item) {
  visit({e: item.estateId, c: 2})
}
function consultant(item) {
  visit({e: item.estateId, c: 3})
}
function article(item) {
  visit({e: item.estateId, con: item.consultantId, c: 4})
}

export default {
  init,
  estate,
  layout,
  consultant,
  article
}
