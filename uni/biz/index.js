import share from './share/index.js'
import auth from './auth.js'
import config from './config.js'
import file from './file.js'
import qrcode from './qrcode.js'

if (!$xq) {
  $xq = {}
}

$xq.auth = auth
$xq.config = config
$xq.file = file
$xq.share = share
$xq.qrcode = qrcode