import axios from 'axios';

let base = 'http://api.test.com';

let classAPI = {}



// 获取作业
classAPI.getClassHomework = params => { 
    return axios.get(
        `${base}/api/Class/GetHomeworkList`,
        {params: params }
    ).then(res => res.data.Content)
}

// 添加作业
classAPI.addClassHomework = params => { 
    return axios.post(
        `${base}/api/Class/AddHomework`,
        params
    ).then(res => res.data.Content)
}

// 修改作业
classAPI.editClassHomework = params => { 
    return axios.post(
        `${base}/api/Class/AddHomework`,
        params
    ).then(res => res.data.Content)
}

// 删除作业
classAPI.deleteClassHomework = params => { 
    return axios.get(
        `${base}/api/Class/AddHomework`,
        {params: params }
    ).then(res => res.data.Content)
}




// 获取班级列表
classAPI.getClassList = params => { 
    return axios.get(
        `${base}/api/Class/GetClassList`,
        { params: params }
    ).then(res => res.data.Content)
}

// 获取班级信息
classAPI.getClassInfo = params => { 
    return axios.get(
        `${base}/api/Class/GetInfo`,
        { params: params }
    ).then(res => res.data.Content)
}

// 添加班级
classAPI.editClassInfo = params => { 
    return axios.post(
        `${base}/api/Class/ModifyInfo`,
        params
    ).then(res => res.data.Content)
}

// 修改班级信息
classAPI.editClassInfo = params => { 
    return axios.post(
        `${base}/api/Class/ModifyInfo`,
        params
    ).then(res => res.data.Content)
}

// 删除班级
classAPI.deleteClass = params => { 
    return axios.post(
        `${base}/api/Class/delete`,
        params
    ).then(res => res.data.Content)
}



export default classAPI
