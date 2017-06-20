import { getClassList,getClassDynamic } from '../../api/class';
import * as types from '../mutation-types';

const state = {
	classList:[],
	dynamicList:[],
};
const getters = {
	classList: state => state.classList,
	dynamicList: state => state.dynamicList,
};
const actions = {
	getDynamicList({commit,state},para){
		state.listLoading = true
		getClassDynamic(para).then((value)=>{
			if(!value.length){
				value.push({content:'null'})
			}
			commit('getDynamicList',value)
			state.listLoading = false
		})
	},
	getClassList({commit,state},para){
		state.listLoading = true
		getClassList(para).then((value)=>{
			commit('getClassList',value)
			state.listLoading = false
		})
	},
};
const mutations = {
	getDynamicList(state,value){
		state.dynamicList=value
	},
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
