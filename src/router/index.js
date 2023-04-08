import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home/Home'
import Mine from '@/views/Mine/Mine'
import Message from '@/views/Message/Message'
import LoginPage from '@/views//Mine//Login/login'
import UploadPost from '@/views/Message/UploadPost/UploadPost'
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/my',
      name: 'Mine',
      component: Mine,
      meta: { requiresAuth: true } // 需要授权
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    }, {
      path: '/login',
      component: LoginPage
    },
    {
      path: '/uploadpost',
      component: UploadPost

    }
  ]
})

export default router


