import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/Login.vue';
import NotFound from '../views/404.vue';
import Home from '../views/Home.vue';

import Edit from '../component/Edit.vue';
import Add from '../component/Add.vue';
import List from '../component/List.vue';
import Echarts from '../component/Echarts.vue'

import main from '../views/main/main';

import newsList from '../views/sys/newsList';
import swiperList from '../views/sys/swiperList';

import classMain from '../views/class/main';
import classList from '../views/class/list';
import classInfo from '../views/class/info';

import postMain from '../views/post/main';
import homework from '../views/post/homework';
import postList from '../views/post/list';

import teacherMain from '../views/teacher/main';
import teacherList from '../views/teacher/list';
import teacherInfo from '../views/teacher/info';

import studentMain from '../views/student/main';
import studentList from '../views/student/list';
import studentInfo from '../views/student/info';

import parentMain from '../views/parent/main';
import parentList from '../views/parent/list';
import parentInfo from '../views/parent/info';

import newExam from '../views/exam/add';
import examInfo from '../views/exam/exam';
import examList from '../views/exam/list';
import examChart from '../views/exam/chart';

import userList from '../views/sys/list';

Vue.use(Router);

let routes = [{
    path: '/login',
    component: Login,
    name: '登录',
    hidden: true,
  },
  {
    path: '/404',
    component: NotFound,
    name: '出错啦',
    hidden: true,
  },
  {
    path: '/',
    component: Home,
    iconCls: 'fa fa-home',
    leaf: true,
    children: [{
      path: '/',
      component: main,
      name: '主页'
    }]
  },
  {
    path: '/class',
    component: Home,
    iconCls: 'fa fa-bank',
    leaf: true,
    children: [{
      path: '/class/list',
      component: classList,
      name: '班级列表'
    }, ],
  },
  {
    path: '/news',
    component: Home,
    name: '全局内容',
    iconCls: 'fa fa-id-card-o',
    children: [{
        path: '/news/newsList',
        component: newsList,
        name: '新闻'
      },
      {
        path: '/news/swiperList',
        component: swiperList,
        name: '轮播图'
      },
    ],
  },
  {
    path: '/post',
    component: Home,
    name: '班级内容',
    iconCls: 'el-icon-picture',
    children: [{
      path: '/post/list',
      component: postList,
      name: '动态'
    }, {
      path: '/post/homework',
      component: homework,
      name: '作业'
    }],
  },
  {
    path: '/exam',
    component: Home,
    name: '考试',
    iconCls: 'fa fa-id-card-o',
    children: [{
        path: '/exam/list',
        component: examList,
        name: '考试列表'
      }, {
        path: '/exam/add',
        component: newExam,
        name: '添加考试'
      },
      {
        path: '/exam/info',
        component: examInfo,
        hidden: true,
        name: '考试详情'
      },
      {
        path: '/exam/chart',
        component: examChart,
        hidden: true,
        name: '考试报表'
      },
    ]
  },
  {
    path: '/alluser',
    component: Home,
    name: '',
    iconCls: 'fa fa-users',
    leaf: true, //只有一个节点
    children: [{
      path: '/alluser',
      component: userList,
      name: '所有用户'
    }]
  },
  {
    path: '/teacher',
    component: Home,
    name: '教师',
    hidden: true,
    iconCls: 'fa fa-id-card-o',
    children: [
      //   { path: '/teacher/main', component: List, name: '教师管理主页' },      
      {
        path: '/teacher/list',
        component: teacherList,
        name: '教师列表'
      },
      {
        path: '/teacher/info',
        component: teacherInfo,
        name: '教师详情'
      },
    ]
  },
  {
    path: '/student',
    component: Home,
    name: '学生',
    hidden: true,
    iconCls: 'fa fa-id-card-o',
    children: [{
        path: '/student/list',
        component: studentList,
        name: '学生列表'
      },
      {
        path: '/student/info',
        component: studentInfo,
        name: '学生详情'
      },
    ]
  },
  {
    path: '/parent',
    component: Home,
    name: '家长',
    hidden: true,
    iconCls: 'fa fa-id-card-o',
    children: [{
        path: '/parent/list',
        component: parentList,
        name: '家长列表'
      },
      {
        path: '/parent/info',
        component: parentInfo,
        name: '家长详情'
      },
    ]
  },


  //   {
  //       path: '/school',
  //       component: Home,
  //       name: '',
  //       iconCls: 'fa fa-address-card',
  //       leaf: true,//只有一个节点
  //       children: [
  //           { path: '/school', component: Edit, name: '学校管理' }
  //       ]
  //   },
  //   {
  //       path: '/system',
  //       component: Home,
  //       name: '',
  //       iconCls: 'fa fa-address-card',
  //       leaf: true,//只有一个节点
  //       children: [
  //           { path: '/system', component: Edit, name: '系统管理' }
  //       ]
  //   },
  // {
  //   path: '/dev',
  //   component: Home,
  //   name: 'dev',
  //   iconCls: 'fa fa-bar-chart',
  //   children: [{
  //       path: '/dev/echarts',
  //       component: Echarts,
  //       name: '图表'
  //     },
  //     {
  //       path: '/dev/edit',
  //       component: Edit,
  //       name: '编辑'
  //     },
  //     {
  //       path: '/dev/add',
  //       component: Add,
  //       name: '添加'
  //     },
  //     {
  //       path: '/dev/list',
  //       component: List,
  //       name: '查询'
  //     },
  //   ]
  // },
  {
    path: '*',
    hidden: true,
    redirect: {
      path: '/404'
    }
  }
];

export default new Router({
  routes,
});
