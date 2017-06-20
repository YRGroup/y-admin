import axios from 'axios';

let base = 'http://api.test.com';

export const getClassDynamic = params => { return axios.get(`${base}/api/Class/GetDynamicList`, {params: params }).then(res => res.data.Content); };

export const getClassList = params => { return axios.get(`${base}/api/Class/GetClassList`, { params: params }).then(res => res.data.Content); };

