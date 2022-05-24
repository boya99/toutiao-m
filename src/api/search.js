// 用户搜索相关请求
import request from '@/utils/request'

/**
 * 用户搜索建议
 * @param {*} q 
 * @returns 
 */
export const searchSuggest = q => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 * 用户搜索结果 
 * @param {*} q 
 * @returns 
 */
export const searchResult = params => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
