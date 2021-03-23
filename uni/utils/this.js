
function currentPage() {
  let l = getCurrentPages().length
  if (l > 0) {
    return getCurrentPages()[l - 1]
  }
  return null
}

$this = ()=>{
  let p = currentPage()
  if (p && p.$vm) {
    let _this = p.$vm
    _this.page = _this.__route__ || _this.route
    return _this
  }
  return {}
}
