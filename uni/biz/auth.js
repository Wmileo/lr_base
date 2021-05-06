import server from '@xq/server'
import shareMgr from './share/channel.js'

function login(authorizationCode) {
  let opt = {}
  let c = shareMgr.getChannel($channel().launch.path)
  if (c > 0) {
    opt.c = c
  }
  Object.assign(opt, $utils.object.clean($channel().launch.option, ['r', 'con', 'c', 'cid', 'cmid']))
  let type = $storage.port.get()
  return $fetch.auth.login().fetch({
    authorizationCode,
    type,
    ...opt
  }).then(res => {
    server.auth.setInfo({
      Authorization: res.data.token
    })
    $storage.token.set(res.data.token)
    $storage.userId.set(res.data.id)
    $notification.userId.emit(res.data.id)
    return res
  })
}

export default {
  login
}
