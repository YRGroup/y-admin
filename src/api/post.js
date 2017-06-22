import axios from 'axios';

let base = 'http://api.test.com';

let postAPI = {}

// 获取动态
postAPI.getPostList = params => { 
    return axios.get(
        `${base}/api/Class/GetDynamicList`,
        {params: params }
    ).then(res => res.data.Content)
}

// 添加动态
postAPI.addPost = params => { 
    return axios.post(
        `${base}/api/Class/AddDynamic`,
        params
    ).then(res => res.data.Content)
}

// 修改动态
postAPI.editPost = params => { 
    return axios.post(
        `${base}/api/Class/AddDynamic`,
        params
    ).then(res => res.data.Content)
}

// 删除动态
postAPI.deletePost = params => { 
    return axios.post(
        `${base}/api/Class/DeleteDynamic`,
        params
    ).then(res => res.data.Content)
}

// 删除动态
postAPI.deleteComment = params => { 
    return axios.post(
        `${base}/api/Class/DeleteComment`,
        params
    ).then(res => res.data.Content)
}

export default postAPI
