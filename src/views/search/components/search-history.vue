<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleShow">
        <span @click="$emit('update-history', [])">全部删除</span>&nbsp;&nbsp;
        <span @click="isDeleShow = false">完成</span>
      </div>

      <van-icon name="delete" v-else @click="isDeleShow = true"></van-icon>
    </van-cell>

    <van-cell
      v-for="(item, index) in searchHistorys"
      :key="index"
      :title="item"
      @click="onSearchClick(item, index)"
    >
      <van-icon name="close" v-show="isDeleShow"></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistorys: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleShow: false
    }
  },
  methods: {
    onSearchClick (item, index) {
      if (this.isDeleShow) { //删除状态
        this.searchHistorys.splice(index, 1)
      } else {
        //非删除状态 执行搜索状态
        this.$emit('searchBtn', item);
      }
    }
  }
}
</script>

<style>
</style>