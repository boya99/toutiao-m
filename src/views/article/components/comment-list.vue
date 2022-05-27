<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <commentItem
      v-for="(item, index) in list"
      :key="index"
      :comment="item"
    ></commentItem>
  </van-list>
</template>

<script>
import { getComments } from '@/api/comment'
import commentItem from './comment-item.vue'
export default {
  name: 'commentList',
  components: {
    commentItem
  },
  props: {
    artId: {
      type: [Number, String, Object],
      required: true
    },
    list:{
      type:Array,
      default:()=>[],//定义默认数组 or 对象
    }
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,//每页请求的标记
      limit: 10,//请求数量
    }
  },
  methods: {
    async onLoad () {
      try {
        //1.请求数据
        const { data } = await getComments({
          limit: this.limit, //获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
          offset: this.offset, //获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          source: this.artId, //源id，文章id或评论id
          type: 'a',//评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        })
        console.log(data);

        //2.数据添加列表中
        const { results } = data.data
        this.list.push(...results)
        //文章评论的总数量传递给父组件
        this.$emit('totalComment', data.data)
        //3.loading 设置false
        this.loading = false
        //4.判断是否还有下一页
        if (results.length) {
          //有继续，
          this.offset = data.data.last_id
        } else {
          //没有结束 finished = true
          this.finished = true
        }


      } catch (error) {

      }


    },
  },
  created () {
    this.onLoad()
  }
}
</script>

<style>
</style>