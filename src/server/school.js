import axios from 'axios'
import _APIurl from './config'

let API = {}

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
//发布通知
API.makeNotice = (para) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl + '/api/Notify/AddNotify',para).then((res) => {
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}
//获取通知
API.getNotice = (para) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/Notify/GetAll',{params:para}).then((res) => {
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}
//删除通知
API.deleNotice = (id) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl + '/api/Notify/DeleteNotify ',{id:id}).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}
export default API
