import axios from 'axios';
import _ from 'lodash';

const state = {
  user: {
    id: '',
    nickname: '',
    following: [],
    follower: [],
    filteredFollowing: [],
    filteredFollower: [],
  },
  bridge: {
    id: '',
    nickname: '',
    following: [],
    follower: [],
    filteredFollowing: [],
    filteredFollower: [],
  },
  otherUser: {
    id: '',
    nickname: '',
    following: [],
    follower: [],
    filteredFollowing: [],
    filteredFollower: [],
  },
  searchToken: '',
  searchedNicknameList: [],
  followingNicknameList: [],
  followerNicknameList: [],
  nicknameData: '',
  toId: null,
  idData: null,
  dropdown: false,
};

const mutations = {
  setSearchToken(state, payload) {
    state.searchToken = payload;
  },
  pushFollowingUser(state, payload) {
    state.user.following.push(payload);
  },
  clearNicknameList(state) {
    state.searchedNicknameList = [];
  },
  setNicknameData(state, payload) {
    state.nicknameData = payload;
  },
  clearList(state) {
    state.followingNicknameList = [];
    state.followerNicknameList = [];
  },

};

const getters = {
  getSearchToken: state => state.searchToken,
  getUserId: state => state.user.id,
  getUserNickname: state => state.user.nickname,
  getUserFollowing: state => state.user.following,
  getUserFollower: state => state.user.follower,
  getSearchedNicknameList: state => state.searchedNicknameList,
  getFollowingNicknameList: state => state.followingNicknameList,
  getFollowerNicknameList: state => state.followerNicknameList,
  getBridgeId: state => state.bridge.id,
  getBridgeNickname: state => state.bridge.nickname,
  getBridgeFilteredFollowing: state => state.bridge.filteredFollowing,
  getBridgeFilteredFollower: state => state.bridge.filteredFollower,
};

const actions = {
  searchNicknameList: _.debounce(function() {
    if (state.searchToken.length !== 0) {
      api.searchAllUser();
  }}, 500),
  fetchFollowingNicknameList() {
    if(state.bridge.following.length !== 0) {
      api.fetchFollowingNicknameList();
    } else {
      state.bridge.filteredFollowing = [];
    }
  },
  fetchFollowerNicknameList() {
    if(state.bridge.follower.length !== 0) {
      api.fetchFollowerNicknameList();
    } else {
      state.bridge.filteredFollower = [];
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
      .then(api.removeFollowerUser);
  },
};

const api = {
  searchAllUser: async () => {
    axios.get(`/api/${state.user.id}/nickname-list/${state.searchToken}`, {
      params: {
        id: state.user.id,
        input: state.searchToken,
      },
    })
      .then(async (result) => {
        state.searchedNicknameList = [];
        const tempList = await _.cloneDeep(result.data);
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
        state.searchedNicknameList = tempList;
      })
      .catch((err) => {
        console.error(err);
      })
  },
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
    // 얘는 브릿지만 받으면됨
    // 그리고 브릿지에 필터링된 팔로우리스트를 주면
    await axios.get(`api/${state.bridge.id}/${state.bridge.following}/nickname-list`, {
      params: {
        id: state.bridge.id,
        following: state.bridge.following,
      },
    })
      .then(async (result) => {
        state.bridge.filteredFollowing = await _.cloneDeep(result.data);
        console.log(state.bridge.filteredFollowing);
      })
      .catch((err) => {
        console.error(err);
      });
    // await axios.get(`api/${state.user.id}/${state.user.following}/nickname-list`, {
    //   params: {
    //     id: state.user.id,
    //     following: state.user.following,
    //   },
    // })
    //   .then(async (result) => {
    //     state.followingNicknameList = await _.cloneDeep(result.data);
    //     console.log(state.followingNicknameList);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  },
  fetchFollowerNicknameList: async () => {
    await axios.get(`api/${state.bridge.id}/${state.bridge.follower}/nickname-list`, {
      params: {
        id: state.bridge.id,
        follower: state.bridge.follower,
      },
    })
      .then(async (result) => {
        state.bridge.filteredFollower = await _.cloneDeep(result.data);
        console.log(state.bridge.filteredFollower);
      })
      .catch((err) => {
        console.error(err);
      });
    // await axios.get(`api/${state.user.id}/${state.user.follower}/nickname-list`, {
    //   params: {
    //     id: state.user.id,
    //     follower: state.user.follower,
    //   },
    // })
    //   .then(async (result) => {
    //     state.followerNicknameList = await _.cloneDeep(result.data);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
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
