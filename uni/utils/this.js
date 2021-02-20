function currentPage() {
  let l = getCurrentPages().length
  return getCurrentPages()[l - 1]
}

$this = ()=>{
  let p = currentPage()
  return p ? p.$vm : null
}
