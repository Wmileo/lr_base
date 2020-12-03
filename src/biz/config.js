import { fetchs } from '../server/fetch.js'

let Fetchs = fetchs.config

let configs = {}

function getDetail(appKey) {
  let value = configs[appKey]
  if (value) {
    return Promise.resolve(value)
  } else {
    return Fetchs.info().fetch({ appKey }).then(res => {
      configs[appKey] = res.data
      return res.data
    })
  }
}

export default {
  getDetail
}
