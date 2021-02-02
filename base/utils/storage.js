
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

$storage = {}
function setStorages(storages) {
  storages.forEach(srg => {
    $storage[srg] = storage(srg)
  })
}

export default {
  setStorages
}