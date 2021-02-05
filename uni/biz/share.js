let ext = {}

if (process.env.VUE_APP_PLATFORM == 'h5') {
  ext = $utils.url.option(window.location.href)
  ext.t = 0
} else {
  ext.t = 1
}

$notification.shareRid.on(id => {
  ext.r = id
})
$notification.shareConid.on(id => {
  ext.con = id
})

function link(url, opt) {
  Object.assign(opt, ext)
  return $utils.url.build(url, opt)
}

function articleLink(url, article) {
  return link(url, { id: article.id, artCode: article.code })
}

function estateLink(url, estate) {
  return link(url, { id: estate.id })
}

function layoutLink(url, layout) {
  return link(url, { id: layout.id })
}

function consultantLink(url, consultant) {
  return link(url, { id: consultant.id })
}

export default {
  articleLink,
  estateLink,
  layoutLink,
  consultantLink
}
