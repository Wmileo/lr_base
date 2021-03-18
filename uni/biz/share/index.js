import shareMgr from './share.js'
import visitMgr from './visit.js'

let channels = {
  'estate/detail': 1,
  'layout/detail': 2,
  'consultant/detail': 3,
  'article': 4
}

function getChannel(page) {
  for (let key in channels) {
    if (page.indexOf(key) >= 0) {
      return channels[key]
    }
  }
  return -1
}

function init(Vue) {
  shareMgr.init(Vue)
  visitMgr.init(Vue)
}

export default {
  getChannel,
  init,
  url: shareMgr.url
}
