let channels = {
  'estate/detail': 1,
  'layout/detail': 2,
  'consultant/detail': 3,
  'article/gzh': 4,
  'article/oms': 5,
  'activity/detail': 6,
  'room/detail': 8,
  'activity/618': 6
}

function getChannel(page) {
  for (let key in channels) {
    if (page.indexOf(key) >= 0) {
      return channels[key]
    }
  }
  return -1
}

export default {
  getChannel
}