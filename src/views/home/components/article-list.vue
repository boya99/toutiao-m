<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      :success-text="refreshsuccessText"
      success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <!-- <van-cell
          size="large"
          v-for="item in list"
          :key="item.art_id"
          :title="item.title"
        /> -->

        <ArticleItem v-for="(item, index) in list" :key="index" :article="item">
        </ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item/index.vue'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],//数据列表
      loading: false,//控制是否加载更多 loding状态
      finished: false,//是否加载完成
      error: false,//是否加载失败
      timestamp: null, // 请求下一页数据的时间戳
      refreshing: true,//是否处于加载状态，加载过程中不触发load事件
      error: false,//加载失败的状态情况
      refreshsuccessText: '刷新成功',
    }
  },
  created () {
  },
  methods: {
    // 初始化或滚动到底部的时候触发 onload 
    async onLoad () {
      try {
        if (this.refreshing) {
          this.refreshing = false
        }
        //1.请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })

        console.log('请求响应数据', data);
        const { results } = data.data
        //2.数据添加数组
        this.list.push(...results)
        //loading 关闭以后才能继续触发下一次
        this.loading = false;
        //3. 判断是否还有数据
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了，设置加载状态结束，不再触发上拉加载更多了
          console.log('没有数据');
          this.finished = true
        }
      } catch (err) {
        console.log('请求', err)
        // this.$toast('刷新失败')
        this.error = true;
        this.refreshing = false;
        //请求失败
        this.loading = false
      }
    },

    // 下拉触发
    async onRefresh () {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      console.log('下拉');
      // this.onLoad();

      try {
        if (this.refreshing) {
          this.refreshing = false
        }
        //1.请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),//请求最新的数据
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        console.log('下拉请求响应数据', data);
        // if (Math.random() > 0.2) {
        //   JSON.parse('123abc')
        // }
        const { results } = data.data
        //2.数据添加数组
        this.list.unshift(...results)
        //loading 关闭以后才能继续触发下一次
        this.loading = false;
        if (results.length) {
          // this.$toast('下拉刷新' + results.length + '条数据成功');
          this.refreshsuccessText = `刷新成功，${results.length}条数据成功`
        }
      } catch (err) {
        console.log('请求', err)
        this.refreshsuccessText = '刷新失败'
        this.error = true;
        this.refreshing = false;
        //请求失败
        this.loading = false
      }


    }
  }
}
</script>

<style scoped lang="less">
/* 百分比单位是相对于父元素 
  vw vh 视口单位不受父元素影响
  1vw = 可视窗口宽度的百分之一，比如窗口宽度是750，则1vw = 7.5px
  1vh = 可视窗口高度的百分之一，比如窗口高度是667，则1vh = 6.67px

  每个标签内容文章列表产生自己的滚动容器，这样各个频道之间不会相互影响
  设定具体高度，height,
  overflow-y 属性，纵向下拉条对齐左侧内容
*/
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>