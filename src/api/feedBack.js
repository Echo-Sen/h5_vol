import http from '@/utils/request'

export const feedBackPost = (option) => {
  return http({
    data: option,
    url: '/auth/opt/sendopt',
    method: 'POST',
    needToken:true
  })
}