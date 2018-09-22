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
  followingNicknameList: [],
  followerNicknameList: [],
  nicknameData: '',
  idData: null,
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
  setNicknameData(state, payload) {
    state.nicknameData = payload;
  },
  clearList(state) {
    state.followingNicknameList = [];
    state.followerNicknameList = [];
  }
};

const getters = {
  getSearchToken: state => state.searchToken,
  getUserId: state => state.user.id,
  getUser: state => state.user,
  getFollowing: state => state.user.following,
  getFollower: state => state.user.follower,
  getNicknameList: state => state.nicknameList,
  getFollowingNicknameList: state => state.followingNicknameList,
  getFollowerNicknameList: state => state.followerNicknameList,
};

const actions = {
  searchNicknameList:
    _.debounce(function() {
      if (state.searchToken.length !== 0) {
        axios.get(`/api/${state.user.id}/nickname-list/${state.searchToken}`, {
          params: {
            id: state.user.id,
            input: state.searchToken,
          },
        })
          .then(async (result) => {
            state.nicknameList = [];
            const tempList = await _.cloneDeep(result.data);
            // state.nicknameList = _.cloneDeep(result.data);
            if (state.user.following.length !== 0) {
              for (let i = 0; i < tempList.length; i++) {
                for (let j = 0; j < state.user.following.length; j++) {
                  if (tempList[i].id === state.user.following[j]) {
                    tempList[i].active = false;
                  }
                }
              }
            }
            for (let i = 0; i < tempList.length; i++) {
              if (!tempList[i].hasOwnProperty('active')) {
                tempList[i].active = true;
              }
            }
            state.nicknameList = tempList;
          })
          .catch((err) => {
            console.error(err);
          })
      }
    }, 500),
  fetchFollowingNicknameList() {
    if(state.user.following.length !== 0) {
      api.fetchFollowingNicknameList();
    }
  },
  fetchFollowerNicknameList() {
    if(state.user.follower.length !== 0) {
      api.fetchFollowerNicknameList();
    }
  },

  async follow() {
    await api.searchNickname()
      .then(api.addFollowingUser)
      .then(api.addFollowerUser);
  },
  async unfollow() {
    await api.searchNickname()
      .then(api.removeFollowingUser)
      .then(api.removeFollowerUser)
  },
};

const api = {
  searchNickname: async () => {
    await axios.get(`/api/id/${state.nicknameData}`, {
      params: {
        nickname: state.nicknameData,
      },
    })
      .then((result) => {
        // 팔로우하려는 사람의 id 저장함
        state.idData = result.data[0].id;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  addFollowingUser: async () => {
    await axios.put(`/api/following/${state.user.id}/to/${state.idData}`, {
      params: {
        user_id: state.user.id,
        id: state.idData,
      },
    })
      .then(() => {
        state.user.following.push(state.idData);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  fetchFollowingNicknameList: async () => {
    await axios.get(`api/${state.user.id}/${state.user.following}/nickname-list`, {
      params: {
        id: state.user.id,
        following: state.user.following,
      },
    })
      .then(async (result) => {
        state.followingNicknameList = await _.cloneDeep(result.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  fetchFollowerNicknameList: async () => {
    await axios.get(`api/${state.user.id}/${state.user.follower}/nickname-list`, {
      params: {
        id: state.user.id,
        follower: state.user.follower,
      },
    })
      .then(async (result) => {
        state.followerNicknameList = await _.cloneDeep(result.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  addFollowerUser: async () => {
    await axios.put(`/api/follower/${state.idData}/to/${state.user.id}`, {
      params: {
        user_id: state.user.id,
        id: state.idData,
      },
    });
  },
  removeFollowingUser: async () => {
    await axios.put(`/api/unfollowing/${state.user.id}/to/${state.idData}`, {
      params: {
        user_id: state.user.id,
        id: state.idData,
      },
    })
      .then(() => {
        state.user.following = state.user.following.filter(id => id !== state.idData);
      })
      .catch((err) => {
        console.error(err);
      })
  },
  removeFollowerUser: async () => {
    await axios.put(`/api/unfollower/${state.idData}/to/${state.user.id}`, {
      params: {
        user_id: state.user.id,
        id: state.idData,
      },
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
