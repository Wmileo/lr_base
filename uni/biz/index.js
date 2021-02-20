import visit from './visit.js'
import share from './share.js'
import page from './page.js'
import auth from './auth.js'
import config from './config.js'
import file from './file.js'

if (!$xq) {
  $xq = {}
}

$xq.auth = auth
$xq.config = config
$xq.file = file
$xq.page = page
$xq.share = share
$xq.visit = visit
