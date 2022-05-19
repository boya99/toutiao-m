// 封装获取新闻列表数据
import request from '@/utils/request'

/**
 * 获取文章新闻推荐
 * @param {data} data 
 * @returns 
 */
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params
  })
}
