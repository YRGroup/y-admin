import classAPI from'./class'
import contactAPI from'./contact'
import examAPI from'./exam'
import studentAPI from'./student'
import sysAPI from'./sys'
import teacherAPI from'./teacher'
import userAPI from'./user'
import videoAPI from'./video'
import schoolAPI from'./school'
let API = Object.assign(sysAPI,userAPI,classAPI,contactAPI,studentAPI,teacherAPI,examAPI,videoAPI,schoolAPI)

export default API