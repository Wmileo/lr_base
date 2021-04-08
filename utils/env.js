
function isH5() {
  return process.env.VUE_APP_PLATFORM == 'h5'
}

function isUni() {
  return typeof(uni) != 'undefined'
}

if (!$utils) {
  $utils = {}
}

$utils.env = {
  isH5,
  isUni
}

