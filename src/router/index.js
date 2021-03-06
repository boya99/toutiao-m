import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

//配置自己的路由表
const routes = [{
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/',
    redirect: 'home',
    // name: 'layout',//如果父路由有默认子路由，那么name 没意义
    component: () => import('@/views/layout'),
    children: [{
        path: 'home',
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my')
      },
    ],
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/index.vue')
  },
  {
    path: '/article/:articleId', //动态路由
    name: 'article',
    component: () => import('@/views/article/index.vue'),
    props: true, //开启 子组件props 传参
  },
  {
    path: '/user/profile', //动态路由
    name: 'profile',
    component: () => import('@/views/user-info/index.vue'),
  },
]

const router = new VueRouter({
  routes
})

export default router
