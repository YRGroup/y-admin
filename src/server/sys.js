import axios from 'axios'
import _APIurl from './config'

let API = {}

// 获取班级所有信息
API.getAllClassInfo = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/Class?cid=' + id).then((res) => {
      resolve(res)
    })
  })
}
// not OK

// 获取Api地址
API.getApiUrl = (para) => {
  return new Promise((resolve, reject) => {
    axios.get('http://testapi.zzflgs.cn/api/config/GetApiUrl', {
      params: para
    }).then((res) => {
      resolve(res.data.Content.ApiUrl)
    })
  })
}
// not OK

// 上传图片
API.uploadImg = (files) => {
  return new Promise((resolve, reject) => {
    let params = new FormData()
    for (let i = 0; i < files.length; i++) {
      params.append('file', files[i])
    }
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    axios.post(_APIurl + '/api/Upload/ImageUpload', params, config).then((res) => {
      resolve(res.data.Content)
    })
  })
}

// 注册时获取短信验证码
API.getRegSms = (tel) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/user/SendRegSMS?phone=' + tel).then((res) => {
      if (res.data.Status == 1) {
        resolve(res.data.Content)
      } else {
        reject(res.data.Msg)
      }
    }).catch((err) => {
      console.log('获取信息失败：')
      console.log(err)
      reject(err)
    })
  })
}

// 修改密码时获取短信验证码
API.getSms = () => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/user/SendModifyPasswordSMS').then((res) => {
      if (res.data.Status == 1) {
        resolve(res.data.Content)
      } else {
        reject(res.data.Msg)
      }
    }).catch((err) => {
      console.log('获取信息失败：')
      console.log(err)
      reject(err)
    })
  })
}

// 根据短信验证码修改密码
API.editPWBySms = (data) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl + '/api/user/ModifyPassword', data).then((res) => {
      resolve(res.data.Content)
    }).catch((err) => {
      console.log('获取信息失败：')
      console.log(err)
      reject(err)
    })
  })
}

// 获取登陆验证码
API.getLoginSms = (tel) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/user/SendLoginSMS?phone=' + tel).then((res) => {
      resolve(res.data.Content)
    }).catch((err) => {
      console.log('获取信息失败：')
      console.log(err)
      reject(err)
    })
  })
}

// 班主任删除动态
API.deletePost = (params) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl + '/api/Class/DeleteDynamic', params).then((res) => {
      resolve(res.data.Content)
    }).catch((err) => {
      console.log('获取信息失败：')
      console.log(err)
      reject(err)
    })
  })
}

// 获取校园新闻
API.getNewsList = params => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + `/api/School/GetArticleList`, {
      params: params
    }).then(res => {
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}
//获取轮播图
API.getSwiperList = params => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + `/api/School/GetArticleList`, {
      params: params
    }).then(res => {
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}

// 获取单条新闻
API.getNewsInfo = params => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + `/api/School/GetArticle`, {
      params: params
    }).then(res => {
      resolve(res.data.Content)
    }).catch((err) => {
      console.log('获取信息失败：')
      console.log(err)
      reject(err)
    })
  })
}

// 添加新闻评论
API.addNewsComment = (params) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl + '/api/School/AddArticleComment', params).then((res) => {
      resolve(res.data.Content)
    }).catch((err) => {
      console.log('获取信息失败：')
      console.log(err)
      reject(err)
    })
  })
}

// 添加老师账号
API.addTeacher = (params) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl + '/api/User/AddTeacher', params).then((res) => {
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}

// 添加学生账号
API.addStudentAccount = (params) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl + '/api/User/AddStudent', params).then((res) => {
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}

// 查询所有用户
API.getAllUserList = (params) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/Admin/GetUserList', {
      params: params
    }).then((res) => {
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}

// 获取微信二维码
API.getWXQRcode = () => {
  return _APIurl + '/api/school/WeiXinQRCode'
}

// 服务端统计
API.refreshLiveness = () => {
  return axios.get(_APIurl + '/api/User/SaveUserLiveness')
}

// 查询所有管理员
API.getAdminList = (params) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/admin/GetAdminList', {
      params: params
    }).then((res) => {
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}

// 更新或添加管理员
API.updateAdminUser = (params) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl + '/api/admin/UpdateAdminUser', params).then((res) => {
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}

// 删除管理员
API.deleteAdminUser = (params) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl + '/api/admin/DeleteAdminUser', params).then((res) => {
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}

// 查询权限列表
API.getPermissionList = (params) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/admin/getPermissionType', {
      params: params
    }).then((res) => {
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}
// 查询权限列表
API.getNoteList = (params) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/school/getsmsloglist', {
      params: params
    }).then((res) => {
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}

// 空API模板
API.test = () => {
  return new Promise((resolve, reject) => {
    console.log('测试：')
    console.log(this)
  })
}
// testing

export default API
