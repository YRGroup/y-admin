import $API from '@/server/api'

const state = {
	classList:[],
};
const getters = {
	classList: state => state.classList,
};
const actions = {
	getClassList({commit,state},para){
		classAPI.getClassList(para).then(value=>{
			if(value.length===0){
				let a={
					cid:-1,Name:'当前没有班级',StudentCount:0,TeacherCount:0
				}
				let b=[]
				b.push(a)
				commit('getClassList',b)
			}else{
				commit('getClassList',value)
			}
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
