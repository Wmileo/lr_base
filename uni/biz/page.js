let pages = {
  'estate': '/pages/estate/detail',
  'layout': '/pages/layout/detail',
  'consultant': '/pages/consultant/detail',
  'article': '/pages/article/detail',
}

function init(urls) {
  for (let p in urls) {
    pages[p] = urls[p]
  }
}

function estate(item) {
  return $utils.url.build(pages.estate, {id: item.id})
}
function layout(item) {
  return $utils.url.build(pages.layout, {id: item.id})
}
function consultant(item) {
  return $utils.url.build(pages.consultant, {id: item.id})
}
function article(item) {
  return $utils.url.build(pages.article, {id: item.id, artCode: item.code})
}

export default {
  init,
  estate,
  layout,
  consultant,
  article
}
