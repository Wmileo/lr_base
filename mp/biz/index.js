import auth from './auth.js'
import config from './config.js'
import file from './file.js'

if (!$xq) {
  $xq = {}
}

$xq.auth = auth
$xq.config = config
$xq.file = file
