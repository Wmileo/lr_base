
function storage(name) {
  return {
    get() {
      return uni.getStorageSync(name)
    },
    set(data) {
      uni.setStorageSync(name, data)
    },
    remove() {
      uni.removeStorageSync(name)
    }
  }
}

let obj = {}
function setStorages(storages) {
  storages.forEach(srg => {
    obj[srg] = storage(srg)
  })
}

export default {
  setStorages
}

export let storages = obj