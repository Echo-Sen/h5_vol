import http from "../utils/request";

// 请求社区数据
export const getCommunityData = (time, limit) => {
  // 
  return http.get(`/post/getposts?created_at=${time}&limit=${limit}`)
}
// 上传点赞情况
export const postLiked = (id) => {
  return http({
    method: 'POST',
    url: '/auth/post/like',
    data: { post_id: id }
  })
}
//  是否点赞
export const postIsLike = (id) => {
  return http({
    method: 'POST',
    url: "/auth/post/islike",
    data: { post_id: id }
  })
}

// 删除帖子
export const deleteCard = (id) => {
  return http({
    method: 'POST',
    url: '/auth/post/delete',
    data: {post_id: id}
  })
}