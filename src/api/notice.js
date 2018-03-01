import axios from 'axios';

import base from './config'

let API = {}

// 指定班级班主任
API.makeNotice = params => { 
  return axios.post(
      `${base}/api/Notify/AddNotify`,
      params
  ).then(res => res.data.Content)
}

export default API
