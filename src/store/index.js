import Vue from 'vue';
import Vuex from 'vuex';
import table from './modules/table';
import actions from './actions.js';
import mutations from './mutations.js';

import klass from './modules/class';
import user from './modules/user';


Vue.use(Vuex);

const state = {

};

export default new Vuex.Store({
	// mode: 'history',
	modules: {
		table,
		klass,
		user,
	},
	actions,
	mutations,
});
