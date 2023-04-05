import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home/Home'
import Mine from '@/views/Mine/Mine'
import Message from '@/views/Message/Message'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/my',
      Name: 'Mine',
      component: Mine
    },
    {
      path: '/message',
      Name: 'Message',
      component: Message
    }
  ]
})