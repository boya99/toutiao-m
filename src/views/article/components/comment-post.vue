<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="onPostComment"
      :disabled="!message.length"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onPostComment () {
      //在组件中必须通过 this.$toast 来调用 Toast 组件
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true,//禁用背景点击
        duration: 0,//持续时长 默认2000 如果为0 则持续展示
      })

      try {
        const { data } = await addComment({
          target: this.target,//评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          content: this.message,//评论内容	
          art_id: null,//文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。	
        })
        // console.log(data);
        //关闭弹出层，
        //发布内容显示到顶部  传递给父组件，由父组件执行操作
        this.$emit('postSuccess', data.data)
        //清空文本框
        this.message = ''
        this.$toast.success('发布成功')
      } catch (error) {
        this.$toast.fail('发布失败，请重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
