<template>
  <!-- 文章收藏 -->
  <van-icon
    :loding="loding"
    :name="isCollect ? 'star' : 'star-o'"
    :class="isCollect ? 'collected  ' : ''"
    @click="onCollect"
  />
</template>

<script>
import { collectArticle, delCollect } from '@/api/article.js'
export default {
  name: 'collectArticle',
  model: {
    prop: 'isCollect',
    event: 'updateCollect'
  },
  props: {
    isCollect: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      loding: false,
    }
  },
  methods: {
    async onCollect () {
      this.loding = true
      try {
        if (this.isCollect) {
          //取消收藏操作
          let { data } = await delCollect(this.articleId)
          console.log('取消收藏', data);

        } else {
          //添加收藏操作
          let { data } = await collectArticle(this.articleId)
          console.log('添加收藏', data);

        }
        this.$emit('updateCollect', !this.isCollect)
        this.$toast.success(!this.isCollect ? '收藏成功' : '取消收藏')
      } catch (error) {
        this.$toast.fail('收藏失败，请重试')
      }

      this.loding = false
    }
  }

}
</script>

<style scoped lang="less">
.collected {
  color: #ffa500;
}
</style>