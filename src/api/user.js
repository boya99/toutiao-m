// 用户请求相关请求
import request from '@/utils/request'
// import store from '@/store'

export const login = data => {
  return request({
    method: 'POST',
    url: 'v1_0/authorizations',
    data
  })
}

/**
 * 发送验证码
 * @param {*} mobile 
 * @returns 
 */
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`,
  })
}

/**
 * 获取用户信息
 * @param {data} data 
 * @returns 
 */
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user',
    //发送请求头 数据  需要授权才能访问  Bearer token数据
    // headers:{
    //   Authorization:`Bearer ${store.state.user.token}`
    // }
  })
}

/**
 * 获取用户频道信息
 * 
 * @returns 
 */
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels',
  })
}
