import parentAPI from '@/api/parent'
import * as types from '../mutation-types'

const state = {
	parentList:[],
};
const getters = {
	parentList: state => state.parentList,
};
const actions = {
	getParentList({commit,state},para){
		state.listLoading = true
		parentAPI.getParentList(para).then((value)=>{
			if(!value.length){
				value.push({content:'null'})
			}
			commit('getParentList',value)
			state.listLoading = false
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
