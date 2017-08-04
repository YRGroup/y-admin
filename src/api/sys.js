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

// 删除校园新闻评论
sysAPI.deleteNewsComment = params => {
  return axios.post(
    `${base}/api/School/DeleteComment`, params).then(res => res.data.Content)
}

export default sysAPI