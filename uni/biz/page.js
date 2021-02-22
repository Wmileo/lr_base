let pages = {
  'estate': '/pages/estate/detail',
  'layout': '/pages/layout/detail',
  'consultant': '/pages/consultant/detail',
  'article': '/pages/article/detail',
  'invite': '',
  'prep': '/pages/mine/prep/index'
}

function init(urls) {
  for (let p in urls) {
    pages[p] = urls[p]
  }
}

function estate(item) {
  return $utils.url.build(pages.estate, {
    id: item.id,
    c: 1,
  })
}

function layout(item) {
  return $utils.url.build(pages.layout, {
    id: item.id,
    c: 2,
  })
}

function consultant(item) {
  return $utils.url.build(pages.consultant, {
    id: item.id,
    c: 3,
  })
}

function article(item) {
  return $utils.url.build(pages.article, {
    id: item.id,
    artCode: item.code,
    c: 4,
  })
}

function invite(item) {
  return $utils.url.build(pages.invite, {
    id: item.id,
  })
}

export default {
  init,
  estate,
  layout,
  consultant,
  article,
  invite
}
