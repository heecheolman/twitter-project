// store.js
import Vue from 'vue';
import Vuex from 'vuex';

// import actions from './actions';
// import mutations from './mutations';
import join from './modules/join';
import login from './modules/login';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    join,
    login,
  },
});

