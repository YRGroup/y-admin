import $API from '@/server/api'

const state = {
	studentList:[],
};
const getters = {
	studentList: state => state.studentList,
};
const actions = {
	getStudentList({commit,state},para){
		studentAPI.getStudentList(para).then((value)=>{
			if(!value.length){
				value.push({content:'null'})
			}
			commit('getStudentList',value)
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
