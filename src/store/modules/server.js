import $API from '@/server/api'

const state = {
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
		}
		else{
			return ''
		}
    }
};
const actions = {
	getAllUserList({commit,state},para){
		$API.getAllUserList(para).then((value)=>{
			if(!value.length){
				value.push({content:'null'})
			}
			commit('getAllUserList',value)
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
