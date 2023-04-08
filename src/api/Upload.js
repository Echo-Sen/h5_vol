import http from "../utils/request";

// 上传图片
export const uploadImgData = (token, base64) => {
  // 返回promise对象
  return http(
    {
      url: '/auth/upload/image',
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
      data: {
        image: base64
      }
    })
}

// 上传表单
export const uploadFormData = (option,token) => {
  return http({
    method:'POST',
    url: '/auth/post/publish',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`,
    },
    data: option
  })
}


