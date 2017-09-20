import $API from '@/server/api'

const state = {
	teacherList:[],
};
const getters = {
	teacherList: state => state.teacherList,
};
const actions = {
	getTeacherList({commit,state},para){
		teacherAPI.getTeacherList(para).then((value)=>{
			if(!value.length){
				value.push({content:'null'})
			}
			commit('getTeacherList',value)
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
