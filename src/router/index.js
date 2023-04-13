import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home/Home'
import Mine from '@/views/Mine/Mine'
import Message from '@/views/Message/Message'
import LoginPage from '@/views/Mine/Login/login'
import UploadPost from '@/views/Message/UploadPost/UploadPost'
import Published from '@/views/Message/Published/Published'
// import Update from '@/views/Message/Update/Update'
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: {
        path: '/home',
        name: 'Home',
        component: Home
      }
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
      // meta: { requiresAuth: true }, // 需要授权
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/login',
      component: LoginPage
    },
    {
      path: '/uploadpost',
      name: UploadPost,
      component: UploadPost
    }, {
      path: '/published',
      name: 'Published',
      component: Published
    },
    {
      path: '/message/update',
      name: 'Update',
      component: () => import('@/views/Message/Update/Update')
    }, {
      path: '/borrowumbrella',
      name: 'borrowUmbrella',
      component: () => import('@/views/borrowUmbrella/borrowUmbrella')
    }
  ],
  mode:'history'
})

export default router


