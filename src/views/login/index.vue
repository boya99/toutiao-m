<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录2" class="page-nav-bar">
      <template #left>
        <van-icon name="cross" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <!-- 登陆表单 -->
    <!-- 

      表单验证：增加rules 验证规则

     -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        type="number"
        name="mobile"
        placeholder="请输入手机号"
        maxlength="11"
        :rules="userFormRules.mobile"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        type="text"
        name="code"
        maxlength="6"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
          <!-- time:倒计时时间 -->
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 10"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            round
            size="small"
            type="default"
            class="send-sms-btn"
            native-type="button"
            @click="onSendSms"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登陆</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111',//手机号
        code: '246810',//验证码
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|4|5|6|7|8|9]\d{9}$/,//正则匹配
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: false,//是否显示倒计时
    };
  },
  methods: {
    async onSubmit () {
      //获取表单数据
      const user = this.user
      //表单验证

      //在组件中必须通过 this.$toast 来调用 Toast 组件
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true,//禁用背景点击
        duration: 0,//持续时长 默认2000 如果为0 则持续展示
      })
      //请求请求登陆
      try {
        const { data } = await login(user);
        console.log('登录成功', data);
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功');
      } catch (error) {
        if (error.response.status == 400) {
          this.$toast.fail('手机号或验证码失败');
        } else {
          // console.log('登录失败，请稍后再试~', error);
          this.$toast.fail('登录失败，请稍后再试~')
        }

      }

    },
    async onSendSms () {
      //1.校验手机号 validate() 不传就验证 全部表单项
      try {

        await this.$refs.loginForm.validate('mobile')

        console.log('验证通过');
      } catch (error) {
        console.log('验证失败', error);
        return
      }

      //2. 发送验证码
      try {

        await sendSms(this.user.mobile);
        this.$toast('发送成功')
        //3. 发送成功，显示倒计时
        this.isCountDownShow = true;
      } catch (error) {
        console.log('发送失败', error);
        if (error.response.status == 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后再试')
        }
        return
      }


    }
  },
}
</script>

<style lang="less" scoped>
.login-container {
  .icon-shouji,
  .icon-yanzhengma {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 164px;
    height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666666;
    font-family: MicrosoftYaHei;
    font-size: 22px;
  }

  .login-btn-wrap {
    padding: 53px 28px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>