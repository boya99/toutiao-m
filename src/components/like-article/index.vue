<template>
  <!-- <van-icon color="#777" name="good-job-o" /> -->
  <!-- 文章点赞 -->
  <van-icon
    :loding="loding"
    :name="value == 1 ? 'good-job' : 'good-job-o'"
    :class="value == 1 ? 'liked  ' : ''"
    @click="onliked"
  />
</template>

<script>
import { addLikes, delLikes } from '@/api/article'
export default {
  name: 'likeArticle',
  data () {
    return {
      loding: false
    }
  },
  props: {
    // 父组件 v-model 默认传值为value,事件为input  可以通过model修改
    value: {
      type: Number,
      required: true,
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  methods: {
    async onliked () {
      this.loding = true;
      try {
        let msg
        if (this.value == 1) {
          //取消点赞活动
          await delLikes(this.articleId)
          msg = '取消点赞,成功'

          this.$emit('input', 0)
        } else {
          //点赞操作
          const { data } = await addLikes(this.articleId)
          console.log('点赞', data);
          msg = '点赞,成功'
          this.$emit('input', 1)

        }
        this.$toast.success(msg)
      } catch (error) {
        this.$toast.fail('操作失败，请重试')
      }
      this.loding = false
    }
  }
}
</script>

<style scoped lang="less">
.liked {
  color: #e5645f;
}
</style>