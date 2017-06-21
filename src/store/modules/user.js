import { login } from '../../api/user';
import * as types from '../mutation-types';

const state = {
	token:'null',
};
const getters = {
	token:state=>state.token,
};
const actions = {
	login({commit,state},para){
		login(para).then((res)=>{
			commit('setToken',res.Content.Token)
		})
	}
};

const mutations = {
	setToken(state,value){
		state.token=value
	},
};
export default {
	state,
	getters,
	actions,
	mutations,
};
