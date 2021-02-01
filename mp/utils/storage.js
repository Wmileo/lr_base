
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

<<<<<<< HEAD:src/utils/storage.js
$storage = {}
function setStorages(storages) {
  storages.forEach(srg => {
    $storage[srg] = storage(srg)
=======
let obj = {}
function setStorages(storages) {
  storages.forEach(srg => {
    obj[srg] = storage(srg)
>>>>>>> 19db7b92a608ca3790bbbc675cb16625cb63a75d:mp/utils/storage.js
  })
}

export default {
  setStorages
}

export let storages = obj