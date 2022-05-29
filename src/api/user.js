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

/**
 * 获取所有频道信息
 * 
 * @returns 
 */
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels',
  })
}
/**
 * 添加用户频道请求信息
 * 
 * @returns 
 */
export const addUserChannel = channels => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels
    }
  })
}
/**
 * 删除用户频道请求信息
 * 
 * @returns 
 */
export const delUserChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelId}`,
  })
}

/**
 * 关注用户
 * 
 * @returns 
 */
export const addFllowUser = target => {
  return request({
    method: 'POST',
    url: `/v1_0/user/followings`,
    data: {
      target: target
    }
  })
}
/**
 * 取消关注用户
 * 
 * @returns 
 */
export const delfllowsUser = targetId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${targetId}`,

  })
}
/**
 * 获取用户个人资料
 * 
 * @returns 
 */
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: `/v1_0/user/profile`,

  })
}
/**
 * 编辑用户个人资料
 * 
 * @returns 
 */
export const updateUserProfile = data => {
  return request({
    method: 'PATCH',
    url: `/v1_0/user/profile`,
    data
  })
}
/**
 * 编辑用户照片资料
 * 
 * @returns 
 */
export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: `/v1_0/user/photo`,
    data
  })
}
