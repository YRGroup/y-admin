import studentAPI from '@/api/student'
import * as types from '../mutation-types'

const state = {
	studentList:[],
};
const getters = {
	studentList: state => state.studentList,
};
const actions = {
	getStudentList({commit,state},para){
		state.listLoading = true
		studentAPI.getStudentList(para).then((value)=>{
			if(!value.length){
				value.push({content:'null'})
			}
			commit('getStudentList',value)
			state.listLoading = false
		})
	},
};
const mutations = {
	getStudentList(state,value){
		state.studentList=value
	},
};
export default {
	state,
	getters,
	actions,
	mutations,
};
