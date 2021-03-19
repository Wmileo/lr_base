import imageMgr from '@xq/image'

$notification.imageUrl.on(url => {
  imageMgr.setBaseUrl(url)
})
