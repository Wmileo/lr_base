import imageMgr from '../../base/utils/image.js'

$notification.imageUrl.on(url => {
  imageMgr.setBaseUrl(url)
})