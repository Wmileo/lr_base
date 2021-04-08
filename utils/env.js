
function isH5() {
  return process.env.VUE_APP_PLATFORM == 'h5'
}

if (!$utils) {
  $utils = {}
}

$utils.env = {
  isH5
}

