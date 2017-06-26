import teacherAPI from '@/api/teacher'
import * as types from '../mutation-types'

const state = {
	teacherList:[],
};
const getters = {
	teacherList: state => state.teacherList,
};
const actions = {
	getTeacherList({commit,state},para){
		state.listLoading = true
		teacherAPI.getTeacherList(para).then((value)=>{
			if(!value.length){
				value.push({content:'null'})
			}
			commit('getTeacherList',value)
			state.listLoading = false
		})
	},
};
const mutations = {
	getTeacherList(state,value){
		state.teacherList=value
	},
};
export default {
	state,
	getters,
	actions,
	mutations,
};
