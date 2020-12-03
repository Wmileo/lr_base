function notification(name) {
  return {
    emit(data) {
      uni.$emit(name, data)
    },
    on(func) {
      uni.$on(name, func)
    },
    off(func) {
      uni.$off(name, func)
    },
    once(func) {
      uni.$once(name, func)
    }
  }
}

// 这里统一管理所有通知
let notify = [
  "onCity", // 选择城市更新通知
]

let obj = {}
notify.forEach(ntf => {
  obj[ntf] = notification(ntf)
})

export default obj





