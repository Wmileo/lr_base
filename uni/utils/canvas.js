
class Canvas {
  
  constructor(id) {
    this.id=id;
    this.ctx = uni.createCanvasContext(id)
  }
  
  async draw(infos,callback) {
    for(let item of infos){
      if (item.type == 'image') {
        await this.drawImage(item);
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
  
  image(){
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
