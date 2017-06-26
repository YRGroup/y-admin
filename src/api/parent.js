import axios from 'axios';

let base = 'http://api.test.com';

let parentAPI = {}

// 获取家长列表
parentAPI.getParentList = params => { 
    return axios.get(
        `${base}/api/Class/GetParentList`,
        {params: params }
    ).then(res => res.data.Content)
}

// 获取家长详细信息
parentAPI.getParentInfo = params => { 
    return axios.get(
        `${base}/api/Parent/GetInfo`,
        {params: params }
    ).then(res => res.data.Content)
}


// 修改家长资料
parentAPI.editParent = params => { 
    return axios.post(
        `${base}/api/Parent/ModifyInfo`,
        params
    ).then(res => res.data.Content)
}

// 删除家长
parentAPI.deleteParent = params => { 
    return axios.post(
        `${base}/api/User/Delete`,
        params
    ).then(res => res.data.Content)
}


export default parentAPI
