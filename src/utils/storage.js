
function storage(name) {
  return {
    get() {
      return uni.getStorageSync(name)
    },
    set(data) {
      uni.setStorageSync(name, data)
    }
  }
}

// 这里统一管理所有存储数据
let keys = [
  "userInfo", // 用户信息
]

let obj = {}
keys.forEach(srg => {
  obj[srg] = storage(srg)
})

export default obj

