
function article(item) {
  return $utils.url.build(pages.article, {
    id: item.id,
    artCode: item.code,
  })
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

uni.navigateToMiniProgram({
  appId: env.appId,
  path: '/pages/mine/prep/detail?id='+this.info.id+"&consultantId="+this.info.consultantId,
  extraData: {},
  envVersion:"develop",
  success(res) {},
});
