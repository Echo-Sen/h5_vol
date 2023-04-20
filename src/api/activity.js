import http from '@/utils/request'
// 获取活动信息
export const getActivities = (option) => {
  return http({
    method: 'GET',
    url: `act/getacts?created_at=${option.created_at}&limit=${option.limit}`,
    needToken: false
  })
}
// 是否报名
export const isSignUp = (id) => {
  return http({
    method: 'POST',
    url: 'auth/act/isreg',
    data: { act_id: id },
    needToken: true
  })
}
// 报名
export const SignUp = (id) => {
  return http({
    method: 'POST',
    url: 'auth/act/register',
    data: { act_id: id },
    needToken: true
  })
}
