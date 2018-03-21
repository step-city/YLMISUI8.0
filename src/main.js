

import 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui' //ElementUI
import locale from 'element-ui/lib/locale/lang/zh-CN'  //国际化
import './common/stylus/index.styl'  //全局样式
import '../theme/index.css'   //默认主题
import '../yltheme/elementui_reset.css'  //重置样式


import $ from 'jquery'
//引入awesome图标库
// import 'vue-awesome/icons'
// import Icon from 'vue-awesome/components/Icon'
// Vue.component('icon', Icon); 

//插件
import Vuex from 'vuex'
import store from './vuex/store'
import VueRouter from 'vue-router' 
import NProgress from 'nprogress'//页面顶部进度条
import 'nprogress/nprogress.css'  //进度条样式
import router from './router'

//根组件
import App from './App'
import components from './components'
import jsPropertyFunc from './common/js/jsPropertyFunc'


Vue.use(ElementUI, { locale })

Vue.use(Vuex)

//注册全局函数
import globalFun from './common/js/globalFun'
//注册全局指令
import directive from './directive'
//注册全局过滤器
import  filters from './filters';


import util from 'common/js/util';

router.beforeEach((to, from, next) => {
 if (to.path === '/login') {
   //clear cookie，store
   util.resetLogin();
 }
 else{
   //do something
   // 
 }
  NProgress.start();
  next()
})

router.afterEach(transition => {
  NProgress.done();
});

new Vue({
  el: '#app',
  template: '<App/>',
  router,
  store,
  components: { App }
}).$mount('#app')


//router.replace('/pages/home')

