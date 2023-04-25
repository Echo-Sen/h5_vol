import http from "../utils/request";

// 请求社区数据
export const getCommunityData = (time, limit) => {
  // 
  return http({
    url: `/post/getposts?created_at=${time}&limit=${limit}`,
    method: 'GET',
    needToken: false
  })
}

// 获取个人帖子
export const getPersonData = (time, limit) => {
  return http({
    method: "GET",
    url: `/auth/post/myposts?created_at=${time}&limit=${limit}`,
    needToken: true
  })
}
// 上传点赞情况
export const postLiked = (id) => {
  return http({
    method: 'POST',
    url: '/auth/post/like',
    data: { post_id: id },
    needToken: true
  })
}
//  是否点赞
export const postIsLike = (id) => {
  return http({
    method: 'POST',
    url: "/auth/post/islike",
    data: { post_id: id },
    needToken: true
  })
}
// 发表评论
export const POstCommentsData = (option) => {
  return http({
    method: 'POST',
    url: 'auth/post/cmt',
    data:option,
    needToken: true
  })
}

// 获取评论数据
export const GetCommentsData = (id) => {
  return http({
    method: 'POST',
    url: 'auth/post/getcmts',
    data: { post_id: id },
    needToken: true
  })
}

// 删除帖子
export const deleteCard = (id) => {
  return http({
    method: 'POST',
    url: '/auth/post/delete',
    data: { post_id: id },
    needToken: true
  })
}