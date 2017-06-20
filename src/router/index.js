import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/Login.vue';
import NotFound from '../views/404.vue';
import Home from '../views/Home.vue';

import Edit from '../views/component/Edit.vue';
import Add from '../views/component/Add.vue';
import List from '../views/component/List.vue';
import Echarts from '../views/component/Echarts.vue'

import classMain from '../views/class/main';
import classList from '../views/class/list';
import classDynamicList from '../views/class/dynamicList';

import teacherMain from '../views/teacher/main';
import teacherList from '../views/teacher/list';

import studentMain from '../views/student/main';
import studentList from '../views/student/list';

import parentMain from '../views/parent/main';
import parentList from '../views/parent/list';


Vue.use(Router);

let routes = [
  {
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
    path: '/class',
    component: Home,
    name: '班级',
    iconCls: 'el-icon-message',
    children: [
      { path: 'main', component: classMain, name: '班级管理主页' },
      { path: 'list', component: classList, name: '班级列表' },
      { path: 'dynamicList', component: classDynamicList, name: '班级动态' },      
      { path: 'edit', component: Edit, name: '编辑班级' },
      { path: 'add', component: Add, name: '添加班级' },
    ],
  },
  {
      path: '/teacher',
      component: Home,
      name: '教师',
      iconCls: 'fa fa-id-card-o',
      children: [
          { path: 'main', component: List, name: '教师管理主页' },      
          { path: 'list', component: teacherList, name: '教师列表' },      
          { path: 'edit', component: Edit, name: '编辑教师' },
          { path: 'add', component: Add, name: '添加教师' },
      ]
  },
  {
      path: '/student',
      component: Home,
      name: '学生',
      iconCls: 'fa fa-id-card-o',
      children: [
          { path: 'main', component: studentMain, name: '学生管理主页' },      
          { path: 'list', component: studentList, name: '查询学生' },      
          { path: 'edit', component: Edit, name: '编辑学生' },
          { path: 'add', component: Add, name: '添加学生' },
      ]
  },
  {
      path: '/parent',
      component: Home,
      name: '家长',
      iconCls: 'fa fa-id-card-o',
      children: [
          { path: 'main', component: parentMain, name: '家长管理主页' },      
          { path: 'list', component: parentList, name: '查询家长' },      
          { path: 'edit', component: Edit, name: '编辑家长' },
          { path: 'add', component: Add, name: '添加家长' },
      ]
  },
  {
      path: '/school',
      component: Home,
      name: '',
      iconCls: 'fa fa-address-card',
      leaf: true,//只有一个节点
      children: [
          { path: '/page6', component: Edit, name: '学校管理' }
      ]
  },
  {
      path: '/system',
      component: Home,
      name: '',
      iconCls: 'fa fa-address-card',
      leaf: true,//只有一个节点
      children: [
          { path: '/page6', component: Edit, name: '系统管理' }
      ]
  },
  {
    path: '/dev',
    component: Home,
    name: 'dev',
    iconCls: 'fa fa-bar-chart',
    children: [
      { path: 'echarts', component: Echarts, name: '图表' },
      { path: 'edit', component: Edit, name: '编辑' },
      { path: 'add', component: Add, name: '添加' },
      { path: 'list', component: List, name: '查询' },
    ]
  },
  // {
  //     path: '*',
  //     hidden: true,
  //     redirect: { path: '/404' }
  // }
];

export default new Router({
	routes,
});
