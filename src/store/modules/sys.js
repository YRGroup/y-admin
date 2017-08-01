import * as types from '../mutation-types';
import sysAPI from '@/api/sys'

const state = {
	allNewsList:[],
	currentEditData:{},
};
const getters = {
	allNewsList:state => state.allNewsList,
	currentEditData:state => state.currentEditData,
};
const actions = {
	getNewsList({commit,state},para){
		state.listLoading = true
		sysAPI.getNewsList(para).then((value)=>{
			if(!value.length){
				value.push({content:'null'})
			}
			commit('getNewsList',value)
			state.listLoading = false
		})
	}
};

const mutations = {
	getNewsList(state,value){
		state.allNewsList=value
	},
	currentEditData(state,value){
		state.currentEditData=value
	}
};
export default {
	state,
	getters,
	actions,
	mutations,
};
