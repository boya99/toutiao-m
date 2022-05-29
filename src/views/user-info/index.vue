<template>
  <div class="userInfo">
    <!-- 导航栏 -->
    <van-nav-bar
      title="个人信息"
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
    >
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 头像上传input   -->
    <input type="file" hidden ref="file" @change="onFileChange" />
    <!-- /头像上传input   -->

    <!-- 个人信息 -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isUpdateNameShow = true"
    ></van-cell>
    <van-cell
      title="性别"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
      @click="isUpdateGenderShow = true"
    ></van-cell>
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="isUpdateBirthShow = true"
    ></van-cell>
    <!-- /个人信息 -->

    <!-- 编辑昵称弹出层 -->
    <van-popup
      v-model="isUpdateNameShow"
      style="height: 100%"
      position="bottom"
    >
      <!-- 使用v-model 既要用又要改  表明：user.name 需要在子组件中接收使用 props  ,需要修改使用$emit('input',要修改的值) -->
      <updateName
        v-if="isUpdateNameShow"
        @close="isUpdateNameShow = false"
        v-model="user.name"
      ></updateName>
    </van-popup>
    <!-- /编辑昵称弹出层 -->

    <!-- 编辑性别弹出层 -->
    <van-popup v-model="isUpdateGenderShow" position="bottom">
      <userGender
        v-if="isUpdateGenderShow"
        v-model="user.gender"
        @close="isUpdateGenderShow = false"
      ></userGender>
    </van-popup>
    <!-- /编辑性别弹出层 -->

    <!-- 编辑生日弹出层 -->
    <van-popup v-model="isUpdateBirthShow" position="bottom">
      <userBirth
        v-if="isUpdateBirthShow"
        v-model="user.birthday"
        @close="isUpdateBirthShow = false"
      ></userBirth>
    </van-popup>
    <!-- /编辑生日弹出层 -->
    <!-- 编辑头像弹出层 -->
    <van-popup
      v-model="isUpdatePhotoShow"
      position="bottom"
      style="height: 100%"
    >
      <userPhoto
        v-if="isUpdatePhotoShow"
        :img="img"
        @close="isUpdatePhotoShow = false"
        @updatePhoto="user.photo = $event"
      ></userPhoto>
    </van-popup>
    <!-- /编辑头像弹出层 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import updateName from './comments/user-name.vue'
import userGender from './comments/user-gender.vue'
import userBirth from './comments/user-birthday.vue'
import userPhoto from './comments/user-photo.vue'
export default {
  name: 'userInfo',
  components: {
    updateName,
    userGender,
    userBirth,
    userPhoto
  },
  data () {
    return {
      user: {},//用户的个人信息
      isUpdateNameShow: false,//昵称
      isUpdateGenderShow: false,//性别
      isUpdateBirthShow: false,//生日
      isUpdatePhotoShow: false,//头像
      img: null,//预览头像
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        console.log(data);
        this.user = data.data
      } catch (error) {
        this.$toast('数据获取失败')
      }
    },
    onFileChange () {
      //获取文件对象 this.refs.file  获取ref中file的文件对象
      const file = this.$refs.file.files[0]
      console.log(file);
      //基于图片对象获取blob数据
      const data = window.URL.createObjectURL(file)
      console.log(data);
      this.img = data;
      //弹层显示
      this.isUpdatePhotoShow = true;

      //file-input 如果选了同一个文件不会触发 change事件，解决方案：每次使用完毕，都把value清空
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less">
.userInfo {
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>