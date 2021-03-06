import lr from '../index.js'

class Canvas {
  
  constructor(id) {
    this.id=id;
    this.ctx = uni.createCanvasContext(id)
  }
  
  async draw(infos, callback) {
    let ctx=this.ctx;
    for await(let item of infos){
      switch(item.type){
        case 'image':
         await this.drawImage(infos,item);
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
             await this.drawText(infos,{...item, text,y:item.y+item.fontHeight*i});
           }
         }else{
           //单行文本
           await this.drawText(infos,item);
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
  
  drawImage(infos,data) {
    const _this=this;
    return new Promise((resolve,reject)=>{
      if(!data.url){
        resolve();
      }
      if(data.imageType=="base64"){
        _this.imageToDraw(data.url,infos,data).then(()=>{
          resolve();
        });
      }else{
        uni.downloadFile({
          url: data.url,
          success(res) {
            if (res.statusCode == 200) {
               _this.imageToDraw(res.tempFilePath,infos,data).then(()=>{
                 resolve();
               });
            }
          },
          fail(err){
            console.log(err)
            reject(err)
          }
        });
      }
    });
  }
  
  imageToDraw(path,infos,data){
    const _this=this;
    let ctx = this.ctx;
    return new Promise((resolve,reject)=>{
       uni.getImageInfo({
         src: path,
         success: function(image) {
           let x = data.x || 0
           let y = data.y || 0
           let width = data.width || image.width
           let height = data.height || image.height
           
           //从下往上计算
           if(data.yb){
             y=infos[0].height-data.yb;
           }
           
           switch(data.drawType){
             case "drawImgFull": //图片宽度等于画布宽度
                let IMG_RATIO = image.width / image.height;
                ctx.drawImage(path, x, y, 750, 750 / IMG_RATIO)
                break;
             case "drawImgCycle": //圆形图片
                // 如果在绘制图片之后还有需要绘制别的元素，需启动 save() 、restore() 方法，否则 clip() 方法会导致之后元素都不可见
                ctx.save();
                let r=data.r;
                var d = 2 * r;
                var cx = x + r;
                var cy = y + r;
                ctx.arc(cx, cy, r, 0, 2 * Math.PI);
                ctx.stroke(); 
                ctx.clip();
                ctx.drawImage(path, x, y, d, d);
                ctx.restore();
                break;
             default:
                ctx.drawImage(path, x, y, width, height) 
                break;
           }
           resolve();
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
  
  drawText(infos,data) {
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
      let y = data.y ? data.y : data.yb ? infos[0].height-data.yb : data.yc ? (data.yc - height / 2) : 0
      
      //let fontWidth=ctx.measureText('哈').width;
      ctx.fillText(text, x, y, width * 3)
      resolve()
    });
  }
  
  image() {
    return new Promise((resolve, reject) => {
      uni.canvasToTempFilePath({
        canvasId: this.id,
        fileType: 'jpg',
        // destWidth: 750,
        // destHeight: ,
        quality: 0.6,
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

lr.createCanvas = (id) => {
  return new Canvas(id)
}

