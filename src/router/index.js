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
    },
    // 雨伞
    {
      path: '/borrowumbrella',
      name: 'BorrowUmbrella',
      component: () => import('@/views/BorrowUmbrella/borrowUmbrella'),
      meta: { requireAuth: true }
    },
    // 反馈
    {
      path: '/feedback',
      name: 'FeedBack',
      component: () => import('@/views/FeedBack/FeedBack')
    },
    // 活动板块
    {
      path: '/activity',
      name: 'Activity',
      component: () => import('@/views/Activity/Activity'),
    },
    {
      path: '/activity/detail/',
      name: 'Detail',
      component: () => import('@/views/Activity/Detail/Detail')
    },
    {
      path: '/volsignup',
      name: 'VolSignUp',
      component: () => import('@/views/VolSignUp/VolSignUp')
    },
    // 权限申请 
    {
      path: '/permission',
      name: 'Permission',
      component: () => import('@/views/Mine/Permission/Permission')
    },
    // 后台管理
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('@/views/Admin/index/index')
    },
    {
      path: '/applypermission',
      name: 'ApplyPermission',
      component: () => import('@/views/Admin/UserAuthorizationPage/UserAuthorizationPage')
    },
    // 授权详情页
    {
      path: '/applypermissiondetail',
      name: 'ApplyPermissionDetail',
      component: () => import('@/views/Admin/UserAuthorizationPage/UserAuthorizationDetail/UserAuthorizationDetail')
    }, {
      path: '/borrowingInfopage',
      name: 'BorrowingInfoPage',
      component: () => import('@/views/Admin/BorrowingInfoPage/BorrowingInfoPage')
    },
    {
      path: '/feedbackinfo',
      name: 'FeedBackInfo',
      component: () => import('@/views/Admin/FeedBackInfo/FeedBackInfo')
    },
    // 活动发布页
    {
      path: '/publishactivesDetail',
      name: 'PublishActivesDetail',
      component: () => import('@/views/Admin/PublishActives/PublishActivesDetail/PublishActivesDetail')
    },
    // 校园帮
    {
      path: '/help',
      name: 'Help',
      component: () => import('@/views/Help/Help')
    }
  ],
  mode: 'history'
})

export default router


