import imageMgr from '@xq/image'

function setImageUrlKey(key) {
  $xq.config.getDetail('xq_image_baseurl').then(res => {
    imageMgr.setBaseUrl(res[key])
  })
}

$notification.imageUrl.on(url => {
  imageMgr.setBaseUrl(url)
})

$notification.imageKey.on(key => {
  setImageUrlKey(key)
})
