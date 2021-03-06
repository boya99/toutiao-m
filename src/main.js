import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
/** 加载核心组件库 */
import Vant from 'vant'
/** 加载 vant 全局样式 */
import 'vant/lib/index.css'
/** 导入全局样式 */
import '@/styles/index.less'
/** 加载模块 */
import 'amfe-flexible'
Vue.config.productionTip = false
/** 注册使用vant */
import '@/utils/dayjs'
Vue.use(Vant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
