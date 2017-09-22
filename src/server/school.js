import axios from 'axios'
import _APIurl from './config'

let API = {}

// 获取年级列表
API.getGradeList = () => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/school/GetGrade').then((res) => {
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}

// 获取科目列表
API.getCourseList = () => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/school/GetCourseList').then((res) => {
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}

export default API
