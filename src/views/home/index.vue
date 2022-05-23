<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <!-- 插槽  > -->
      <template #title>
        <van-button
          class="search-btn"
          round
          size="small"
          type="info"
          icon="search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 频道列表
    animated 属性可以开启切换标签内容时的转场动画。
    通过 swipeable 属性可以开启滑动切换标签页。
    -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab v-for="item in channelList" :key="item.id" :title="item.name">
        <ArticleList :channel="item"></ArticleList>
      </van-tab>
      <!-- 占位符，频道滑到最右的地方，有个占位的地方 -->
      <div class="placeholder" slot="nav-right"></div>
      <div class="hamburger-btn" slot="nav-right" @click="isshowChannel = true">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
    <!-- /频道列表 -->

    <!-- 频道弹出层 -->
    <van-popup
      class="edit-channel-popup"
      v-model="isshowChannel"
      closeable
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <!-- 频道组件 -->
      <channelEdit
        :mychannel="channelList"
        :active="active"
        @update-channel-active="onUpdateActive"
      ></channelEdit>
      <!-- /频道组件 -->
    </van-popup>
    <!-- /频道弹出层 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'
import channelEdit from './components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    channelEdit,
  },
  data () {
    return {
      value: '',
      active: 0,
      channelList: [],//频道列表
      isshowChannel: false,//通过 v-model 控制弹出层是否展示。
    }
  },
  methods: {
    // 获取用户频道
    async loadingUserChannels () {
      try {
        if (this.user) {
          const channelList = await getUserChannels();
          this.channelList = channelList.data.data.channels
        } else {
          const localChannel = getItem('TOUTIAO_CHANNELS');
          if (localChannel) {
            this.channelList = localChannel
          } else {
            const channelList = await getUserChannels();
            this.channelList = channelList.data.data.channels
          }

        }

      } catch (error) {
        console.log('查询失败', error);
        this.$toast('获取用户频道失败')
      }
    },
    onUpdateActive (index, isshowChannel = true) {
      console.log('父组件', isshowChannel);
      //激活频道，选中状态
      this.active = index;
      //关闭频道弹层
      this.isshowChannel = isshowChannel;
    }
  },
  created () {
    this.loadingUserChannels()

    //解构案例： { 属性key } =  对象
    // const obj = {
    //   config: { name: '23', sex: 23 },
    //   data: { data: [1, 2], message: 'ok' },
    //   header: { conte: 'er', length: 23 },
    //   request: { fefe: 'we', fds: 'sdf' },
    //   status: 200,
    //   text: "ok"
    // }

    // const { data } = obj
    // console.log(data);
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .page-nav-bar {
    .search-btn {
      width: 555px;
      height: 64px;
      color: #ffffff;
      font-size: 30px;
      background-color: #5babfb;
      border: none;
      .van-icon {
        font-size: 34px;
      }
    }
  }
  /deep/ .channel-tabs {
    .van-tabs__content {
      min-height: 79vh;
    }
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;

      .van-tabs__nav {
        padding-bottom: 0;
      }
      .van-tabs__line {
        width: 31px;
        height: 6px;
        background-color: #3296fa;
        border-radius: 3px;
        bottom: 8px;
      }
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 28px;
      color: #777;
    }
    .van-tab--active {
      font-size: 30px;
      font-weight: normal;
      color: #333333;
    }
    .placeholder {
      width: 66px;
      height: 82px;
      flex-shrink: 0; //不参与flex布局中的空间计算
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.icon-gengduo {
        font-size: 33px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 2px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-repeat: no-repeat;
        background-size: contain;
      }
    }
  }

  .edit-channel-popup {
  }
}
</style>