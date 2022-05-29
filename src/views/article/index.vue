<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="article.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <!-- 组件定义class 默认在子组件根节点添加class

              子组件：props:接收父组件：
              :followStatus="article.is_followed"

              修改：自定义事件
              @updateFollow="article.is_followed = $event"

              简写形式：组件上使用v-model

               v-model="article.is_followed" 相当于下面2句代码 $event 就是子组件需要传递的值
              
              value="article.is_followed"
              @input="article.is_followed = $event"

              子组件需要props接收value,调动$emit('input') 事件

              v-model 子组件默认使用value属性和input事件， v-model 只能定义使用一次
              多个数据实现类似v-model 的效果，可以使用.sync属性（查阅vue文档）
              可以在子组件中通过 设置props 定义接收的参数名和 event 定义事件
              model：{
                props:'abc',
                event:'btn'
              }
                --------
              :followStatus="article.is_followed"
              @updateFollow="onUpdateFollow"
          -->
          <followUser
            class="follow-btn"
            v-model="article.is_followed"
            :userId="article.aut_id"
          ></followUser>
          <!-- <van-button
            v-if="article.is_followed == false"
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
          > -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 文章评论列表 -->
        <commentList
          id="target"
          ref="myH"
          :artId="article.art_id"
          :list="commentListAr"
          @totalComment="totalCommentCount = $event.total_count"
          @replayClick="onReplayClick"
        ></commentList>
        <!-- /文章评论列表 -->
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPostshow = true"
            >写评论</van-button
          >
          <van-icon
            name="comment-o"
            :badge="totalCommentCount"
            color="#777"
            @click="commentBtn"
          />
          <!-- 收藏文章 什么时候使用组件v-model  传值，且要修改的时候 -->
          <collectArticle
            v-model="article.is_collected"
            :articleId="article.art_id"
          ></collectArticle>
          <!-- 点赞文章 -->
          <likeArticle
            v-model="article.attitude"
            :articleId="article.art_id"
          ></likeArticle>
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->

        <!-- 发布评论给 -->
        <van-popup v-model="isPostshow" position="bottom">
          <CommentPost
            :target="article.art_id"
            @postSuccess="onPostSuccess"
          ></CommentPost>
        </van-popup>
        <!-- /发布评论给 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errorStatus === 0" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 评论回复 -->
    <!-- 弹层是懒渲染的,只有在第一次展示的时候才会渲染里面的内容 -->
    <van-popup v-model="isReplayshow" position="bottom" style="height: 100%">
      <!-- v-if条件渲染
        true:渲染元素节点
        false:不渲染元素节点
      -->
      <CommentReply
        v-if="isReplayshow"
        :comment="currentComment"
        @click-close="isReplayshow = false"
      ></CommentReply>
    </van-popup>
    <!-- /评论回复 -->
  </div>
</template>

<script>
import { getArticleById } from '@/api/article'
import { ImagePreview } from 'vant';
import { addFllowUser, delfllowsUser } from '@/api/user'
import followUser from '@/components/follow-user'
import collectArticle from '@/components/collect-article'
import likeArticle from '@/components/like-article'
import commentList from './components/comment-list.vue'
import CommentPost from './components/comment-post.vue'
import CommentReply from './components/comment-replay.vue'
export default {
  name: 'ArticleIndex',
  components: {
    followUser,
    collectArticle,
    likeArticle,
    commentList,
    CommentPost,
    CommentReply,
  },
  //给所有后代组件提供数据
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      article: {},//文章详情
      loading: true,//加载状态 true 
      errorStatus: 0,//错误状态码
      followLoding: false,//关注按钮loding
      totalCommentCount: 0,//评论数量
      isPostshow: false,//控制发布评论的显示状态
      commentListAr: [],//评论列表
      isReplayshow: false,//是否回复评论,
      currentComment: null,//当前评论对象
    }
  },
  computed: {},
  watch: {
    // article () {
    //   console.log(this.article);
    // }
  },
  created () {
    this.loadArticle();
  },
  mounted () { },
  methods: {
    commentBtn () {
      document.getElementById("target").scrollIntoView();
      // const list = this.$refs.commentList;
      // console.log('评论dom', list);
      console.log('vue.js', this.$refs.myH);
      console.log('原生js', document.getElementById("target"));
      // this.$refs.commentList.scrollIntoView({ behavior: "instant", block: "end", inline: "nearest" });

    },
    async loadArticle () {
      this.loading = true;

      try {
        const { data } = await getArticleById(this.articleId);
        // let num = Math.random();
        // console.log(num);
        // if (num > 0.5) {
        //   JSON.parse('asfsdffsdfsdfsdfdsf')
        // }
        // console.log(data);
        this.article = data.data

        // 初始化图片点击预览 dom节点更新是异步的
        // console.log(this.$refs['article-content']);

        setTimeout(() => {
          // console.log(this.$refs['article-content']);
          this.imagePreview()
        }, 0);

        // 请求成功 关闭loding
        // this.loading = false
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errorStatus = 404
        }
        this.loading = false
        this.$toast('加载失败，重新再试')
      }
      this.loading = false
    },
    imagePreview () {
      //获取 ref中文章详情的Dom节点
      const dom = this.$refs['article-content']
      //获取img标签的所有节点
      const domImg = dom.querySelectorAll('img')
      // console.log(domImg);
      let images = [];
      //遍历img标签数组，绑定click()事件，添加使用 vant的 ImagePreview组件调用
      domImg.forEach((img, index) => {
        images.push(img.src)
        img.onclick = () => {
          ImagePreview({
            images,
            startPosition: index,
          });
        }
      });
      // console.log(images);
    },
    //取消和关注
    async onFllow () {
      this.followLoding = true
      try {
        if (this.article.is_followed) {//取消关注操作
          let { data } = await delfllowsUser(this.article.aut_id)
          console.log('取消关注操作', data);
          // this.article.is_followed = false
        } else {
          //关注操作
          let { data } = await addFllowUser(this.article.aut_id)
          console.log('关注操作', data);
          // this.article.is_followed = true
        }
        this.article.is_followed = !this.article.is_followed
      } catch (error) {
        let msg = '关注失败，请稍后重试'
        if (error.response && error.response.status == 400) {
          msg = '用户不能关注自己'
        }
        this.$toast(msg)
      }
      this.followLoding = false
    },
    onUpdateFollow () {
      this.article.is_followed = !this.article.is_followed
    },
    // onCommentCount (val) {
    //   this.totalCommentCount = val
    // }
    onPostSuccess (data) {
      //关闭弹出层，
      this.isPostshow = false
      //发布内容显示到顶部  传递给父组件，由父组件执行操作
      this.commentListAr.unshift(data.new_obj)
    },
    // 子组件评论回复
    onReplayClick (comment) {
      console.log(comment);
      this.currentComment = comment
      //显示评论层
      this.isReplayshow = true
    }
  }
}
</script>

<style scoped lang="less">
@import "./github-markdown.css";
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
