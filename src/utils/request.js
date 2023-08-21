import router from '@/router';
import axios from 'axios'
import { Toast, Notify } from "vant";
import { isLogin } from './Login';

const http = axios.create({
  // 通用地址
  // baseURL: 'http://47.115.227.77:7001/api',
  baseURL:'https://api.vol.lsnx.top/api',
  // 超时时间
  timeout: 10000
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 需要token
  if (config.needToken) {
    if (isLogin()) {
      const token = 'Bearer ' + JSON.parse(localStorage.getItem('userinfo')).sk
      config.headers['Authorization'] = token
    } else {
      localStorage.removeItem('userinfo');
      localStorage.removeItem('token_expires_at');
      Toast.fail('当前未登录或身份认证已过期，请重新登录')
    }
  }
  // 设置请求的headers信息
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么


  if (response.data.status === -1) {
    // 删除过期token 跳转登录页面
    localStorage.removeItem('userinfo')
    localStorage.removeItem('token_expires_at');
    Notify("将在3秒后跳转到登录页")

    setTimeout(() => {
      router.replace({
        path: '/my'
      })
    }, 3000);
  }
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default http