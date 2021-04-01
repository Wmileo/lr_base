
function maker(url) {
  if (!url || url.length == 0) {
    $log.warn('xq-image', 'url不能为空')
    url = '/'
  }
  if (url.indexOf('/') < 0) {
    let key = url
    url = imagePath(key)
    if (!url) {
      $log.warn('xq-image', '无效key - '+ key)
      url = ''
    }
  }
  if (url.indexOf('https://') < 0 && url.indexOf('http://') < 0) {
    url = baseUrl + url
  }
  return {
    style(name) {
      if (url.indexOf('?x-oss-process') >= 0) {
        return url
      }
      return url + '?x-oss-process=style/' + name
    },
    width(width) {
      if (url.indexOf('?x-oss-process') >= 0) {
        return url
      }
      return url + `?x-oss-process=image/resize,w_${width},m_lfit`
    },
    size(width, height) {
      if (url.indexOf('?x-oss-process') >= 0) {
        return url
      }
      return url + `?x-oss-process=image/resize,h_${height},w_${width},m_fill,limit_0`
    },
    url() {
      return url
    }
  }
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
