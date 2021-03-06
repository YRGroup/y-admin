import $API from '@/server/api'

const state = {
  gradeList: [],
  classList: [],
  postList: [],
  homeworkList: [],
  courseList: [],
  schoolYear:null,
  classListPlus:[],
  schoolYearList:[]
};
const getters = {
  gradeList: state => state.gradeList,
  classList: state => state.classList,
  postList: state => state.postList,
  homeworkList: state => state.homeworkList,
  courseList: state => state.courseList,
  schoolYear:state => state.schoolYear,
  classListPlus:state=> {
    let arr=state.classList.concat();
    arr.unshift({cid:0,Name:'全部'})
    return arr
  },
  schoolYearList:state => state.schoolYearList,
};
const actions = {
  getGradeList({
    commit,
    state
  }, para) {
    $API.getGradeList(para).then(value => {
      if (value.length === 0) {
        let a = {
          cid: -1,
          Name: '当前没有年级',
          StudentCount: 0,
          TeacherCount: 0
        }
        let b = []
        b.push(a)
        commit('setGradeList', b)
      } else {
        commit('setGradeList', value)
      }
    })
  },
  getClassList({
    commit,
    state
  }) {
    $API.getClassList(state.schoolYear).then(value => {
      if (value.length === 0) {
        let a = {
          cid: -1,
          Name: '当前没有班级',
          StudentCount: 0,
          TeacherCount: 0
        }
        let b = []
        b.push(a)
        commit('setClassList', b)
      } else {
        commit('setClassList', value)
      }
    })
  },
  getPostList({
    commit,
    state
  }, para) {
    $API.getAllClassDynamic(para).then((value) => {
      if (!value.length) {
        value.push({
          content: 'null'
        })
      }
      commit('setPostList', value)
    })
  },
  getHomeworkList({
    commit,
    state
  }, para) {
    $API.getHomeworkList(para).then((value) => {
      if (!value) {
        value.push({
          content: 'null'
        })
      }
      commit('setHomeworkList', value)
    })
  },
  getCourseList({
    commit,
    state
  }, para) {
    $API.getCourseList(para).then((value) => {
      if (!value.length) {
        value.push({
          content: 'null'
        })
      }
      value.forEach(o => { o.FullScore = 100 })
      commit('setCourseList', value)
    })
  },
};
const mutations = {
  setGradeList(state, value) {
    state.gradeList = value
  },
  setClassList(state, value) {
    state.classList = value
  },
  setPostList(state, value) {
    state.postList = value
  },
  setHomeworkList(state, value) {
    state.homeworkList = value
  },
  setCourseList(state, value) {
    state.courseList = value
  },
  setSchoolYear(state,value){
    state.schoolYear=value
  },
  setSchoolYearList(state,value){
    state.schoolYearList=value
  }
};
export default {
  state,
  getters,
  actions,
  mutations,
};
