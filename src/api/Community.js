import http from "../utils/request";

// 请求轮播图数据
export const getCommunityData = () => {
  // 返回promise对象
  return http.get('/community')
}
