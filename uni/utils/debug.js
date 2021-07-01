function setDebug() {
  shake()
}

let lx = 0
let ly = 0
let lz = 0
let time = 0

function shake() {
  uni.onAccelerometerChange(function (res) {
    let subx = Math.abs(lx - res.x)
    let suby = Math.abs(ly - res.y)
    let subz = Math.abs(lz - res.z)
    if (subx > 1 || suby > 1 || subz > 1) {
      time++
    }
    lx = res.x
    ly = res.y
    lz = res.z
    if (time > 2) {
      time = 0
      if ($this().page != 'pages_common/log/index') {
        $api.navigateTo('/pages_common/log/index')
      }
    }
  })
  uni.startAccelerometer()
}

export default {
  setDebug,
}
