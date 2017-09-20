import axios from 'axios';

import base from './config'

let examAPI = {}

// 指定班级班主任
classAPI.setClassAdminTeacher = params => { 
  return axios.post(
      `${base}/api/Class/SetAdviserTeacher`,
      params
  ).then(res => res.data.Content)
}



export default examAPI
