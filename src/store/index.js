import Vue from 'vue';
import Vuex from 'vuex';
import table from './modules/table';
import actions from './actions.js';
import mutations from './mutations.js';

import klass from './modules/class';
import post from './modules/post';
import user from './modules/user';
import teacher from './modules/teacher';


Vue.use(Vuex);

const state = {
	API_base_url:'http://api.test.com'
};

export default new Vuex.Store({
	// mode: 'history',
	modules: {
		table,
		klass,
		user,
		post,
		teacher,
	},
	actions,
	mutations,
});
