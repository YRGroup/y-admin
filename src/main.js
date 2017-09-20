// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.min.css';
import md5 from 'js-md5'
import { Message } from 'element-ui';
import axios from 'axios'

import API from '@/server/api'
Vue.prototype.$API = API

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
import serverAPI from '@/api/server'
Vue.prototype.$serverAPI = serverAPI
import sysAPI from '@/api/sys'
Vue.prototype.$sysAPI = sysAPI

Vue.use(ElementUI);

Vue.config.productionTip = false

// 日期格式化
Date.prototype.Format = function (fmt) { //author: meizz 
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

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
    if(response.data.Status==0){
        let err = {}
        err.code=response.data.Status
        err.msg=response.data.Msg
        return Promise.reject(err)
    }else{
        return response
    }
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
