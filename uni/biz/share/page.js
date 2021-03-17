
function article(item) {
  return $utils.url.build(pages.article, {
    id: item.id,
    artCode: item.code,
  })
}


function estate(item) {
  visit({e: item.id})
}

function consultant(item) {
  visit({e: item.estateId})
}
function article(item) {
  visit({e: item.estateId})
}

function estate(item) {
  return $utils.url.build($xq.page.estate(item), opt())
}

function consultant(item) {
  return $utils.url.build($xq.page.consultant(item), opt())
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
    o.con = null
  }
  return $utils.url.build($xq.page.invite(item), o)
}
