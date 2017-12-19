import $API from '@/server/api'

const state = {
  allUserList: [],
  total:1,
  adminList: [],
  permissionList: [],
};
const getters = {
  allUserList: state => state.allUserList,
  total: state=>state.total,
  adminList: state => state.adminList,
  permissionList: state => state.permissionList,
  _APIurl: () => {
    return ''
  }
};
const actions = {
  getAllUserList({
    commit,
    state
  }, para) {
    $API.getAllUserList(para).then((value) => {
      if (!value.Total) {
        value.ModelList.push({
          content: 'null'
        })
        value.ModelList=[];
      }
      commit('setAllUserList', value)
    })
  },
  getAdminList({
    commit,
    state
  }, para) {
    $API.getAdminList(para).then((value) => {
      if (!value.length) {
        value.push({
          content: 'null'
        })
      }
      let newValue = value.map(o => {
        return {
          Meid: o.User.Meid,
          TrueName: o.User.TrueName,
          Mobilephone: o.User.Mobilephone,
          UserType: o.Role.UserType,
          Grades: o.Role.Grades,
          Permissions: o.Role.Roles,
        }
      })
      commit('setAdminList', newValue)
    })
  },
  getPermissionList({
    commit,
    state
  }, para) {
    $API.getPermissionList(para).then((value) => {
      if (!value.length) {
        value.push({
          content: 'null'
        })
      }
      commit('setPermissionList', value)
    })
  },
};

const mutations = {
  setAllUserList(state, value) {
    state.allUserList = value.ModelList
    state.total=value.Total
  },

  setAdminList(state, value) {
    state.adminList = value
  },
  setPermissionList(state, value) {
    state.permissionList = value
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
