export const isLogin = () => {
  // 判断是否登录并且token未过期
  if (localStorage.getItem('userinfo') && localStorage.getItem('token_expires_at')) {
    const tokenExpiresAt = JSON.parse(localStorage.getItem('token_expires_at'))
    if (Date.now() < tokenExpiresAt) {
      // 未过期
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

  // if ((localStorage.getItem('userinfo')) && localStorage.getItem('token_expires_at') && config.needToken) {
  //   const token = 'Bearer ' + JSON.parse(localStorage.getItem('userinfo')).sk
  //   const tokenExpiresAt = JSON.parse(localStorage.getItem('token_expires_at'))
  //   if (Date.now() < tokenExpiresAt) {
  //     // 未过期
  //     config.headers['Authorization'] = token
  //   } else {
  //     // Token 已过期，清除 localStorage 中的 Token
  //     localStorage.removeItem('userinfo');
  //     localStorage.removeItem('token_expires_at');
  //     Toast.fail('身份认证已过期，请重新登录')
  //   }
  // }