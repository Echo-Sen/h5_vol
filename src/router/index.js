import Vue from 'vue'
import Router from 'vue-router'
import { Notify } from 'vant'
import Home from '@/views/Home/Home'
import Mine from '@/views/Mine/Mine'
import Message from '@/views/Message/Message'
import LoginPage from '@/views/Mine/Login/login'
import UploadPost from '@/views/Message/UploadPost/UploadPost'
import Published from '@/views/Message/Published/Published'
import { isLogin } from '@/utils/Login'

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
      path: '/comment',
      name: 'Comment',
      component: () => import('@/views/Message/Comment/Comment')
    },
    {
      path: '/login',
      component: LoginPage
    },
    {
      path: '/uploadpost',
      name: 'UploadPost',
      component: UploadPost,
      meta: { requireAuth: true }
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
    {
      path: '/activiesmanage',
      name: 'ActivesManage',
      component: () => import('@/views/Admin/ActivesManage/ActivesManage')
    },
    // 活动发布页
    {
      path: '/publishactivesDetail',
      name: 'PublishActivesDetail',
      component: () => import('@/views/Admin/ActivesManage/PublishActivesDetail/PublishActivesDetail')
    },
    // 活动删除
    {
      path: '/deleteactiviesDetail',
      name: 'DeleteActivesDetail',
      component: () => import('@/views/Admin/ActivesManage/DeleteActives/DeleteActives')
    },
    // 校园帮
    {
      path: '/help',
      name: 'Help',
      component: () => import('@/views/Help/Help')
    },
    // 报名详情
    {
      path: '/activitiesshow',
      name: 'ActivitiesShow',
      component: () => import('@/views/Admin/ActivitiesInfo/ActivitiesShow/ActivitiesShow')
    },
    {
      path: '/activitieslist',
      name: 'ActivitiesList',
      component: () => import('@/views/Admin/ActivitiesInfo/ActivitiesList')
    },
    // 校园帮-软件帮
    {
      path: '/software',
      name: 'SoftWare',
      component: () => import('@/views/Help/software/software')
    },
    // 校园帮-闲置
    {
      path: '/idle',
      name: 'Idle',
      component: () => import('@/views/Help/idle/idle')
    },
    // 校园帮-快递
    {
      path: '/expressage',
      name: 'Expressage',
      component: () => import('@/views/Help/expressage/expressage')
    },
    // 校园帮-互助
    {
      path: '/helping',
      name: 'Helping',
      component: () => import('@/views/Help/helping/helping')
    },
    // gpt
    {
      path: '/chatgpt',
      name: 'ChatGpt',
      component: () => import('@/views/MessagePanel/messagePanel')
    },
    // alluserinfo
    {
      path: '/alluserinfo',
      name: 'AllUserInfo',
      component: () => import('@/views/Admin/UserInfo/UserInfo')
    },
    // 后台权限管理
    {
      path: '/permissionmanage',
      name: 'PermissionManage',
      component: () => import('@/views/Admin/UserInfo/PermissionManage/PermisionManage')
    }
  ],
  mode: 'history'
})
// 路由前置守卫
router.beforeEach((to, from, next) => {
  // 判断用户是否登录
  if (!isLogin() && to.meta.requireAuth) {
    sessionStorage.setItem('redirectPath', to.path)// 保存用户本来要访问的页面路径
    Notify("将在3秒后跳转到登录页")
    setTimeout(() => {
      next({
        path: '/my'
      })
    }, 3000);

  } else {
    next()
  }

  // 借伞前判断是否登录


})

export default router


