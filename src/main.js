// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css'

// import Mock from './mock';
// Mock.bootstrap();

import 'font-awesome/css/font-awesome.min.css';

Vue.use(ElementUI);
// Vue.use(Vuex);

Vue.config.productionTip = false

import md5 from 'js-md5'
import { Message } from 'element-ui';
import axios from 'axios'
axios.defaults.withCredentials=true
// request拦截器，计算签名
axios.interceptors.request.use(config => {    
    let now = new Date().getTime()
    // if(sessionStorage.getItem('Token')){
    //   const token = sessionStorage.getItem('Token')
    // }else{
    //   const token = store.state.user.token
    // }
    let token = sessionStorage.getItem('Token')
    let sigh = md5(token+now)
    config.headers.time = now
    config.headers.sign = sigh
    return config
}, err => {
    console.log('error')
    console.log(err)
    return Promise.reject(err)
});
// response拦截器，log信息
axios.interceptors.response.use(
  response => {
    console.log('axios to:'+response.config.url)
    console.log(response)
    return response
  },
  error => {
    console.log('Error：')
    console.log(error)
    Message({
      showClose: true,
      message: error.response.statusText,
      type: 'error',
      duration: 2 * 1000
    })
    // 401未登录时跳转到登陆
    if(error.response.status==401){
      Message({
        showClose: true,
        message: '身份认证失败，请重新登陆',
        type: 'error',
        duration: 2 * 1000
      })
      router.push('/login')
    }
    return Promise.reject(error)
  }
)
// Vue.prototype.$axios = axios

// API服务器地址，$server或者this.$server调用
import base from '@/api/config'
Vue.prototype.$server = base

// 分模块挂载API
import classAPI from '@/api/class'
Vue.prototype.$classAPI = classAPI
import postAPI from '@/api/post'
Vue.prototype.$postAPI = postAPI
import teacherAPI from '@/api/teacher'
Vue.prototype.$teacherAPI = teacherAPI
import studentAPI from '@/api/student'
Vue.prototype.$studentAPI = studentAPI
import parentAPI from '@/api/parent'
Vue.prototype.$parentAPI = parentAPI


router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }

  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' });
  } else {
    next();
  };
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
  // render: h => h(App)
});
