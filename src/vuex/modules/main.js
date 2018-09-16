import axios from 'axios';
import _ from 'lodash';

const state = {
  user: {
    id: '',
    realname: '',
    nickname: '',
    following: [],
    follower: [],
  },
  searchToken: '',
  nicknameList: [],
  dropdown: false,
};

const mutations = {
  saveUserData(state, payload) {
    state.user.id = payload.id;
    state.user.realname = payload.realname;
    state.user.nickname = payload.nickname;
    state.user.following = payload.following;
    state.user.follower = payload.follower;
  },
  setSearchToken(state, payload) {
    state.searchToken = payload;
  },
  pushFollowingUser(state, payload) {
    state.user.following.push(payload);
  },
  clearNicknameList(state) {
    state.nicknameList = [];
  },
};

const getters = {
  getSearchToken(state) {
    return state.searchToken;
  },
  getUserId(state) {
    return state.user.id;
  },
  getUser(state) {
    return state.user;
  },
  getFollowing(state) {
    return state.user.following;
  },
  getNicknameList(state) {
    return state.nicknameList;
  },
  getDropdown(state) {
    return state.dropdown;
  }
};

const actions = {
  searchNicknameList() {
    (_.debounce(async function() {
      if(state.searchToken.length !== 0) {
        console.log(state.user.id);

        await axios.get(`/api/${state.user.id}/nickname-list/${state.searchToken}`, {
          params: {
            id: state.user.id,
            input: state.searchToken,
          },
        })
          .then((result) => {
            if(result.data.length !== 0) {
              state.nicknameList = _.cloneDeep(result.data);
              state.dropdown = true;
            } else {
              state.dropdwon = false;
            }
            // if(state.nicknameList.length !== 0) {
            //   for(let i = 0; i < state.user.following.length; i++) {
            //
            //   }
            //   // for(let i = 0; i < state.nicknameList.length; i++) {
            //   //   if(state.user.following[i] === state.nicknameList[i].id) {
            //   //     state.nicknameList[i].disable = true;
            //   //   } else {
            //   //     state.nicknameList[i].disable = false;
            //   //   }
            //   // }
            //   console.log('nicknameList is');
            //   console.log(state.nicknameList);
            //   state.dropdown = true;
            // } else {
            //   state.dropdown = false;
            // }
          })
          .catch((err) => {
            console.error(err);
            state.dropdown = false;
          })
      } else {
        state.dropdown = false;
      }
    }, 500))();
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
}
