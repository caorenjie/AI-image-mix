<template>
  <div>
    <!-- <image src="../../assets/bg.jpeg"></image> -->
    <button type="primary" @click="uploadBgPic">上传背景图</button>
    <button type="primary" @click="uploadEmbedPic">上传嵌入图</button>
    <button @click="confirm">确定</button>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        bgPic: '',
        embedPic: '',
      }
    },
    mounted () {
      console.log(wx);
      this.getList();
    },
    methods: {
      uploadBgPic () {
        wx.chooseImage({
          count: 1,
          success: (res) => {
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
            console.log(res.tempFilePaths);
            this.bgImg = res.tempFilePaths[0];
          },
          fail () {

          }
        })
      },
      uploadEmbedPic () {
        wx.chooseImage({
          count: 1,
          success: (res) => {
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
            console.log(res.tempFilePaths);
            this.embedPic = res.tempFilePaths[0];
            this.getBase64Image(this.embedPic)
          },
          fail () {

          }
        })
      },
      getList () {
        wx.request({
          url: 'https://aips.vbig.org/api/taskes-waiting',
          header: {
            'x-token': {
              uid: '1'
            }
          },
          success: (res) => {
            console.log(res);
          }
        })
      },
      confirm () {
        wx.request({
          url: 'https://aips.vbig.org/api/task',
          method: 'GET',
          header: {
            'x-token': {
              uid: '12345',
            }
          },
          data: {
            taskType: 'FastStyle',
            styleImage: this.getBase64Image(this.bgPic),
            contentImage: this.getBase64Image(this.embedPic),
            quality: 80,
            vip: 100,
          },
          success: (res) => {
            if (res.data.success) {
              let code = res.data.queryCode;
              let delayTime = res.data.waiting;
              console.log('code');
              console.log(code);
              this.getResult(code, delayTime);
            }
          }

        })
      },
      getBase64Image(imgSrc) {
        wx.request({
          url: imgSrc,
          method:'GET',
          responseType: 'arraybuffer',
          success:(res) => {
            console.log(res);
            
            let base64 = wx.arrayBufferToBase64(res);
            base64　= 'data:image/jpeg;base64,' + base64;
            // $this.data.userImageBase64 = 'data:image/jpg;base64,' + base64;
            console.log(base64);
            
          }
        });
        // wx.getImageInfo({
        //   src: imgSrc,
        //   success: res => {
        //     console.log('load img success');
        //     console.log(res);
        //     console.log(imgSrc);
            
        //     let width = res.width;
        //     let height = res.height;
        //     let canvas = wx.createCanvasContext('canvas')

        //     canvas.drawImage(imgSrc, 0, 0, width, height) // 1. 绘制图片至canvas
        //     // 绘制完成后执行回调
        //     canvas.draw(false, () => {
        //       // 2. 获取图像数据
        //       console.log(12345);
              
        //       wx.canvasGetImageData({
        //         canvasId: 'canvas',
        //         x: 0,
        //         y: 0,
        //         width: width,
        //         height: height,
        //         success(res) {
        //           console.log('canvas success');
                  
        //           // 3. png编码
        //           let pngData = upng.encode([res.data.buffer], res.width, res.height)
        //           // 4. base64编码
        //           let base64 = wx.arrayBufferToBase64(pngData)
        //           console.log(base64)
        //           // ...
        //         }
        //       })
        //     })
        //   }
        // })

        

      },
      getResult (queryCode, delayTime) {
        setTimeout( () => {
          wx.request({
            url: `https://aips.vbig.org/api/task-result/${queryCode}`,
            method: 'GET',
            headers: {
              'x-token': {
                uid: '12345'
              }
            },
            success: (res) => {
              console.log('get success');
              console.log(res);
              
            }
          })
        }, delayTime * 1000)
      }
    },
  }
</script>


<style lang="less" scoped>

</style>
