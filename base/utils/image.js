
function maker(url) {
  if (!url || url.length == 0) {
    console.warn('xq-image: url不能为空')
    return null
  }
  if (url.indexOf('/') < 0) {
    let key = url
    url = imagePath(key)
    if (!url) {
      console.warn('xq-image: 无效key - '+ key)
      return null
    }
  }
  if (url.indexOf('https://') < 0 && url.indexOf('http://') < 0) {
    url = baseUrl + url
  }
  return {
    style(name) {
      return url + '?x-oss-process=style/' + name
    },
    width(width) {
      return url + `?x-oss-process=image/resize,w_${width},m_lfit`
    },
    size(width, height) {
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

$image = maker

export default {
  setBaseUrl,
  setImages
}
