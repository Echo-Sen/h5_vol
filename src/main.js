import Vue from 'vue'
import App from './App.vue'
// 公共样式
import '@/assets/css/base.css'
// 组件库样式
import 'vant/lib/index.css';
// iconfont
import '@/assets/iconfont/iconfont.css'
// 引入路由
import router from '@/router/index'
// 引入工具
import { isLogin } from "@/utils/Login";
// backbar
import Back from '@/components/Backbar.vue/Backbar'
// 按需引入
import { Tabbar, TabbarItem, Toast, Lazyload, Icon, Button, Uploader } from 'vant';

Vue.component('Back', Back)
// 全局注册

Vue.use(Uploader);
Vue.use(Button)
// 轻提示
Vue.use(Toast);
// 图标
Vue.use(Icon);
// 懒加载
Vue.use(Lazyload);
// TabBar
Vue.use(Tabbar);
Vue.use(TabbarItem);

// 判断是否登录
Vue.prototype.isLogin = isLogin

Vue.config.productionTip = false

router.afterEach((to, from, next) => {
  if (to.name === 'ChatGpt') {
    return
  }
  window.scrollTo(0, 0);
});
new Vue({
  render: h => h(App),
  router
}).$mount('#app')