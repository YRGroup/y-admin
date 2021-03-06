import axios from 'axios'
import _APIurl from './config'

let API = {}

// 获取班级信息
API.getClassInfo = (classId) => {
  return axios.get(_APIurl + '/api/Class/GetInfo?cid=' + classId).then(res => res.data.Content)
}
// testing

// 获取班级动态列表
API.getAllClassDynamic = (para) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/Class/GetDynamicList', {
      params: para
    }).then((res) => {
      resolve(res.data.Content)
    })
  })
}
// testing

// 获取班级作业列表
API.getHomeworkList = (para) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/Class/GetHomeworkList', {
      params: para
    }).then((res) => {
      resolve(res.data.Content)
    })
  })
}
// testing

// 获取单条班级作业
API.getHomework = (hid) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/Class/GetHomework', {
      params: {
        hid: hid,
      }
    }).then((res) => {
      resolve(res.data.Content)
    })
  })
}
// testing

// 发布新班级作业
API.addHomework = (data) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl + '/api/Class/AddHomework', data).then((res) => {
      resolve(res.data.Content)
    })
  })
}

// 删除班级作业
API.deleteHomework = (data) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl + '/api/Class/DeleteHomeWork', data).then((res) => {
      resolve(res.data.Content)
    })
  })
}

// 获取单条班级动态
API.getClassDynamic = (classId, msgId) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/Class/GetDynamic', {
      params: {
        cid: classId,
        did: msgId
      }
    }).then((res) => {
      resolve(res.data.Content)
    })
  })
}

// 匿名获取单条班级动态
API.getPostAnonymouse = (postId) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/Share/GetDynamic', {
      params: {
        en_id: postId
      }
    }).then((res) => {
      resolve(res.data.Content)
    })
  })
}


// 添加班级动态
API.postNewClassDynamic = (classDynamicData) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl + '/api/Class/AddDynamic', classDynamicData).then((res) => {
      resolve(res)
    })
  })
}
// testing


// 添加班级动态评论
API.postNewComment = (replyData) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl + '/api/Class/AddComment', replyData).then((res) => {
      if (res.data.Status === 1) {
        resolve(res)
      } else {
        let error = {}
        error.status = res.data.Status
        error.msg = res.data.Msg
        reject(error)
      }
    })
  })
}
// testing

// 点赞班级动态
API.doLikeThisPost = (classDynamicId) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/Class/Zan?did=' + classDynamicId).then((res) => {
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}
// testing

// 获取班级点赞列表
API.postLikedList = (classDynamicId) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/Class/GetZan?did=' + classDynamicId).then((res) => {
      resolve(res.data.Content)
    })
  })
}
// testing


// 获取班级的教师列表
API.getTeacherList = (classId) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/Class/GetTeacherList?cid=' + classId).then((res) => {
      resolve(res.data.Content)
    })
  })
}
// testing

// 获取班级的学生列表
API.getStudentList = (classId) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/Class/GetStudentList?cid=' + classId).then((res) => {
      resolve(res.data.Content)
    })
  })
}

// testing

// 获取班级的家长列表
API.getParentList = (classId) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/Class/GetParentList?cid=' + classId).then((res) => {
      resolve(res.data.Content)
    })
  })
}
// testing

// 添加班级学生
API.addClassStudent = (data) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl + '/api/Class/AddStudent', data).then((res) => {
      if (res.data.Status === 1) {
        resolve(res.data.Content)
      } else {
        reject(res)
      }
    })
  })
}
// testing

// 添加班级老师
API.addClassTeacher = (data) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl + '/api/Class/AddTeacher', data).then((res) => {
      if (res.data.Status === 1) {
        resolve(res.data.Content)
      } else {
        reject(res.data.Msg)
      }
    })
  })
}

// 获取班级列表
API.getClassList = (data) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/Class/GetClassList?schoolYear='+data).then((res) => {
      resolve(res.data.Content)
    })
  })
}

// 获取年级列表
API.getGradeList = () => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/school/GetGrade').then((res) => {
      resolve(res.data.Content)
    })
  })
}


export default API
