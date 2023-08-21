import http from '@/utils/request'

// 借还伞请求
export const postUmbrella = (option) => {
  return http({
    url: '/auth/uma/bworrt',
    method: 'POST',
    data: option,
    needToken: true
  })
}

// 扫码接口 --url必须使用扫码界面的地址
export const getJsJDK = (url) => {
  return http({
    url: "/auth/user/getjscfg",
    method: 'POST',
    data: { url },
    needToken: true
  })
}