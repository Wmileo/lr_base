import { fetchs } from 'server/fetch.js'

let Fetchs = fetchs.config

function getDetail(appKey) {
  return Fetchs.info().fetch({ appKey }).then(res => {
    return res.data
  })
}

export default {
  getDetail
}
