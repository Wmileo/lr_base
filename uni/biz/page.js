let visits = []

function currentPage() {
  let l = getCurrentPages().length
  return getCurrentPages()[l - 1].route
}

let ext = {
  t : process.env.VUE_APP_PLATFORM == 'h5' ? 0 : 1
}

let pages = {
  'estate': { c: 1 },
  'layout': { c: 2 },
  'consultant': { c: 3 },
  'article':  { c: 4 },
}

function init(urls) {
  $utils.page.onShow.inject(() => {
    handlePage()
  })
  $utils.page.onHide.inject(() => {
    handlePage(true)
  })
  
  $notification.shareRid.on(id => {
    ext.r = id
  })
  $notification.shareConid.on(id => {
    ext.con = id
  })
  $notification.userId.on(id => {
    ext.u = id
  })
  
  for (let p in urls) {
    pages[p].url = urls[p]
  }
  
}

function handlePage(hide = false) {
  let p = currentPage()
  let arr = p.splice('/')
  let c = pages[arr[1]].c
  if (c > 0 && arr[2] == 'detail') { // pages/xxx/detail
    if (hide) {
      leave()
    } else {
      visit({ p, c })
    }
  }
}

function visit(data) {
  visits.push(data.c)
  log(data)
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

function log(data) {
  let opt = $this().$channel().option
  data.cid = opt.id
  data.e = opt.e || opt.id
  Object.assign(opt, data)
  $fetch.log.visit().fetch({
    ...opt,
  }).finally(() => { // 触发心跳
    heartbeat()
  })
}

for (let m in pages) {
  pages[m].url = `/pages/${m}/detail`
  Object.assign(pages[m], {
    params(item) {
      let obj = { id: item.id }
      if (item.estateId) {
        obj.e = item.estateId
      }
      if (m == 'article') {
        obj.artCode = article.code
      }
      return obj
    },
    route(item) {
      return $utils.url.build(pages[m].url, pages[m].params(item))
    },
    share(item) {
      let opt = $this().$channel().option
      Object.assign(opt, pages[m].params(item))
      Object.assign(opt, ext)
      return $utils.url.build(pages[m].url, opt)
    }
  })
}

console.log(pages)

export default {
  init,
  ...pages
}
