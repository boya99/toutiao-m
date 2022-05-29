<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image round class="avatar" fit="cover" :src="userInfo.photo" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round to="/user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 已登录 -->

    <!-- 未登录 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <!-- ~@ 表示src 文件夹  -->
        <img class="mobile-img" src="~@/assets/mobile.png" alt="" srcset="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- 未登录 -->

    <!-- 导航 -->
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 导航 -->

    <van-cell title="消息通知" is-link></van-cell>
    <van-cell class="mb-9" title="小智同学" is-link></van-cell>
    <van-cell
      v-if="user"
      class="logout-cell"
      title="退出登录"
      center
      clickable
      @click="onLogout"
    ></van-cell>
  </div>
</template>

<script>
// 从vuex 导入 mapState ，对store/index.js 中的 要存储的信息进行映射
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  data () {
    return {
      userInfo: {},//用户信息
    }
  },
  created () {
    if (this.user) {//此处是用户登录，则请求加载数据
      this.loadUserInfo()
    }
  },
  // 计算属性，做映射 映射vuex 中设置的 user
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onLogout () {
      //退出提示
      // 组件在vue 中需要使用this.$dialog
      this.$dialog.confirm({
        title: '确认退出吗',
        // message: '弹窗内容',
      })
        .then(() => {
          console.log('确认执行');
          //清除操作 修改vuex中存储的信息和localStorage里面的值
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          console.log('取消执行');
        });
      //确认退出：清除登录状态（容器中的user,+本地存储的user）
    },
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        console.log(data);
        this.userInfo = data.data
      } catch (error) {
        this.$toast('获取数据失败，请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 361px;
    // 使用~@
    background: url("~@/assets/banner.png");
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-content: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }

  .user-info {
    .base-info {
      height: 231px;
      // background-color: pink;
      padding: 76px 32px 33px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border: 2px solid #fff;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      // background-color: gold;
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    margin-bottom: 8px;
    .grid-item {
      height: 141px;
      i.iconfont {
        font-size: 45px;
      }
      .icon-shoucang {
        color: #eb5253;
      }
      .icon-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }

  .logout-cell {
    margin-top: 8px;
    text-align: center;
    color: #eb5253;
  }
}
</style>