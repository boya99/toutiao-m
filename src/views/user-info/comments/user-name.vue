<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    >
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 输入框 -->
    <div class="field-wrap">
      <van-field
        v-model.trim="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>

    <!-- /输入框 -->
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'updateName',
  props: {
    value: {
      type: String,
      required: true
    },

  },
  data () {
    return {
      localName: this.value
    }
  },
  methods: {
    async onConfirm () {
      // 展示loading 防止多次点击
      this.$toast.loading({
        message: '保存中。。。',
        forbidClick: true,//禁止背景点击
        duration: 0,//持续展示
      })
      try {
        if (!this.localName.length) {
          return this.$toast('昵称不能为空')
        }
        await updateUserProfile({
          name: this.localName
        })
        // console.log(data);
        //更新视图
        this.$emit('input', this.localName)
        //关闭弹层
        this.$emit('close')
        //提示成功
        this.$toast.success('更新成功')
      } catch (error) {
        this.$toast('操作失败，稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.field-wrap {
  padding: 20px;
}
</style>