<template>
  <van-button
    v-if="isFollowd == false"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="followLoding"
    @click="onFllow"
    >关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    round
    size="small"
    :loading="followLoding"
    @click="onFllow"
    >已关注</van-button
  >
</template>

<script>
import { addFllowUser, delfllowsUser } from '@/api/user'
export default {
  name: 'followUser',
  //用来修改父组件中v-model 的传递的参数名
  model: {
    prop: 'isFollowd',
    event: 'updateIsFollow'
  },
  props: {
    //value 父组件v-model 默认传递的参数名为value
    // value: {
    //   type: Boolean,
    //   required: true
    // },
    isFollowd: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      followLoding: false,//关注按钮loding
    }
  },
  methods: {
    //取消和关注
    async onFllow () {
      this.followLoding = true
      try {
        if (this.isFollowd) {//取消关注操作
          let { data } = await delfllowsUser(this.userId)
          console.log('取消关注操作', data);
          // this.article.is_followed = false
        } else {
          //关注操作
          let { data } = await addFllowUser(this.userId)
          console.log('关注操作', data);
          // this.article.is_followed = true
        }
        // this.followStatus = !this.followStatus
        //修改父组件的关注状态 //input 父组件v-model 默认传递的事件名称为 input
        // this.$emit('input', !this.followStatus);
        this.$emit('updateIsFollow', !this.followStatus);
        // this.$emit('updateFollow', !this.followStatus);

      } catch (error) {
        let msg = '关注失败，请稍后重试'
        if (error.response && error.response.status == 400) {
          msg = '用户不能关注自己'
        }
        this.$toast(msg)
      }
      this.followLoding = false
    },
  }
}
</script>

<style scoped lang="less">
</style>