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
  nicknameForFollow: '',
  idForFollow: null,
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
  setNicknameForFollow(state, payload) {
    state.nicknameForFollow = payload;
  },
};

const getters = {
  getSearchToken: state => state.searchToken,
  getUserId: state => state.user.id,
  getUser: state => state.user,
  getFollowing: state => state.user.following,
  getNicknameList: state => state.nicknameList,
};

const actions = {
  searchNicknameList() {
    (_.debounce(function() {
      if(state.searchToken.length !== 0) {
        api.searchNicknameList();
      }
    }, 500))();
  },
  async follow() {
    await api.searchNickname()
      .then(api.addUserId);
  }
};

const api = {
  searchNicknameList: () => {
    axios.get(`/api/${state.user.id}/nickname-list/${state.searchToken}`, {
      params: {
        id: state.user.id,
        input: state.searchToken,
      },
    })
      .then((result) => {
        state.nicknameList = _.cloneDeep(result.data);
        if(state.user.following.length !== 0) {
          for(let i = 0; i < state.nicknameList.length; i++) {
            for(let j = 0; j < state.user.following.length; j++) {
              if(state.nicknameList[i].id === state.user.following[j]) {
                state.nicknameList[i].disable = true;
              }
            }
          }
        }
        for(let i = 0; i < state.nicknameList.length; i++) {
          if(!state.nicknameList[i].hasOwnProperty('disable')) {
            state.nicknameList[i].disable = false;
          }
        }
      })
      .catch((err) => {
        console.error(err);
      })
  },
  searchNickname: async () => {
    await axios.get(`/api/id/${state.nicknameForFollow}`, {
      params: {
        nickname: state.nicknameForFollow,
      },
    })
      .then((result) => {
        // 팔로우하려는 사람의 id 저장함
        state.idForFollow = result.data[0].id;
        // return this.addFollow();
      })
      .catch((err) => {
        console.error(err);
      });
  },
  addUserId: async () => {
    await axios.put(`/api/follow/${state.user.id}/with/${state.idForFollow}`, {
      params: {
        user_id: state.user.id,
        id: state.idForFollow,
      },
    })
      .then(() => {
        state.user.following.push(state.idForFollow);
      })
      .catch((err) => {
        console.error(err);
      });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
}
