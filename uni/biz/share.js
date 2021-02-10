let shareData = {}

function init(urls) {
  $notification.shareRid.on(id => {
    shareData.r = id
  })
  $notification.shareConid.on(id => {
    shareData.con = id
  })
}

function estate(item) {
  return $utils.url.build($xq.page.estate(item), shareData)
}
function layout(item) {
  return $utils.url.build($xq.page.layout(item), shareData)
}
function consultant(item) {
  return $utils.url.build($xq.page.consultant(item), shareData)
}
function article(item) {
  return $utils.url.build($xq.page.article(item), shareData)
}

export default {
  init,
}
