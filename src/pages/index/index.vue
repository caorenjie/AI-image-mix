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
        bgPicCode: '',
        embedPic: '',
        embedPicCode: '',
      }
    },
    mounted () {
      // console.log(wx);
      // wx.login({
      //   success: (res) => {
      //     console.log('login success');
      //     console.log(res);
      //     let code = res.code;
          
          
      //   }
      // })
      // wx.getUserInfo({
      //   lang: 'zh_CN',
      //   success: (res) => {
      //     console.log(res);
      //   }
      // })

      wx.request({
        url: 'https://ip.vbig.org/api/user/login',
        method: 'POST',
        data: {
          username: 'ip',
          password: '123',
        },
        success: (res) => {
          console.log('login success');
          console.log(res);

          wx.request({
            url: 'https://ip.vbig.org/api/user/logined',
            method: 'GET',
            success: (res) => {
              console.log('logined');
              console.log(res);
              
            }
          })
          
        }
      })
      
      // this.getList();
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
            this.bgPic = res.tempFilePaths[0];
            this.uploadImg(this.bgPic).then( (code) => {
              this.bgPicCode = code;
            })
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
            wx.previewImage({
              urls: [].concat(this.embedPic),

            })
            this.uploadImg(this.embedPic).then( (code) => {
              this.embedPicCode = code;
            })
          },
          fail () {

          }
        })
      },
      confirm () {
        console.log(this.bgPicCode);
        console.log(this.embedPicCode);
      },
      uploadImg (imgSrc) {
        return new Promise( (resolve) => {
          wx.uploadFile({
            url: 'https://ip.vbig.org/api/image/upload',
            filePath: imgSrc,
            name: 'image',
            success: (res) => {
              let code = res.data;
              resolve(code);
            }
          })
        })
      },
      login () {

      },
    },
  }
</script>


<style lang="less" scoped>

</style>
