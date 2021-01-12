import $api from '@xq/api'

let envs = []
let event = (env) => {}

function setDebug(list, func) {
  envs = list
  event = func
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
    if (subx > 1.2 || suby > 1.2 || subz > 1.2) {
      time++
    }
    lx = res.x
    ly = res.y
    lz = res.z
    if (time > 3) {
      time = 0
      $api.showActionSheet(envs).then(res => {
        let env = envs[res.tapIndex]
        console.log(env, res, res.tapIndex)
        event(env)
      }).catch(err => {
        console.log(err)
      })
    }
  })
  uni.startAccelerometer()
}

export default {
  setDebug,
}
