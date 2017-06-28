import axios from 'axios';

import base from './config'

let teacherAPI = {}

// 获取教师列表
teacherAPI.getTeacherList = params => { 
    return axios.get(
        `${base}/api/Class/GetTeacherList`,
        {params: params }
    ).then(res => res.data.Content)
}

// 获取教师详细信息
teacherAPI.getTeacherInfo = params => { 
    return axios.get(
        `${base}/api/Teacher/GetInfo`,
        {params: params }
    ).then(res => res.data.Content)
}

// 获取教师发布的动态
teacherAPI.getTeacherPost = params => { 
    return axios.get(
        `${base}/api/Teacher/GetDynamicList`,
        {params: params }
    ).then(res => res.data.Content)
}

// 修改教师资料
teacherAPI.editTeacher = params => { 
    return axios.post(
        `${base}/api/Teacher/ModifyInfo`,
        params
    ).then(res => res.data.Content)
}

// 删除教师
teacherAPI.deleteTeacher = params => { 
    return axios.post(
        `${base}/api/Teacher/DeleteDynamic`,
        params
    ).then(res => res.data.Content)
}


export default teacherAPI
