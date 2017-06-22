import classAPI from '../../api/class'
import * as types from '../mutation-types'

const state = {
	classList:[],
};
const getters = {
	classList: state => state.classList,
};
const actions = {
	getClassList({commit,state},para){
		state.listLoading = true
		classAPI.getClassList(para).then((value)=>{
			commit('getClassList',value)
			state.listLoading = false
		})
	},
};
const mutations = {
	getClassList(state,value){
		state.classList=value
	},
};
export default {
	state,
	getters,
	actions,
	mutations,
};
