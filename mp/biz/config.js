import { fetchs } from '@xq/server'

let Fetchs = fetchs.config

let configs = {}

function getDetail(appKey) {
  let value = configs[appKey]
  if (value) {
    return Promise.resolve(value)
  } else {
    return Fetchs.info().fetch({ appKey }).then(res => {
      configs[appKey] = res.data.appValue
      return res.data
    })
  }
}

export default {
  getDetail
}
