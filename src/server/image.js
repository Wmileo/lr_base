import imageMgr from '@xq/image'
import configMgr from '../biz/config.js'

function setImageUrlKey(key) {
  configMgr.getDetail('xq_image_baseurl').then(res => {
  	imageMgr.setBaseUrl(res[key])
  })
}

function setImages(images) {
  imageMgr.setImages(images)
}

export default {
	setImageUrlKey,
  setImages
}
