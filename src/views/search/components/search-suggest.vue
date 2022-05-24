<template>
  <div class="search-suggest">
    <van-cell
      icon="search"
      v-for="(item, index) in suggestions"
      :key="index"
      @click="clickBtn(item)"
    >
      <div slot="title" v-html="highLight(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { searchSuggest } from '@/api/search'
import { debounce } from 'lodash'//防抖函数作用
export default {
  name: 'SearchSuggest',
  props: {
    searchTest: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: [],//联想建议
    }
  },
  watch: {
    // 监听 数据变化
    searchTest: {
      // 原始的正常的写法
      // handler:function(val){
      //   console.log(val);
      // }

      //使用debounce函数 参数1：1个回调函数 参数2：延迟时间
      handler: debounce(function (newVal) {
        this.loadingSuggest(newVal)
      }, 200),

      // 监听searchTest 父传子的值的变化，发生变化时，调用handler函数，handler 固定格式 
      // handler (newVal) {
      //   // console.log(newVal);
      //   // console.log(oldVal);
      //   this.loadingSuggest(newVal)

      // },
      // 该回调将会在侦听开始之后被立即调用
      immediate: true
    }
  },
  methods: {
    clickBtn (val) {

      this.$emit('searchBtn', val);
    },
    async loadingSuggest (searchTest) {
      try {
        const { data } = await searchSuggest(searchTest)

        this.suggestions = data.data.options.length > 1 ? data.data.options : [];
      } catch (error) {
        this.$toast('数据获取失败，稍后重试')
      }

    },
    highLight (item) {
      let highlightStr = `<span class="active">${this.searchTest}</span>`;
      // 正则表达式 // 中间内容会当做匹配字符串使用，而不是变量
      // 使用动态变量 则用 new RegExp()
      //RegExp() 构造函数
      //参数1：匹配变量，创建正则对象
      //参数2：匹配模式
      let reg = new RegExp(this.searchTest, 'gi')
      return item.replace(reg, highlightStr)
    },
  }
}
</script>

<style scoped lang="less">
.search-suggest {
  /deep/span.active {
    color: #3296fa;
  }
}
</style>