import TIM from 'tim-wx-sdk'
import TIMUploadPlugin from 'tim-upload-plugin'
import { decodeElement } from './decodeElement'

let SDKAppID = $env.imAppId

let tim = TIM.create({
  SDKAppID
})
tim.setLogLevel(1)
tim.registerPlugin({
  'tim-upload-plugin': TIMUploadPlugin
})

let isReady = false

function onReady(event) {
  isReady = (event.name === TIM.EVENT.SDK_READY)
  if (isReady) {
    updateProfile()
    $notification.auth.on(updateProfile)
  }
}

function updateProfile() {
  let userInfo = $storage.userInfo.get()
  if (userInfo) {
    tim.updateMyProfile({
      nick: userInfo.name || ($env.mp == 'b' ? '顾问' : '访客'),
      avatar: userInfo.avatar
    })
  }
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

let convList = []
let readCount = 0
function onConversationList(event) {
  $log.log('im', 'list', event)
  convList = event.data
	readCount = 0
  $notification.imConvList.emit(convList)
  handleUnread()
}

function handleUnread() {
	let num = 0
  for (let item of convList) {
		num += item.unreadCount
	}
	num -= readCount
  $notification.imUnreadNum.emit(num)
}

function read(conversationID){
  tim.setMessageRead({conversationID})
  let conv = convList.find(i => i.conversationID === conversationID)
  if (conv) {
    readCount = conv.unreadCount
  }
	handleUnread()
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
        autoLogin().then(resolve, reject)
      }, 40)
    } else {
      isLoging = true
      $fetch.im.usersig().fetch({
        flag: $env.mp
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
  let date = formatDate(new Date(msg.time * 1000), true)
	if (date.indexOf('/') >= 0) {
		msg.newtime = date.slice(5)
	} else {
		msg.newtime = date
	}
  return msg
}

function handleConvList(list, func) {
  let imids = []
  let newList = list.map(item => {
    if (item.lastMessage && (typeof item.lastMessage.lastTime === 'number')) {
      if (item.conversationID.indexOf('C2C') == 0) {
        imids.push(item.conversationID.substring(3))
      }
      let date = new Date(item.lastMessage.lastTime * 1000)
      item.lastMessage._lastTime = formatDate(date)
      return item
    }
  })
  func(newList)
  // newList = newList.map(item => {
  //   if (item.conversationID.indexOf('C2C') == 0) {
  //     let imid = item.conversationID.substring(3)
  //     item.ids = ___[imid]
  //   }
  //   return item
  // })
  // func(newList)
}

/**
 * 格式化消息时间
 */
function formatDate (date, isTime = false, withSecond = false) {
  if (date.toDateString() === new Date().toDateString()) {
		return getTime(date, withSecond)
	} else {
		return isTime ? `${getDate(date)} ${getTime(date, withSecond)}` : getDate(date)
	}
}

/**
 * 返回年/月/日
 */
function getDate (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}/${addZeroPrefix(month)}/${addZeroPrefix(day)}`
}

/**
 * 返回时分秒/时分
 */
export function getTime (date, withSecond = false) {
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return withSecond ? `${addZeroPrefix(hour)}:${addZeroPrefix(minute)}:${addZeroPrefix(second)}` : `${hour}:${addZeroPrefix(minute)}`
}

/**
 * 个位数，加0前缀
 */
function addZeroPrefix (number) {
  return number < 10 ? `0${number}` : number
}

export default {
  ...tim,
  ready,
  handleMsg,
  handleConvList,
	read,
	handleUnread
}
