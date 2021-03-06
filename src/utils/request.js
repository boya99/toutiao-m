// 网络请求 - 二次封装
import axios from 'axios'
import store from '@/store'
import JSONbig from 'json-bigint'

let server = axios.create({
  // 请求公共地址
  // baseURL: "http://ttapi.research.itcast.cn/",
  // baseURL: "http://toutiao-app.itheima.net/",
  baseURL: "http://toutiao.itheima.net/",
  // 超时时间
  timeout: 5000,
  //自定义后端响应的原始数据
  //data 后端返回的原始数据，说白了就是JSON格式的字符串
  transformResponse: [function (data) {
    //axios   默认在内部JSON.parse(data)数据
    // return JSON.parse(data)

    try {
      return JSONbig.parse(data)
    } catch (error) {
      return data
    }
  }],
})

// 请求拦截
server.interceptors.request.use(config => {
  //  config是一个包含了所有请求信息的对象 在这里可以修改config对象 修改之后需要返回config对象 请求才会正常进行
  // config 配置对象 携带token 
  const user = store.state.user;
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  //务必返回config 配置对象
  return config
}, err => {
  // throw new Error(err) 还没有出错 会进入这里
  // console.log('请求拦截config失败',config);
  return Promise.reject(err)
})


// 响应拦截
server.interceptors.response.use(res => {
  // res 是服务器返回的数据信息
  // console.log('响应拦截res成功', res);
  // return res.data
  return res
}, err => {
  // console.log('响应拦截res失败', err);
  // return err.response.data;
  // return err;
  // return err.response;
  return Promise.reject(err)
  // throw new Error(err)
})

export default server
