import http from "../utils/request";

// 请求轮播图数据
export const getCommunityData = (time, limit) => {
  // 返回promise对象
  return http.get(`/post/getposts?created_at=${time}&limit=${limit}`)
}
