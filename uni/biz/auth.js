import server from '@xq/server'

function login(authorizationCode) {
  let opt = $utils.object.clean($channel().option, ['r', 'c', 'con'])
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
    return res
  })
}

export default {
  login,
}
