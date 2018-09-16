// store.js
import Vue from 'vue';
import Vuex from 'vuex';

import join from './modules/join';
import login from './modules/login';
import main from './modules/main';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    join,
    login,
    main,
  },
});

