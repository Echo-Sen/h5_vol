import http from "../utils/request";

// 请求轮播图数据
export const getSwipeData = () => {
  // 返回promise对象
  return http.get('/swipe')
}
