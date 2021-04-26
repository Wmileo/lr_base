import TIM from 'tim-wx-sdk'
import imMgr from './im.js';

function handleMsgList(list) {
  return list.map(item => {
    return imMgr.handleMsg(item)
  })
}

class ImConv {
  constructor(id, onList) {
    if (id.indexOf('C2C') == 0) {
      this.to = id.substring(3)
      this.id = id
    } else {
      this.to = id
      this.id = `C2C${id}`
    }
    console.log(this.to, this.id)
    this.info = {}
    this.list = []
    this.isLoading = false
    this.isCompleted = false
    this.nextReqMsgId = ''
    
    this.onList = onList
  }
  
  start() {
    this.loadMsg()
    this.read()
    $notification.imMsg.on((list) => {
      this.onMsg(list)
    })
  }
  
  finish() {
    $notification.imMsg.off()
  }
  
  loadMsg() {
    if (!this.isCompleted) {
      if (!this.isLoading) {
        this.isLoading = true
        imMgr.getMessageList({
          conversationID: this.id,
          nextReqMessageID: this.nextReqMsgId,
          count: 15
        }).then(res => {
          this.nextReqMsgId = res.data.nextReqMessageID
          this.list = [...handleMsgList(res.data.messageList), ...this.list]
          this.isCompleted = res.data.isCompleted
        }).catch(err => {
          $api.showToast('拉取失败，请重试')
        }).finally(()=>{
          this.emit()
          this.isLoading = false
        })
      } else {
        $api.showToast('拉取中，请稍等')
      }
    } else {
      $api.showToast('没有更多消息啦')
    }
  }
  
  onMsg(list) {
    list = list.filter(item => item.conversationID == this.id)
    if (list.length > 0) {
      this.list = [...this.list, ...handleMsgList(list)]
      this.emit()
    }
  }
  
  sendMsg(type, info) {
    let msg = imMgr[`create${type}Message`]({
      to: this.to,
      conversationType: TIM.TYPES.CONV_C2C,
      payload: info
    })
    this.list.push(imMgr.handleMsg(msg))
    this.emit()
    imMgr.sendMessage(msg)
  }
  
  emit(){
    this.onList(this.list, this.isCompleted)
  }
  
  read() {
    imMgr.setMessageRead({conversationID: this.id})
  }
  
}

export default ImConv
