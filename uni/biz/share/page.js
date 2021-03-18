
function article(item) {
  return $utils.url.build(pages.article, {
    id: item.id,
    artCode: item.code,
  })
}

function estate(item) {
  return $utils.url.build($xq.page.estate(item), opt())
}
function layout(item) {
  return $utils.url.build($xq.page.layout(item), opt())
}

function article(item) {
  let o = opt()
  if (item.consultantId) {
    o.con = item.consultantId
  }
  return $utils.url.build($xq.page.article(item), o)
}
function invite(item) {
  let o = opt()
  if ($storage.port.get() == 'c') {
    o.con = -1
  }
  return $utils.url.build($xq.page.invite(item), o)
}