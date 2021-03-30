function draw(id, infos) {
  let ctx = uni.createCanvasContext(id)
  infos.forEach(item => {
    if (item.type == 'image') {
      drawImage(ctx, item)
    }
  })
}

function save(id) {
  return new Promise((resolve, reject) => {
    uni.canvasToTempFilePath({
      canvasId: id,
      fileType: 'jpg',
      success(res) {
        uni.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            resolve(res)
          }
        })
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

function drawImage(ctx, data) {
  uni.downloadFile({
    url: data.url,
    success(res) {
      if (res.statusCode == 200) {
        uni.getImageInfo({
          src: res.tempFilePath,
          success: function(image) {
            let x = data.x || 0
            let y = data.y || 0
            let width = data.width || image.width
            let height = data.height || image.height
            ctx.drawImage(res.tempFilePath, x, y, width, height)
            ctx.draw()
          }
        })
      }
    }
  })
}

if (!$utils) {
  $utils = {}
}

$utils.canvas = {
  draw,
  save
}
