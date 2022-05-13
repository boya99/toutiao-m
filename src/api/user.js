// 用户请求相关请求
import request from '@/utils/request'

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
