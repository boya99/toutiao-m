// 封装评论列表数据
import request from '@/utils/request'
/**
 * 获取文章评论
 * @param {data} data 
 * @returns 
 */
export const getComments = params => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}
/**
 * 文章评论点赞
 * @param {data} data 
 * @returns 
 */
export const addCommentLike = target => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}
/**
 * 取消文章评论点赞
 * @param {data} data 
 * @returns 
 */
export const delCommentLike = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${target}`,

  })
}
/**
 * 发布文章评论点赞
 * @param {data} data 
 * @returns 
 */
export const addComment = data => {
  return request({
    method: 'POST',
    url: `/v1_0/comments`,
    data

  })
}
