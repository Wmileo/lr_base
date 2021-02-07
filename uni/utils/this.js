function currentPage() {
  let l = getCurrentPages().length
  return getCurrentPages()[l - 1]
}

$this = ()=>{
  return currentPage().$vm
}

