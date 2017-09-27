import $API from '@/server/api'
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
		sysAPI.getNewsList(para).then((value)=>{
			if(!value.length){
				//value.push({content:'null'})
			}
			commit('getNewsList',value)
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
