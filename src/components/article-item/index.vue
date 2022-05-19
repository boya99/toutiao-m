<template>
  <div class="article-item">
    <van-cell-group>
      <van-cell size="large">
        <div slot="title" class="article-title van-multi-ellipsis--l2">
          {{ article.title }}
        </div>
        <div slot="label">
          <div v-if="article.cover.type === 3" class="cover-wrap">
            <div
              class="cover-item"
              fit="cover"
              v-for="(img, index) in article.cover.images"
              :key="index"
            >
              <van-image class="cover-img" fit="cover" :src="img" />
            </div>
          </div>
          <div class="label-foot">
            <span>{{ article.aut_name }}</span>
            <span>{{ article.comm_count }} 评论</span>
            <span>{{ article.pubdate | relativeTime }} </span>
          </div>
        </div>

        <van-image
          v-if="article.cover.type === 1"
          slot="default"
          class="right-img"
          fit="cover"
          :src="article.cover.images[0]"
        />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {}
}
</script>

<style scoped lang="less">
.article-item {
  .article-title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset; //不参与flex空间分配
    width: 232px;
    height: 146px;
    padding-left: 25px;
    .right-img {
      width: 232px;
      height: 146px;
    }
  }
  .label-foot span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      //子元素各占1份
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        //不包括最后一个元素
        padding-right: 4px;
      }
      .cover-img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
