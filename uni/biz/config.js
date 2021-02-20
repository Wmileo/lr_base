
let configs = {}

function getDetail(appKey) {
  let value = configs[appKey]
  if (value) {
    return Promise.resolve(value)
  } else {
    return $fetch.config.info().fetch({ appKey }).then(res => {
      configs[appKey] = res.data.appValue
      return res.data.appValue
    })
  }
}

export default {
  getDetail
}
