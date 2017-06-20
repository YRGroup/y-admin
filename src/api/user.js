import axios from 'axios';

let base = 'http://api.test.com';

export const login = params => { return axios.post(`${base}/api/User/LoginByPhone`, params).then(res => res.data); };

export const register = params => { return axios.get(`${base}/api/Class/GetInfo`, { params: params }).then(res => res.data.Content); };

