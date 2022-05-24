<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { searchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  props: {
    searchTest: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      pageSize: 20,
      error: false
    };
  },
  methods: {
    async onLoad () {

      try {
        // 1.请求获取数据
        const { data } = await searchResult({
          page: this.page,//页码
          per_page: this.pageSize,//每页大小
          q: this.searchTest,//查询关键词
        })
        console.log(data);
        //2.数据添加数组列表中
        const { results } = data.data
        this.list.push(...results)
        //3.本次中的loding 关闭
        this.loading = false;
        //4.是否还有数据  
        if (results.length > 0) {
          // 有则更新下一页，
          this.page++
        } else {
          //没有则finshed 设置结束
          this.finished = true;
        }


      } catch (error) {
        //展示加载失败的提示状态
        this.error = true
        //加载失败，loding 关闭
        this.loading = false
        this.$toast('获取数据失败，请稍后再试')
      }



    },
  },
}
</script>

<style>
</style>