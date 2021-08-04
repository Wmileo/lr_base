
class Canvas {
  
  constructor(id) {
    this.id=id;
    this.ctx = uni.createCanvasContext(id)
  }
  
  async draw(infos,callback) {
    let ctx=this.ctx;
    for await(let item of infos){
      switch(item.type){
        case 'image':
         await this.drawImage(item);
         break;
        case 'rect':
         await this.drawRect(item);
         break;
        case 'text':
         //多行文本
         if(item.line && item.line>1){
           let font=ctx.setFontSize(item.fontSize)
           let size = ctx.measureText('哈');
           let num=item.width/size.width;
           let more = num > item.line;
           
           for(let i=0;i < Math.min(item.text.length/num, item.line);i++){
             let text = item.text.substring(num*i,num*(i+1));
             if (more && i==item.line-1) {
               text=text.substring(0,text.length-2)+"...";
             }
             await this.drawText({...item, text,y:item.y+item.fontHeight*i});
           } 
         }else{
           //单行文本
           await this.drawText(item);
         }
         break;
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
    let ctx = this.ctx;
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
        },
        fail(err){
          console.log(err)
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
      ctx.setFillStyle(data.fillStyle)
      ctx.setFontSize(data.fontSize)
      let size = ctx.measureText(text)
      let width = size.width
      if (data.maxWidth && width > data.maxWidth) {
        if (data.line == 1 && !data.hidden) { // 显示1行并且不隐藏 会根据最大宽度缩放
          while (width > data.maxWidth) {
            ctx.setFontSize(data.fontSize--)
            size = ctx.measureText(text)
            width = size.width
          }
        }
      }
      
      
      // x 最左边 xc 中间 xr 最右边
      // y 最上边 yc 中间 yb 最下边
      let height = size.height || data.fontSize * 1.37
      let x = data.x ? data.x : data.xr ? (data.xr - width) : data.xc ? (data.xc - width / 2) : 0
      let y = data.y ? data.y : data.yb ? (data.yb - height) : data.yc ? (data.yc - height / 2) : 0
       
      ctx.fillText(text, x, y, width)
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

export default {
  canvas :function (id) {
    return new Canvas(id)
  }
}
