let widths = [150, 250, 400, 550, 750]

function maker(url, width) {
  if (!url || url.length == 0) {
    $log.warn('xq-image', 'url不能为空')
    return null
  }
  if (url.indexOf('/') < 0) {
    let key = url
    url = imagePath(key)
    if (!url) {
      $log.warn('xq-image', '无效key - '+ key)
      return null
    }
  }
  if (url.indexOf('://') < 0) {
    url = baseUrl + url
  }
  if (url.indexOf('?x-oss-process') > 0 || url.indexOf('!') > 0 || (url.indexOf('.xqkxf.') < 0 && url.indexOf('.xique51.') < 0 && url.indexOf('.xiquehaofang.') < 0)) {
    return url
  }
  let style = '!full'
  if (width > 0) {
    widths.some(item => {
      style = `!${item}`
      return width <= item
    })
  }
  return url + style
}

let baseUrl = ''

function setBaseUrl(url) {
  if (url) {
    baseUrl = url
  }
}

let images = {}
function setImages(imgs) {
  images = Object.assign(images, imgs)
}

function imagePath(path) {
  return images[path]
}

function init(Vue) {
  Vue.prototype._image = maker
}

$image = maker

export default {
  setBaseUrl,
  setImages,
  init
}
