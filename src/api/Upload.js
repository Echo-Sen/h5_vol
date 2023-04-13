import http from "../utils/request";

// 上传图片
export const uploadImgData = (base64) => {
  // 返回promise对象
  return http(
    {
      url: '/auth/upload/image',
      method: 'POST',
      data: {
        image: base64
      }
    })
}

// 上传表单
export const uploadFormData = (option) => {
  return http({
    method: 'POST',
    url: '/auth/post/publish',
    data: option
  })
}

// 更新帖子
export const updateFormData = (data) => {
  return http(
    {
      method: 'POST',
      url: 'auth/post/update',
      data: { data }
    }
  )
}


