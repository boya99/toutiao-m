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
/**
 * 获取文章新闻详情
 * @param {data} data 
 * @returns 
 */
export const getArticleById = articleId => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${articleId}`,

  })
}
/**
 * 收藏文章
 * @param {data} data 
 * @returns 
 */
export const collectArticle = target => {
  return request({
    method: 'POST',
    url: `/v1_0/article/collections`,
    data: {
      target,
    }

  })
}
/**
 * 收藏文章
 * @param {data} data 
 * @returns 
 */
export const delCollect = targetId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${targetId}`,
  })
}
/**
 * 点赞文章
 * @param {targetId} data 
 * @returns 
 */
export const addLikes = targetId => {
  return request({
    method: 'POST',
    url: `/v1_0/article/likings`,
    data: {
      target: targetId
    }
  })
}
/**
 * 取消点赞文章
 * @param {targetId} data 
 * @returns 
 */
export const delLikes = targetId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${targetId}`,

  })
}
