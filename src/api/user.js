import axios from 'axios';

import base from './config'

export const login = params => { 
    document.cookie = "meid=aa;path=/;domain="+document.domain.match(/[^\.]+\.[^\.]+$/)[0]+";expires=" +new Date(2011,1,1).toGMTString()
    return axios.post(
        `${base}/api/User/LoginByPhone`, params,{
        headers:{  }
    }).then(res => res.data)
}

export const register = params => { 
    return axios.get(
        `${base}/api/Class/GetInfo`, { params: params }
    ).then(res => res.data.Content)
}

export const deleteUser = params => { 
    return axios.get(
        `${base}/api/user/delete`, { params: params }
    ).then(res => res.data.Content)
}

