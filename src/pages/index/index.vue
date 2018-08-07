<template>
  <div>
    <image src="../../assets/bg.jpeg"></image>
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
            this.bgImg = res.tempFilePaths;
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
            this.embedPic = res.tempFilePaths;
          },
          fail () {

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
              console.log('code');
              console.log(code);
            }
          }

        })
      },
      getBase64Image(imgSrc) {
        let canvas = document.createElement("canvas");
        let img = new Image();
        img.src = imgSrc;
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;

          let ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, img.width, img.height);

          let dataURL = canvas.toDataURL("image/png");
          return dataURL
        }
        

      }
    },
  }
</script>


<style lang="less" scoped>

</style>
