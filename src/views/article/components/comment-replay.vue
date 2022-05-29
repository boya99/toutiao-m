<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <van-icon slot="left" name="cross" @click="$emit('click-close')" />
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 滚动容器 -->
    <div class="scroll-wrap">
      <!-- 当前评论项 -->
      <commentItemVue :comment="comment"></commentItemVue>
      <!-- /当前评论项 -->

      <van-cell title="所有回复" />

      <!-- 评论的回复列表 -->
      <commentListVue
        :artId="comment.com_id"
        type="c"
        :list="commentList"
      ></commentListVue>
      <!-- /评论的回复列表 -->
    </div>

    <!-- 底部发布评论按钮 -->
    <div class="post-wrap">
      <van-button class="post-btn" size="small" round @click="writeReplay"
        >写评论</van-button
      >
    </div>
    <!-- /底部发布评论按钮 -->
    <!-- 发布评论给 -->
    <van-popup v-model="isPostshow" position="bottom">
      <commentPostVue
        :target="comment.com_id"
        @postSuccess="onPostSuccess"
      ></commentPostVue>
    </van-popup>
    <!-- /发布评论给 -->
  </div>
</template>

<script>
import commentItemVue from './comment-item.vue'
import commentListVue from './comment-list.vue'
import commentPostVue from './comment-post.vue'
export default {
  name: 'CommentReply',
  components: {
    commentItemVue, commentListVue, commentPostVue
  },

  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isPostshow: false,
      commentList: [],//评论的回复列表
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    writeReplay () {
      console.log('写评论');
      this.isPostshow = true
    },
    onPostSuccess (data) {
      //更新回复数量
      this.comment.reply_count++
      //关闭弹层
      this.isPostshow = false
      //将最新的评论置顶
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>

<style scoped lang="less">
.zhr {
  z-index: 2;
}
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.post-wrap {
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
</style>
