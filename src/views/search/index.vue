<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- /搜索栏 -->
    <!-- 搜索结果 -->
    <searchResultVue
      v-if="isResultShow"
      :searchTest="searchText"
    ></searchResultVue>
    <!-- /搜索结果 -->
    <!-- 联想建议 -->
    <searchSuggestVue
      v-else-if="searchText"
      :searchTest="searchText"
      @searchBtn="onSearch"
    ></searchSuggestVue>
    <!-- /联想建议 -->
    <!-- 搜索历史记录 -->
    <searchHistoryVue
      v-else
      :searchHistorys="searchHistory"
      @searchBtn="onSearch"
      @update-history="updateHistory"
    ></searchHistoryVue>
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import searchHistoryVue from './components/search-history.vue';
import searchResultVue from './components/search-result.vue';
import searchSuggestVue from './components/search-suggest.vue';
import { setItem, getItem } from '@/utils/storage'
export default {
  name: "SearchPage",
  components: {
    searchHistoryVue,
    searchResultVue,
    searchSuggestVue
  },
  props: {},
  data () {
    return {
      searchText: '',
      isResultShow: false,//控制搜索结果的展示
      searchHistory: getItem('TOUTIAO_HISTORYS') || [],//历史搜索记录
    };
  },
  computed: {},
  watch: {
    //监听搜索历史记录
    // searchHistory:{  //完整写法
    //   handler(){

    //   }
    // }

    searchHistory (val) {
      //简写形式
      console.log('参数值==', val);
      console.log('对象数组==', this.searchHistory);
      setItem('TOUTIAO_HISTORYS', val)
    }
  },
  created () { },
  methods: {
    onSearch (val) {
      // console.log(val);
      // 更新文本框内容
      this.searchText = val;
      //存储搜索历史记录
      // 1.不要有重复
      // 2.倒序
      let index = this.searchHistory.indexOf(val);
      if (index !== -1) {
        this.searchHistory.splice(index, 1)
      }
      this.searchHistory.unshift(val)//从头部插入数组
      //展示搜索结果
      this.isResultShow = true;
    },
    onCancel () {
      //取消事件
      this.$router.back()
    },
    updateHistory (val) {
      this.searchHistory = val
    }
  }
};
</script>

<style scoped lang="less">
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>