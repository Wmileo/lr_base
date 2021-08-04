import configMgr from '@dt/base/uni/biz/config'

function focus() {
  configMgr.getDetail('dt_gzh').then(res => {
    if ($utils.env.isH5()) {
      window.location.href=res.url
    } else {
      // $env.h5URL+'pages/gzh/index'
      $api.navigateTo('/pages_common/web/index',{"url":res.url})
    }
  })
}

export default {
  focus
}
