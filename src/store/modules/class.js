import $API from '@/server/api'

const state = {
  classList: [],
  postList: [],
  homeworkList: [],
};
const getters = {
  classList: state => state.classList,
  postList: state => state.postList,
  homeworkList: state => state.homeworkList,
};
const actions = {
  getClassList({
    commit,
    state
  }, para) {
    $API.getClassList(para).then(value => {
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
    $API.getAllClassDynamic(para).then((value) => {
      if (!value.length) {
        value.push({
          content: 'null'
        })
      }
      commit('setHomeworkList', value)
    })
  },
};
const mutations = {
  setClassList(state, value) {
    state.classList = value
  },
  setPostList(state, value) {
    state.postList = value
  },
  setHomeworkList(state, value) {
    state.homeworkList = value
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
