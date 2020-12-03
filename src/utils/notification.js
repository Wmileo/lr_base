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

let obj = {}
function setNotifications(notifications) {
  notifications.forEach(ntf => {
    obj[ntf] = notification(ntf)
  })
}

export default {
  setNotifications
}

export let notifications = obj