
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

$storages = {}
function setStorages(storages) {
  storages.forEach(srg => {
    $storages[srg] = storage(srg)
  })
}

export default {
  setStorages
}

