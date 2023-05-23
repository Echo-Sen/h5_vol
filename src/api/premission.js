import http from '@/utils/request'
// 申请权限
export const ApplyPermission = (role, reason) => {
  return http({
    method: 'POST',
    url: 'auth/admin/applyadm',
    data: { role, reason },
    needToken: true
  })
}

// 获取当前权限
export const getCurrentPermission = () => {
  return http({
    method: 'POST',
    url: 'auth/admin/myauth',
    needToken: true
  })
}
