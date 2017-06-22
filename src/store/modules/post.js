import postAPI from '@/api/post'
import * as types from '../mutation-types'

const state = {
	postList:[],
};
const getters = {
	postList: state => state.postList,
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
};
const mutations = {
	getPostList(state,value){
		state.postList=value
	},
};
export default {
	state,
	getters,
	actions,
	mutations,
};
