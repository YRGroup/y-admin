import $API from '@/server/api'

const state = {
  user: null,
  token: null,
};
const getters = {
  token: state => state.token,
  roleList:state=> state.user?state.user.AdminRole.Roles:''

};
const actions = {
  login({
    commit,
    state
  }, para) {
    return new Promise((resolve, reject) => {
      $API.adminLogin(para).then((res) => {
        console.log(res)
        commit('setToken', res.Token)
        commit('setUser', res)
        sessionStorage.setItem('Token', res.Token)
        sessionStorage.setItem('user', JSON.stringify(res))
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
};

const mutations = {
  setToken(state, value) {
    state.token = value
  },
  setUser(state, value) {
    state.user = value
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
