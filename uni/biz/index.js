import visit from './visit.js'
import share from './share.js'
import page from './page.js'

if (!$xq) {
  $xq = {}
}

$xq.page = page
$xq.share = share
$xq.visit = visit
