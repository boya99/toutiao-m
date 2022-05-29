<template>
  <div class="update-photo">
    <img :src="img" alt="" srcset="" class="img" ref="img" />
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
// 头像裁剪
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import { updateUserPhoto } from '@/api/user'
export default {
  name: 'userPhoto',
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
      cropper: null,
    }
  },
  methods: {
    onConfirm () {
      // console.log(this.cropper.getData());// 基于服务端裁剪，getData() 获取裁切参数
      //纯客户端裁剪 获取文件对象
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        this.updateUserPhoto(blob)
      })
    },
    async updateUserPhoto (blob) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,//禁止背景点击
        duration: 0,//持续展示
      })

      try {
        //错误使用方法

        //如果接口使用Content-Type 是 applicatioin/json 则传JavaScript 普通对象

        // updateUserPhoto({
        //   photo: blob
        // })

        //如果接口使用Content-Type 是 multipart/form-data
        //则你必须传递FormData对象
        const formData = new FormData();

        formData.append('photo', blob);
        const { data } = await updateUserPhoto(formData)
        console.log(data);
        //关闭弹层
        this.$emit('close')
        //更新视图
        this.$emit('updatePhoto', data.data.photo)
        //提示成功
        this.$toast.success('更新成功')
      } catch (error) {
        this.$toast.fail('操作失败，请重试')
      }

    }
  },
  // 渲染绑定dom 时期
  mounted () {
    const image = this.$refs.img;
    const cropper = new Cropper(image, {
      // aspectRatio: 16 / 9,
      // crop (event) {
      //   console.log(event.detail.x);
      //   console.log(event.detail.y);
      //   console.log(event.detail.width);
      //   console.log(event.detail.height);
      //   console.log(event.detail.rotate);
      //   console.log(event.detail.scaleX);
      //   console.log(event.detail.scaleY);
      // },

      viewMode: 1,//查看模式只能在画布中
      dragMode: 'move',//拖动模式
      aspectRatio: 1,
      autoCropArea: 0.9,//自动截取
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true


    });
    console.log(cropper);
    this.cropper = cropper
  }
}
</script>

<style scoped lang="less">
.update-photo {
  background-color: #000;
  height: 100%;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
.img {
  display: block;
  max-width: 100%;
}
</style>