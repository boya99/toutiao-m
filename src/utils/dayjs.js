import Vue from 'vue'
import dayjs from 'dayjs'
//加载中文语言包
import 'dayjs/locale/zh-cn'
//引入 相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'
//加载插件
dayjs.extend(relativeTime)

//默认英文，配置中文
dayjs.locale('zh-cn')
//dayjs() 获取当前最新时间
// console.log(dayjs().to(dayjs('2012-12-27 17:23:34')));

//定义全局过滤器，任何地方使用，相当于全局公共方法（仅限模板使用）
//参数1:过滤器名称
//参数2:过滤器函数
//使用方式;{{表达式|过滤器名称}}  管道符前面的表达式结果作为参数传递给过滤器名称   过滤器的返回值渲染到模板中
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
