import * as types from '../mutation-types';
import serverAPI from '@/api/server'

const state = {
	APIurl:'http://api.test.com',
	allUserList:[],
};
const getters = {
	allUserList:state => state.allUserList,
	_APIurl: () => {
		if(window.location.host=='www.test.com'){
			return 'http://api.test.com'
		}else if(window.location.host=='admin.test.com'){
			return 'http://api.test.com'
		}else if(window.location.host=='pc.test.com'){
			return 'http://api.test.com'
		}else if(window.location.host=='testapi.zzflgs.cn'){
			return 'http://testapi.zzflgs.cn'
		}else{
			return 'http://testapi.zzflgs.cn'
		}
    }
};
const actions = {
	getAllUserList({commit,state},para){
		state.listLoading = true
		serverAPI.getAllUserList(para).then((value)=>{
			if(!value.length){
				value.push({content:'null'})
			}
			commit('getAllUserList',value)
			state.listLoading = false
		})
	}
};

const mutations = {
	getAllUserList(state,value){
		state.allUserList=value
	},
};
export default {
	state,
	getters,
	actions,
	mutations,
};