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