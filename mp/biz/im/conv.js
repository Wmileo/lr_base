import TIM from 'tim-wx-sdk'
import imMgr from './index.js';


class ImConv {
  constructor(id, onList, onRelation) {
    if (id.indexOf('C2C') == 0) {
      this.to = id.substring(3)
      this.id = id
    } else {
      this.to = id
      this.id = `C2C${id}`
    }
    this.relation = {}
    this.info = {}
    this.list = []
    this.isLoading = false
    this.isCompleted = false
    this.nextReqMsgId = ''
    
    this.lastMinute = 0
    this.lastShowMinute = 0
    
    this.onList = onList
    this.onRelation = onRelation
  }
  
  start() {
    this.loadMsg()
    this.read()
    $notification.imMsg.on((list) => {
      this.onMsg(list)
    })
    imMgr.relation([this.to]).then(data => {
      this.relation = data[this.to]
      this.onRelation(this.relation)
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
          this.list = [...this.handleMsgList(res.data.messageList), ...this.list]
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
      this.list = [...this.list, ...this.handleMsgList(list)]
      this.emit()
    }
    this.read()
  }
  
  sendMsg(type, info) {
    let msg = imMgr[`create${type}Message`]({
      to: this.to,
      conversationType: TIM.TYPES.CONV_C2C,
      payload: info
    })
    this.list = [...this.list, ...this.handleMsgList([msg])]
    
    this.emit()
    imMgr.sendMessage(msg)
  }
  
  emit(){
    this.onList(this.list, this.isCompleted)
  }
  
  read() {
    imMgr.read(this.id)
  }
  
  handleMsgList(list) {
    let newList = []
    list.forEach(item => {
      let msg = imMgr.handleMsg(item)
      let lastMinute = msg.time / 60
      if (lastMinute - this.lastMinute > 1 || lastMinute - this.lastShowMinute > 5) {
        newList.push({
          text: msg.newtime,
          type: 'TIMTimeElem',
        })
        this.lastShowMinute = lastMinute
      }
      this.lastMinute = lastMinute
      newList.push(msg)
    })
    return newList
  }
}

export default ImConv
