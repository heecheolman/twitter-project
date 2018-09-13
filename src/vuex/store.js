// store.js
import Vue from 'vue';
import Vuex from 'vuex';

// import actions from './actions';
// import mutations from './mutations';

Vue.use(Vuex);

export const store = new Vuex.Store({
  // data
  // actions,
  // mutations,
  actions: {

  },
  mutations: {
    setName(state, payload) {
      state.join.name = payload;
    },
    setNickname(state, payload) {
      state.join.nickname = payload;
    },
    setPhone(state, payload) {
      state.join.phone = payload;
    },
    setPassword(state, payload) {
      state.join.password = payload;
    },
    setPasswordCheck(state, payload) {
      state.join.passwordCheck = payload;
    },
    setValidPassword(state, payload) {
      state.join.validPassword = payload;
    },
  },
  getters: {
    getName(state) {
      return state.join.name;
    },
    getNickname(state) {
      return state.join.nickname;
    },
    getPhone(state) {
      return state.join.phone;
    },
    getPasswordTest(state) {
      const isPassword = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
      return isPassword.test(state.join.password) && isPassword.test(state.join.passwordCheck);
    },
    getIsPasswordSame(state) {
      return state.join.password === state.join.passwordCheck;
    },
    getValidPassword(state) {
      return state.join.validPassword;
    }
  },
  state: {
    join: {
      name: '',
      nickname: '',
      phone: '',
      password: '',
      passwordCheck: '',
      validPassword: false,
    }
  },
});

