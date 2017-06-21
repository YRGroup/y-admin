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
axios.interceptors.response.use(
  response => {
    console.log('axios to:'+response.config.url)
    console.log(response)
    return response
  },
  error => {
    console.log('发生错误：')
    console.log(error)
    Message({
      showClose: true,
      message: error.response.statusText,
      type: 'error',
      duration: 2 * 1000
    })
    if(error.response.status==401){
      router.push('/login')
    }
    return Promise.reject(error)
  }
)
Vue.prototype.$axios = axios

import classAPI from '@/api/class'
Vue.prototype.$classAPI = classAPI

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
