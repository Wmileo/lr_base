import shareMgr from './share.js'
import visitMgr from './visit.js'

function init(Vue) {
  shareMgr.init(Vue)
  visitMgr.init(Vue)
}

export default {
  init,
  url: shareMgr.url
}
