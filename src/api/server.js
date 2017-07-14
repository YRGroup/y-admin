import axios from 'axios';

import base from './config'

let serverAPI = {}

// 获取API
serverAPI.getAllUserList = params => { 
    return axios.get(
        `${base}/api/xxd/GetAllUser`,
        {params: params }
    ).then(res => res.data.Content)
}

export default serverAPI
