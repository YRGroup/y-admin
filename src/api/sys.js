import axios from 'axios';

import base from './config'

let sysAPI = {}

// 获取校园新闻
sysAPI.getNewsList = params => {
  return axios.get(
    `${base}/api/School/GetArticleList`, {
      params: params
    }
  ).then(res => res.data.Content)
}

// 添加校园新闻
sysAPI.addNews = params => {
  return axios.post(
    `${base}/api/School/ModifyOrAddArticle`, params).then(res => res.data.Content)
}

// 添加公众号文章
sysAPI.addWXnews = params => {
  return axios.post(
    `${base}/api/school/ImportWeiXinArticle`, params).then(res => res.data.Content)
}

// 添加校园新闻
sysAPI.fileUpLoad = params => {
  return axios.post(
    `${base}/api/Upload/FileUpload`, params).then(res => res.data.Content)
}

// 删除校园新闻
sysAPI.deleteNews = params => {
  return axios.post(
    `${base}/api/School/DeleteArticle`, params).then(res => res.data.Content)
}
sysAPI.unDeleteNews = params => {
  return axios.post(
    `${base}/api/School/UnDeleteArticle`, params).then(res => res.data.Content)
}

// 删除校园新闻评论
sysAPI.deleteNewsComment = params => {
  return axios.post(
    `${base}/api/School/DeleteComment`, params).then(res => res.data.Content)
}

sysAPI.deleteUser = params => {
  return axios.get(
    `${base}/api/user/delete`, {
      params: params
    }
  ).then(res => res.data.Content)
}

sysAPI.addTeacherAccount = params => {
  return axios.post(
    `${base}/api/user/AddTeacher`, params
  ).then(res => res.data.Content)
}

sysAPI.addStudentAccount = params => {
  return axios.post(
    `${base}/api/user/AddStudent`, params
  ).then(res => res.data.Content)
}

sysAPI.addAdminAccount = params => {
  return axios.post(
    `${base}/api/user/AddStudent`, params
  ).then(res => res.data.Content)
}

// 获取统计数据
sysAPI.getChartData = params => {
  return axios.get(`${base}/api/School/GetChartData`).then(res => res.data.Content)
}

//获取短信统计列表
sysAPI.getNoteList = params => {
  return axios.get(`${base}/api/school/getsmsloglist`).then(res => res.data.Content)

}
// 重置密码
sysAPI.resetPassword = params => {
  return axios.post(
    `${base}/api/user/ResetPassword`, params
  ).then(res => res.data.Content)
}

export default sysAPI
