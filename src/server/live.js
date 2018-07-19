import axios from 'axios'
import _APIurl from './config'

let API = {}

// 新建直播间
API.addLiveRoom = () => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/LiveVideo/AddLiveRoom').then((res) => {
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}

// 获取单个直播间信息
API.getOneLiveRoom = (para) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/LiveVideo/GetOneLiveRoom',{ params: para}).then((res) => {
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}

// 获取直播间列表
API.getLiveRooms = () => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/LiveVideo/GetLiveRooms').then((res) => {
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}
// 编辑直播间信息
API.updateLiveRoom = (para) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl + '/api/LiveVideo/updateLiveRoom',para).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}
// 获取节目列表
API.getProgramList = (para) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/LiveVideo/getProgramList',{params:para}).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 获取直播评论列表
API.getCommentsList = (para) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/LiveVideo/getlist',{params:para}).then((res)=>{
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}
//删除评论
API.delComment = (para) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/LiveVideo/delete',{params:para}).then((res)=>{
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}
// 新增、编辑节目列表
API.updateProgramList = (para) => {
  return new Promise((resolve, reject) => {
    axios.post( _APIurl +'/api/LiveVideo/UpdateProgramList',para).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
    // axios.create({
    //   baseURL: _APIurl + '/api/LiveVideo/UpdateProgramList',
    //   headers: {'Content-Type': 'foobar'}
    // });

  })
}
// 删除单个节目
API.delProgram = (para) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/LiveVideo/DelProgram',{ params: para}).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}
//删除直播间   不提供
API.getProgramList = (para) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/LiveVideo/getProgramList',{params:para}).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export default API
