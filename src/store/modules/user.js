import $API from '@/server/api'

const state = {
  user: null,
	token:'null',
};
const getters = {
	token:state=>state.token,
};
const actions = {
	// login({commit,state},para){
	// 	login(para).then((res)=>{
	// 		commit('setToken',res.Content.Token)
	// 	})
	// }
};

const mutations = {
	setToken(state,value){
		state.token=value
	},
	login(state,value){
		state.user=value
	},
};
export default {
	state,
	getters,
	actions,
	mutations,
};
