// 网络请求 - 二次封装
import axios from 'axios'

let server = axios.create({
  // 请求公共地址
  // baseURL: "http://ttapi.research.itcast.cn/",
  // baseURL: "http://toutiao-app.itheima.net/",
  baseURL: "http://toutiao.itheima.net/",
  // 超时时间
  timeout: 5000,
})

// // 请求拦截
// server.interceptors.request.use(config => {
//   // console.log('请求拦截config成功',config); // config是一个包含了所有请求信息的对象 在这里可以修改config对象 修改之后需要返回config对象 请求才会正常进行
//   // config.headers.token = "asidoaslkd-12301jkwqmwlq-sadjalsmdl2"
//   return config
// }, err => {
//   // throw new Error(err)
//   // console.log('请求拦截config失败',config);
//   return Promise.reject(err)
// })


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
