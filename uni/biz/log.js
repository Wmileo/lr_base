let visits = []

function currentPage() {
  let l = getCurrentPages().length
  return getCurrentPages()[l - 1].route
}

function visit(data, opt) {
  let ext = {}
  if (opt && opt.r) {
    ext.r = opt.r
  }
  if (opt && opt.con) {
    ext.con = opt.con
  }
  if (data.c != 0 && data.c != -1) {
    data.p = currentPage()
  }
  $fetch.log.visit().fetch({
    ...ext,
    ...data,
  }).finally(() => { // 触发心跳
    setTimeout(() => {
      if (visits.length > 0) {
        visit({
          c: 0,
        })
      }
    }, 180000)
  })
}

function visitEstate(estate, opt) {
  visits.push('estate')
  visit({
    c: 1,
    cid: estate.id,
    e: estate.id
  }, opt)
}

function visitLayout(layout, opt) {
  visits.push('layout')
  visit({
    c: 2,
    cid: layout.id,
    e: layout.estateId
  }, opt)
}

function visitConsultant(consultant, opt) {
  visits.push('consultant')
  visit({
    c: 3,
    cid: consultant.id,
    e: consultant.estateId
  }, opt)
}

function visitArticle(article, opt) {
  visits.push('article')
  visit({
    c: 4,
    cid: article.id,
    e: article.estateId
  }, opt)
}

function leave() {
  visits.pop()
  visit({
    c: -1
  })
}

export default {
  visitEstate,
  visitLayout,
  visitConsultant,
  visitArticle,
  leave
}
