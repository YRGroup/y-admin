import postAPI from '@/api/post'
import classAPI from '@/api/class'
import * as types from '../mutation-types'

const state = {
	postList:[],
	homeworkList:[],
};
const getters = {
	postList: state => state.postList,
	homeworkList: state => state.homeworkList,
};
const actions = {
	getPostList({commit,state},para){
		state.listLoading = true
		postAPI.getPostList(para).then((value)=>{
			if(!value.length){
				value.push({content:'null'})
			}
			commit('getPostList',value)
			state.listLoading = false
		})
	},
	getHomeworkList({commit,state},para){
		state.listLoading = true
		classAPI.getClassHomework(para).then((value)=>{
			if(!value.length){
				value.push({content:'null'})
			}
			commit('getHomeworkList',value)
			state.listLoading = false
		})
	},
};
const mutations = {
	getPostList(state,value){
		state.postList=value
	},
	getHomeworkList(state,value){
		state.homeworkList=value
	},
};
export default {
	state,
	getters,
	actions,
	mutations,
};
