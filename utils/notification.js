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

$notification = {}
function setNotifications(notifications) {
  notifications.forEach(ntf => {
    $notification[ntf] = notification(ntf)
  })
}

setNotifications([
  'env',
  'userId',
  'port'
])

export default {
  setNotifications
}
