<template>
  <div class="user-gender">
    <!-- default-index  初始选中项 -->
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      :default-index="value"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onPickerChange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'userGender',
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      localGender: this.value,
    }
  },
  methods: {
    onPickerChange (picker, value, index) {
      this.localGender = index
    },
    async onConfirm () {
      this.$toast({
        message: '保存中...',
        forbidClick: true,//禁止背景点击
        duration: 0,//持续展示
      })
      try {
        updateUserProfile({
          gender: this.localGender
        })
        //更新视图
        this.$emit('input', this.localGender)
        //关闭弹层
        this.$emit('close')
        //提示成功
        this.$toast.success('更新成功')
      } catch (error) {
        this.$toast('操作失败，请重试')
      }
    }
  }
}
</script>

<style>
</style>