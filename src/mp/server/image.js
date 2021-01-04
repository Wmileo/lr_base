import imageMgr from '@xq/image'
import configMgr from '../biz/config.js'

function setImageUrlKey(key) {
  configMgr.getDetail('xq_image_baseurl').then(res => {
  	setBaseUrl(res[key])
  })
}

function setBaseUrl(url) {
  imageMgr.setBaseUrl(url)
}

function setImages(images) {
  imageMgr.setImages(images)
}

export default {
	setImageUrlKey,
  setBaseUrl,
  setImages
}
