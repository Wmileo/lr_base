let channels = {
  'estate/detail': 1,
  'layout/detail': 2,
  'consultant/detail': 3,
  'article/detail': 4,
  'activity/detail': 6
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