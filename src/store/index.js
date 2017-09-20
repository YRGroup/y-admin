import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions.js';
import mutations from './mutations.js';

import klass from './modules/class';
import user from './modules/user';
import teacher from './modules/teacher';
import student from './modules/student';
import parent from './modules/parent';
import server from './modules/server';
import sys from './modules/sys';


Vue.use(Vuex);

const state = {
};

export default new Vuex.Store({
	// mode: 'history',
	modules: {
		klass,
		user,
		teacher,
		student,
		parent,
		server,
		sys,
	},
	actions,
	mutations,
});
