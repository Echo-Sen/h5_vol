import http from "../utils/request";
// 获取重定向地址
export const oauthUrl = () => {
  return http({
    method: 'POST',
    url: '/user/login',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: {
      // 这里指向跳转的地址
      redirect_uri: encodeURI('http://www.ctbucqt.cn:8080/login'),
    },
  }
  )
}
// 获取用户信息
export const oauthUser = (code) => {
  return http(
    {
      method: 'POST',
      url: '/user/getinfo',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: { code },
    }
  )
}

