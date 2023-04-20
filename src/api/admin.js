import http from '@/utils/request'

// 发布活动
export const AddActive = (option) => {
  return http({
    method: 'POST',
    url: 'auth/act/add',
    data: option,
    needToken: true
  })
}