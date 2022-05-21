<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div class="title-text" slot="title">我的频道</div>
      <template #right-icon>
        <van-button
          hairline
          round
          size="small"
          plain
          class="editicon-btn"
          type="info"
          color="#f85f5f"
          @click="isEditShow = !isEditShow"
          >{{ isEditShow ? "完成" : "编辑" }}</van-button
        >
      </template>
    </van-cell>
    <!-- 我的频道 -->
    <van-grid
      clickable
      :gutter="10"
      :column-num="4"
      :border="false"
      class="mychannel"
    >
      <van-grid-item
        v-for="(item, index) in mychannel"
        :key="index"
        @click="delChannel(item, index)"
      >
        <span
          slot="icon"
          v-show="isEditShow && !fixedChannel.includes(item.id)"
          class="channel-close"
          ><van-icon name="close"
        /></span>
        <span slot="text" :class="{ channelActive: index === active }">{{
          item.name
        }}</span>
      </van-grid-item>
    </van-grid>
    <!-- /我的频道 -->
    <!-- 频道推荐 -->
    <van-cell>
      <div class="title-text" slot="title">频道推荐</div>
    </van-cell>

    <van-grid clickable direction="horizontal" :gutter="10">
      <van-grid-item
        v-for="channel in recommentChannels"
        :key="channel.id"
        @click="onAddChannel(channel)"
      >
        <span slot="icon" class="channel-add"><van-icon name="plus" /></span>
        <span slot="text">{{ channel.name }}</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannel } from '@/api/user'
import { mapState } from 'vuex';
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  props: {
    mychannel: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }

  },
  data () {
    return {
      allChannels: [],//所有频道
      isEditShow: false,//控制编辑状态
      fixedChannel: [0],//固定频道，不允许删除，使用id

    }
  },
  methods: {
    async loadingAllChannels () {
      try {
        const { data } = await getAllChannels();
        this.allChannels = data.data.channels;
      } catch (error) {
        this.$toast('请求失败')
      }
    },
    onAddChannel (channel) {
      this.mychannel.push(channel)
      //数据持久化
      if (this.user) {
        try {
          //登陆
          addUserChannel([{
            id: channel.id, // 频道 id
            seq: this.mychannel.length // 频道的 序号
          }])
        } catch (error) {
          this.$toast('添加失败~')
        }

      } else {
        //未登录
        setItem('TOUTIAO_CHANNELS', this.mychannel)
      }
    },
    delChannel (obj, index) {
      if (this.isEditShow) {
        if (this.fixedChannel.includes(obj.id)) return;
        if (index <= this.active) {//移除激活状态的前面的频道
          this.$emit('update-channel-active', this.active - 1, true)
        }
        return this.mychannel.splice(index, 1)
      } else {
        console.log('完成状态');
        //由父组件进行编辑
        this.$emit('update-channel-active', index, false)
      }
      console.log('我的频道', this.mychannel);
    },
    deleChannel () {
      if (this.user) {
        //登陆
        
      } else {
        //未登录
        setItem('TOUTIAO_CHANNELS', this.mychannel)
      }
    }
  },
  created () {
    this.loadingAllChannels();

  },
  computed: {
    ...mapState(['user']),
    recommentChannels () {
      console.log(this.mychannel);
      console.log(this.allChannels);
      // filter方法：遍历数组，把符合条件的元素存储到新数组 条件为true时：把元素放入新数组中返回
      const af = this.allChannels.filter(item => {
        //数组find方法：遍历数组，把符合条件的第一个元素返回
        return !this.mychannel.find(useitem => {
          return useitem.id === item.id
        })
      })

      return af;
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding-top: 88px;
  .channelActive {
    color: red;
  }
  .channel-add {
    margin-right: 6px;
  }
  .van-grid-item {
    position: relative;
  }
  /deep/.mychannel {
    .van-grid-item__icon-wrapper {
      position: absolute;
      right: 20px;
      top: 0;
    }
  }
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .cross-btn {
    font-size: 22px;
  }
  /deep/.van-grid-item__content {
    width: 160px;
    height: 86px;
    background-color: #f4f5f6;
    white-space: nowrap;
    font-size: 26px;
    .van-grid-item__text {
      color: #222222;
    }
  }
}
</style>