
function opt() {
  let port = $storage.port.get()
  let s = port == 'q' || port == 'b' ? 'b' : 'c'
  let r = s == 'c' ? $storage.userId.get() : null
  let con = s == 'b' ? $storage.userId.get() : null
  let o = $this().$channel().option
  if (o.con != null) {
    con = o.con
  }
  return { r, con }
}

function estate(item) {
  return $utils.url.build($xq.page.estate(item), {
    ...opt(),
    c: 1,
  })
}
function layout(item) {
  return $utils.url.build($xq.page.layout(item), {
    ...opt(),
    c: 2,
  })
}
function consultant(item) {
  return $utils.url.build($xq.page.consultant(item), {
    ...opt(),
    c: 3,
  })
}
function article(item) {
  return $utils.url.build($xq.page.article(item), {
    ...opt(),
    c: 4,
  })
}
function invite(item) {
  let o = {
    ...opt()
  }
  if ($storage.port.get() == 'c') {
    delete o.con
  }
  return $utils.url.build($xq.page.invite(item), o)
}

export default {
  estate,
  layout,
  consultant,
  article,
  invite
}
