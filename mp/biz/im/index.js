import TIM from 'tim-wx-sdk'
import TIMUploadPlugin from 'tim-upload-plugin'
import { decodeElement } from './decodeElement'

let SDKAppID = $xq.env.imAppId

let tim = TIM.create({
  SDKAppID
})
tim.setLogLevel(1)
tim.registerPlugin({
  'tim-upload-plugin': TIMUploadPlugin
})

let isReady = false

function onReady(event) {
  let userInfo = $storage.userInfo.get()
  if (userInfo) {
    tim.updateMyProfile({
      nick: userInfo.nick,
      avatar: userInfo.avatar
    })
  }
  isReady = (event.name === TIM.EVENT.SDK_READY)
}

function onNet(event) {
  let state = event.data.state
  switch (state) {
    case TIM.TYPES.NET_STATE_CONNECTED:
      $api.showToast('已接入网络')
    case TIM.TYPES.NET_STATE_CONNECTING:
      $api.showToast('当前网络不稳定')
    case TIM.TYPES.NET_STATE_DISCONNECTED:
      $api.showToast('当前网络不可用')
  }
}

function onError(event) {
  if (event.data.message && event.data.code && event.data.code !== 2800 && event.data.code !== 2999) {
    $api.showToast(event.data.message)
  }
}

function onMessage(event) {
  $log.log('im', 'message', event)
  let data = event.data
  $notification.imMsg.emit(data)
}

function onConversationList(event) {
  $log.log('im', 'list', event)
  let data = event.data
  $notification.imConvList.emit(data)
}

function onKickedOut(event) {
  setTimeout(() => {
    autoLogin()
  }, 30000)
}

function onMessageRevoked(event) {
  let data = event.data
  $notification.imMsgRevoked.emit(data)
}

function onMessageRead(event) {
  let data = event.data
  $notification.imMsgRead.emit(data)
}

function onProfileUpdate(event) {
  let data = event.data
  $notification.imProfileUpdate.emit(data)
}

tim.on(TIM.EVENT.SDK_READY, onReady)
tim.on(TIM.EVENT.SDK_NOT_READY, onReady)
tim.on(TIM.EVENT.NET_STATE_CHANGE, onNet)
tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessage)
tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, onConversationList)
tim.on(TIM.EVENT.ERROR, onError)
tim.on(TIM.EVENT.KICKED_OUT, onKickedOut)
tim.on(TIM.EVENT.MESSAGE_REVOKED, onMessageRevoked)
tim.on(TIM.EVENT.MESSAGE_READ_BY_PEER, onMessageRead)
tim.on(TIM.EVENT.PROFILE_UPDATED, onProfileUpdate)

let isLogin = false
let isLoging = false

function autoLogin() {
  if (isLogin) {
    return Promise.resolve()
  }
  return new Promise((resolve, reject) => {
    if (isLoging) {
      setTimeout(() => {
        autoLogin(resolve, reject)
      }, 40)
    } else {
      isLoging = true
      $fetch.im.usersig().fetch({
        flag: $xq.env.mp
      }).then(res => {
        tim.login({
          userID: res.data.imUserId,
          userSig: res.data.userSig
        }).then(res => {
          isLogin = true
          resolve()
        }).finally(() => {
          isLoging = false
        })
      })
    }
  })
  //#warn 更新头像
}

function ready() {
  if (isReady) {
    return Promise.resolve()
  }
  return new Promise((resolve, reject) => {
    autoLogin().then(() => {
      setTimeout(() => {
        ready().then(resolve, reject)
      }, 40)
    })
  })
}

function handleMsg(msg) {
  msg.virtualDom = decodeElement(msg)
  let date = new Date(msg.time * 1000)
  msg.newtime = $moment(date).format("YYYY年MM月DD日")
  return msg
}

function handleConvList(list) {
  return list.map(item => {
    if (item.lastMessage && (typeof item.lastMessage.lastTime === 'number')) {
      let date = new Date(item.lastMessage.lastTime * 1000)
      item.lastMessage._lastTime = $moment(date).format("YYYY年MM月DD日")
      return item
    }
  })
}

export default {
  ...tim,
  ready,
  handleMsg,
  handleConvList
}
