<template>
  <div class="user-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs';
export default {
  name: 'userBirth',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
      localBirth: ''
    };
  },
  methods: {
    async onConfirm (value) {
      this.localBirth = value
      console.log(this.localBirth);
      console.log(this.currentDate);
      const d = dayjs(value).format('YYYY-MM-DD')
      console.log(d);
      this.$toast({
        message: '修改中...',
        forbidClick: true,//背景禁用点击
        duration: 0,//持续展示
      })
      try {
        await updateUserProfile({
          birthday: d
        })
        this.$emit('input', d)
        this.$emit('close')
        this.$toast.success('修改成功')
      } catch (error) {
        this.$toast('操作失败，请重试')
      }
    }
  }
}
</script>

<style>
</style>