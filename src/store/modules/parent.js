import $API from '@/server/api'

const state = {
	parentList:[],
};
const getters = {
	parentList: state => state.parentList,
};
const actions = {
	getParentList({commit,state},para){
		parentAPI.getParentList(para).then((value)=>{
			if(!value.length){
				value.push({content:'null'})
			}
			commit('getParentList',value)
		})
	},
};
const mutations = {
	getParentList(state,value){
		state.parentList=value
	},
};
export default {
	state,
	getters,
	actions,
	mutations,
};
