import axios from 'axios';

import base from './config'

let studentAPI = {}

// 获取学生列表
studentAPI.getStudentList = params => { 
    return axios.get(
        `${base}/api/Class/GetStudentList`,
        {params: params }
    ).then(res => res.data.Content)
}

// 获取学生详细信息
studentAPI.getStudentInfo = params => { 
    return axios.get(
        `${base}/api/Student/GetInfo`,
        {params: params }
    ).then(res => res.data.Content)
}


// 修改学生资料
studentAPI.editStudent = params => { 
    return axios.post(
        `${base}/api/Student/ModifyInfo`,
        params
    ).then(res => res.data.Content)
}

// 删除学生
studentAPI.deleteStudent = params => { 
    return axios.post(
        `${base}/api/User/Delete`,
        params
    ).then(res => res.data.Content)
}


export default studentAPI
