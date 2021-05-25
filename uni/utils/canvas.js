
class Canvas {
  
  constructor(id) {
    this.id=id;
    this.ctx = uni.createCanvasContext(id)
  }
  
  async draw(infos,callback) {
    for(let item of infos){
      if (item.type == 'image') {
        await this.drawImage(item);
      } else if (item.type == 'rect') {
				await this.drawRect(item);
			} else if (item.type == 'text') {
				await this.drawText(item);
			}
    }
    
    return new Promise((resolve,reject)=>{
      this.ctx.draw(true, () => {
        return this.image().then((path)=>{
          resolve(path);
        });
      });
    });
  }
  
  drawImage(data) {
    let ctx = this.ctx
    return new Promise((resolve,reject)=>{
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
                resolve();
              }
            })
          }
        }
      });
    });
  }
	
	drawRect(data) {
		let ctx = this.ctx
		return new Promise((resolve,reject)=>{
			let x = data.x || 0
			let y = data.y || 0
			let width = data.width || 0
			let height = data.height || 0
		  ctx.setFillStyle(data.fillStyle)
		  ctx.fillRect(x, y, width, height)
			resolve()
		});
	}
	
	drawText(data) {
		let ctx = this.ctx
		return new Promise((resolve,reject)=>{
			let text = data.text || ''
			let x = data.x || 0
			let y = data.y || 0
			let maxWidth = data.maxWidth || 0
		  ctx.setFillStyle(data.fillStyle)
		  ctx.setFontSize(data.fontSize)
		  ctx.fillText(text, x, y, maxWidth)
			resolve()
		});
	}
  
  image() {
    return new Promise((resolve, reject) => {
      uni.canvasToTempFilePath({
        canvasId: this.id,
        fileType: 'png',
        success(res) {
          resolve(res.tempFilePath)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }

}

if (!$utils) {
  $utils = {}
}

$utils.canvas =function (id) {
  return new Canvas(id)
}
